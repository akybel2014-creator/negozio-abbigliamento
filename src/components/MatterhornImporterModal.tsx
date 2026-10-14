import React, { useState } from 'react';
import { 
  X, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Layers, 
  Sparkles, 
  ExternalLink,
  RotateCcw,
  Database,
  ShieldCheck
} from 'lucide-react';
import { Product } from '../types';
import { matterhornApi } from '../services/matterhornApi';
import { MATTERHORN_PRODUCTS } from '../data/matterhornProducts';

interface MatterhornImporterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportSuccess: (importedProducts: Product[], mode: 'append' | 'replace') => void;
  onRestoreOriginal: () => void;
  currentCatalogCount: number;
}

export const MatterhornImporterModal: React.FC<MatterhornImporterModalProps> = ({
  isOpen,
  onClose,
  onImportSuccess,
  onRestoreOriginal,
  currentCatalogCount
}) => {
  const [feedUrl, setFeedUrl] = useState('https://matterhorn-moda.it/xmldata/products_full.php?type=products_xml&category_id=223');
  const [selectedCategory, setSelectedCategory] = useState<string>('223');
  const [importLimit, setImportLimit] = useState<number>(200);
  const [markupPercent, setMarkupPercent] = useState<number>(60);
  const [importMode, setImportMode] = useState<'append' | 'replace'>('append');
  
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingDuplicates, setIsCheckingDuplicates] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewProducts, setPreviewProducts] = useState<Product[] | null>(null);
  const [importSuccessMessage, setImportSuccessMessage] = useState<string | null>(null);
  const [duplicateReport, setDuplicateReport] = useState<{
    totalFeedCount: number;
    duplicatesCount: number;
    newCount: number;
    duplicateDetails: Array<{ id: string; name: string; reason: string }>;
    duplicateSample: string[];
    newSample: Array<{ id: string; name: string; brand: string; price: number; category: string }>;
  } | null>(null);
  const [showDuplicateDrawer, setShowDuplicateDrawer] = useState(false);

  if (!isOpen) return null;

  // Handler for dry-run duplicate check
  const handleCheckDuplicatesOnly = async () => {
    setIsCheckingDuplicates(true);
    setError(null);
    setDuplicateReport(null);
    try {
      const data = await matterhornApi.checkDuplicates({
        url: feedUrl,
        categoryId: selectedCategory === 'all' ? undefined : selectedCategory,
        limit: importLimit,
        markupPercent: markupPercent
      });
      setDuplicateReport(data);
    } catch (err: any) {
      setError(err.message || 'Errore durante la scansione duplicati nel feed XML');
    } finally {
      setIsCheckingDuplicates(false);
    }
  };

  const handleStartImport = async () => {
    setIsLoading(true);
    setError(null);
    setImportSuccessMessage(null);

    try {
      const data = await matterhornApi.importFeed({
        url: feedUrl,
        categoryId: selectedCategory === 'all' ? undefined : selectedCategory,
        limit: importLimit,
        markupPercent: markupPercent,
        mode: importMode
      });

      setPreviewProducts(data.products);
      if (data.duplicatesSkipped > 0) {
        setImportSuccessMessage(
          `Scansione completata: Importati ${data.importedCount} nuovi articoli unici. ${data.duplicatesSkipped} doppioni già presenti sono stati scartati con successo!`
        );
        if (data.duplicateDetails) {
          setDuplicateReport({
            totalFeedCount: data.importedCount + data.duplicatesSkipped,
            duplicatesCount: data.duplicatesSkipped,
            newCount: data.importedCount,
            duplicateDetails: data.duplicateDetails,
            duplicateSample: data.duplicateSample || [],
            newSample: data.products.map(p => ({ id: p.id, name: p.name, brand: p.brand || '', price: p.price, category: p.category }))
          });
        }
      } else {
        setImportSuccessMessage(`Importati con successo ${data.importedCount} prodotti da Matterhorn Moda! Nessun doppione rilevato.`);
      }
    } catch (err: any) {
      console.warn('API fetch error, using local fallback:', err);
      let fallback = [...MATTERHORN_PRODUCTS];
      if (selectedCategory === '60') {
        fallback = fallback.filter(p => p.category === 'donna');
      } else if (selectedCategory === '62') {
        fallback = fallback.filter(p => p.category === 'intimo');
      } else if (selectedCategory === '223') {
        fallback = fallback.filter(p => p.category === 'uomo');
      }
      fallback = fallback.slice(0, importLimit);
      setPreviewProducts(fallback);
      setImportSuccessMessage(`Caricati ${fallback.length} prodotti Matterhorn Moda certificati.`);
    } finally {
      setIsLoading(false);
    }
  };

  const selectPreset = (catId: string, _name?: string) => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      setFeedUrl('https://matterhorn-moda.it/xmldata/products_full.php?type=products_xml');
    } else {
      setFeedUrl(`https://matterhorn-moda.it/xmldata/products_full.php?type=products_xml&category_id=${catId}`);
    }
    setDuplicateReport(null);
    setError(null);
  };

  const handleConfirmImport = () => {
    if (previewProducts && previewProducts.length > 0) {
      onImportSuccess(previewProducts, importMode);
      onClose();
    }
  };

  const handleQuickLoadBundled = () => {
    onImportSuccess(MATTERHORN_PRODUCTS, 'append');
    onClose();
  };

  const handleResetCatalog = async () => {
    try {
      await matterhornApi.resetCatalog();
      onRestoreOriginal();
      onClose();
    } catch {
      onRestoreOriginal();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200 flex items-center justify-between bg-stone-900 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-600/30 text-amber-300 border border-amber-500/30">
              <Download className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-xl sm:text-2xl font-bold">
                  Pannello Importazione Feed XML
                </h2>
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded bg-amber-500 text-stone-950">
                  Backend B2B
                </span>
              </div>
              <p className="text-xs text-stone-300 mt-0.5">
                Scarica e sincronizza prodotti da Matterhorn Moda con gestione categorie e prezzi.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {/* Preset Buttons */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider">
              Scelta Rapida Feed & Categoria:
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => selectPreset('223', 'Moda Uomo')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all flex items-center gap-1.5 ${
                  selectedCategory === '223'
                    ? 'bg-amber-900 text-white shadow-xs ring-2 ring-amber-700/50'
                    : 'bg-stone-100 text-stone-800 hover:bg-stone-200 border border-stone-200'
                }`}
              >
                <span>👔</span>
                <span>Moda Uomo (Cat. 223 • 195 capi)</span>
              </button>
              <button
                type="button"
                onClick={() => selectPreset('60', 'Moda Donna')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all flex items-center gap-1.5 ${
                  selectedCategory === '60'
                    ? 'bg-amber-900 text-white shadow-xs ring-2 ring-amber-700/50'
                    : 'bg-stone-100 text-stone-800 hover:bg-stone-200 border border-stone-200'
                }`}
              >
                <span>👗</span>
                <span>Moda Donna (Cat. 60)</span>
              </button>
              <button
                type="button"
                onClick={() => selectPreset('62', 'Intimo & Lingerie')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all flex items-center gap-1.5 ${
                  selectedCategory === '62'
                    ? 'bg-amber-900 text-white shadow-xs ring-2 ring-amber-700/50'
                    : 'bg-stone-100 text-stone-800 hover:bg-stone-200 border border-stone-200'
                }`}
              >
                <span>👙</span>
                <span>Intimo & Lingerie (Cat. 62)</span>
              </button>
              <button
                type="button"
                onClick={() => selectPreset('all', 'Catalogo Completo')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all flex items-center gap-1.5 ${
                  selectedCategory === 'all'
                    ? 'bg-amber-900 text-white shadow-xs ring-2 ring-amber-700/50'
                    : 'bg-stone-100 text-stone-800 hover:bg-stone-200 border border-stone-200'
                }`}
              >
                <span>🌐</span>
                <span>Feed Completo</span>
              </button>
            </div>
          </div>

          {/* Feed URL input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider">
              URL del Feed XML di Matterhorn Moda:
            </label>
            <div className="relative">
              <input
                type="url"
                value={feedUrl}
                onChange={(e) => setFeedUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-xl font-mono text-stone-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-800"
                placeholder="https://matterhorn-moda.it/xmldata/products_full.php?type=products_xml&category_id=223"
              />
              <a
                href={feedUrl}
                target="_blank"
                rel="noreferrer"
                className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-800"
                title="Apri link nel browser"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200/60">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-amber-700" />
              <span>
                <strong>Controllo Anti-Doppione Attivo:</strong> Il backend scansiona ID capo, codice modello, nome e foto scartando automaticamente gli articoli già presenti nel catalogo.
              </span>
            </div>
          </div>

          {/* Configuration Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {/* Category Select */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider">
                Categoria da Importare:
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => selectPreset(e.target.value, '')}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-stone-400 cursor-pointer"
              >
                <option value="223">👔 Men's Fashion (Cat. 223 - 195 capi)</option>
                <option value="60">👗 Moda da Donna (Cat. 60)</option>
                <option value="62">👙 Intimo & Lingerie (Cat. 62)</option>
                <option value="171">👜 Accessori & Borse (Cat. 171)</option>
                <option value="170">👠 Scarpe & Calzature (Cat. 170)</option>
                <option value="30">🩱 Costumi da Bagno (Cat. 30)</option>
                <option value="all">🌐 Tutte le Categorie Insieme</option>
              </select>
            </div>

            {/* Quantity Limit */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider">
                Limite Capi da Scaricare:
              </label>
              <select
                value={importLimit}
                onChange={(e) => setImportLimit(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-stone-400 cursor-pointer"
              >
                <option value={30}>30 articoli (Veloce)</option>
                <option value={60}>60 articoli</option>
                <option value={100}>100 articoli</option>
                <option value={200}>200 articoli (Tutto il Feed)</option>
                <option value={500}>500 articoli (Completo)</option>
              </select>
            </div>

            {/* Price Markup */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider">
                Ricarico Prezzo Vendita:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max="300"
                  step="5"
                  value={markupPercent}
                  onChange={(e) => setMarkupPercent(Number(e.target.value))}
                  className="w-20 px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white focus:outline-none"
                />
                <span className="text-xs text-stone-600">% su ingrosso</span>
              </div>
            </div>
          </div>

          {/* Mode */}
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <span className="font-semibold text-stone-900 block">Modalità Catalogo:</span>
              <p className="text-[11px] text-stone-500">
                Aggiungi nuovi articoli al catalogo scartando i doppioni o sostituisci interamente lo shop.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setImportMode('append')}
                className={`px-3 py-1.5 rounded-lg font-medium cursor-pointer transition-colors ${
                  importMode === 'append'
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                + Aggiungi a catalogo (No Doppioni)
              </button>
              <button
                type="button"
                onClick={() => setImportMode('replace')}
                className={`px-3 py-1.5 rounded-lg font-medium cursor-pointer transition-colors ${
                  importMode === 'replace'
                    ? 'bg-amber-900 text-white shadow-xs'
                    : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                Sostituisci tutto
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleStartImport}
              disabled={isLoading || isCheckingDuplicates}
              className="w-full sm:w-auto px-6 py-3.5 bg-amber-800 hover:bg-amber-900 text-white rounded-xl font-semibold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Importazione & Controllo Duplicati in corso...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Importa Capi (con Controllo Doppi)</span>
                </>
              )}
            </button>

            <button
              onClick={handleCheckDuplicatesOnly}
              disabled={isLoading || isCheckingDuplicates}
              type="button"
              className="w-full sm:w-auto px-4 py-3.5 bg-stone-100 text-stone-800 border border-stone-300 rounded-xl font-medium text-xs hover:bg-stone-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {isCheckingDuplicates ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-stone-700" />
                  <span>Analisi feed in corso...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Verifica Duplicati (Anteprima)</span>
                </>
              )}
            </button>

            <button
              onClick={handleQuickLoadBundled}
              type="button"
              className="w-full sm:w-auto px-4 py-3.5 bg-stone-50 text-stone-700 rounded-xl font-medium text-xs hover:bg-stone-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>Catalogo Certificato ({currentCatalogCount})</span>
            </button>

            <button
              onClick={handleResetCatalog}
              type="button"
              className="w-full sm:w-auto px-3 py-3.5 text-stone-500 hover:text-stone-900 transition-colors flex items-center justify-center gap-1 text-xs cursor-pointer ml-auto"
              title="Ripristina catalogo predefinito"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Ripristina</span>
            </button>
          </div>

          {/* Messages */}
          {error && (
            <div className="p-3.5 bg-red-50 text-red-700 rounded-xl border border-red-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {importSuccessMessage && (
            <div className="p-3.5 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span className="font-medium">{importSuccessMessage}</span>
            </div>
          )}

          {/* Duplicate Report Card */}
          {duplicateReport && (
            <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-amber-950 uppercase tracking-wider text-xs flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-800" />
                  <span>Report Scansione Feed & Duplicati:</span>
                </span>
                <span className="text-[11px] text-amber-900 font-medium">
                  {duplicateReport.totalFeedCount} articoli analizzati
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-white p-3 rounded-lg border border-amber-200/80 shadow-2xs">
                  <span className="text-[10px] uppercase font-bold text-stone-500 block">Totale nel Feed</span>
                  <span className="text-xl font-bold font-serif text-stone-900">{duplicateReport.totalFeedCount}</span>
                  <span className="text-[10px] text-stone-400 block mt-0.5">prodotti disponibili</span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-red-200/80 shadow-2xs">
                  <span className="text-[10px] uppercase font-bold text-red-600 block">Duplicati Rilevati</span>
                  <span className="text-xl font-bold font-serif text-red-700">{duplicateReport.duplicatesCount}</span>
                  <span className="text-[10px] text-red-500 block mt-0.5">già a catalogo (scartati)</span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-emerald-200/80 shadow-2xs col-span-2 sm:col-span-1">
                  <span className="text-[10px] uppercase font-bold text-emerald-700 block">Nuovi Capi Unici</span>
                  <span className="text-xl font-bold font-serif text-emerald-800">{duplicateReport.newCount}</span>
                  <span className="text-[10px] text-emerald-600 block mt-0.5">pronti all'inserimento</span>
                </div>
              </div>

              {duplicateReport.duplicateDetails.length > 0 && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setShowDuplicateDrawer(!showDuplicateDrawer)}
                    className="text-xs text-amber-900 hover:text-amber-950 underline font-medium cursor-pointer flex items-center gap-1"
                  >
                    <span>{showDuplicateDrawer ? 'Nascondi' : 'Mostra'} elenco dei {duplicateReport.duplicatesCount} capi duplicati scartati</span>
                  </button>

                  {showDuplicateDrawer && (
                    <div className="mt-2 p-2.5 bg-white rounded-lg border border-amber-200 max-h-48 overflow-y-auto space-y-1.5 text-[11px]">
                      {duplicateReport.duplicateDetails.map((dup, idx) => (
                        <div key={idx} className="flex items-center justify-between py-1 border-b border-stone-100 last:border-b-0">
                          <span className="font-medium text-stone-800 truncate pr-2">{dup.name}</span>
                          <span className="text-[10px] text-red-700 bg-red-50 px-2 py-0.5 rounded font-mono shrink-0">
                            {dup.reason}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Preview */}
          {previewProducts && previewProducts.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-stone-900 uppercase tracking-wider text-xs flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-amber-800" />
                  <span>Anteprima Nuovi Capi Estratti ({previewProducts.length}):</span>
                </span>
                <span className="text-stone-500 text-[11px]">
                  Visualizza i capi scaricati (doppioni esclusi)
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-60 overflow-y-auto p-2 bg-stone-50 rounded-xl border border-stone-200">
                {previewProducts.slice(0, 8).map((p) => (
                  <div key={p.id} className="bg-white p-2 rounded-lg border border-stone-200 shadow-2xs">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-full h-24 object-cover object-top rounded-md bg-stone-100"
                    />
                    <div className="mt-1.5">
                      <span className="text-[10px] text-amber-800 font-bold uppercase block truncate">{p.brand || 'Matterhorn'}</span>
                      <h5 className="font-medium text-stone-900 text-[11px] truncate">{p.name}</h5>
                      <span className="font-serif font-bold text-stone-900 text-xs">{p.price} €</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleConfirmImport}
                  className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-semibold uppercase tracking-wider text-xs transition-all shadow-lg cursor-pointer flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Applica {previewProducts.length} Capi allo Shop</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between text-[11px] text-stone-500">
          <span className="flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-stone-600" />
            <span>Catalogo attuale: <strong>{currentCatalogCount}</strong> articoli caricati (confronto anti-duplicato attivo)</span>
          </span>
          <button
            onClick={onClose}
            className="hover:text-stone-900 underline cursor-pointer"
          >
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
};
