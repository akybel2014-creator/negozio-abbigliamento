import React from 'react';
import { X, Scale, Star, ShoppingBag, Trash2, Check, ShieldCheck } from 'lucide-react';
import { Product } from '../types';

interface ProductCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  compareProducts: Product[];
  onRemoveFromCompare: (id: string) => void;
  onClearCompare: () => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCompareModal: React.FC<ProductCompareModalProps> = ({
  isOpen,
  onClose,
  compareProducts,
  onRemoveFromCompare,
  onClearCompare,
  onAddToCart,
  onQuickView
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-100 text-amber-900">
              <Scale className="w-5 h-5 text-amber-800" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                Confronto Capi & Specifiche Tecniche
              </h2>
              <p className="text-xs text-stone-500">
                Visualizza prezzi, composizione dei tessuti e dettagli fianco a fianco
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {compareProducts.length > 0 && (
              <button
                onClick={onClearCompare}
                className="text-xs text-stone-500 hover:text-red-600 transition-colors cursor-pointer flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Rimuovi tutti</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-stone-500 hover:text-stone-950 hover:bg-stone-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Body */}
        <div className="p-6 overflow-x-auto flex-1 text-xs">
          {compareProducts.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-800">Nessun prodotto selezionato per il confronto</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Clicca sull'icona della bilancia presente su ciascun capo nel catalogo per confrontare fino a 4 articoli contemporaneamente.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition-colors cursor-pointer inline-block"
              >
                Torna al Catalogo
              </button>
            </div>
          ) : (
            <div className="min-w-[650px]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="p-3 w-40 text-stone-400 uppercase text-[10px] tracking-wider align-bottom">
                      Prodotto ({compareProducts.length})
                    </th>
                    {compareProducts.map((p) => (
                      <th key={p.id} className="p-3 w-64 align-top border-l border-stone-100">
                        <div className="relative group bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                          <button
                            onClick={() => onRemoveFromCompare(p.id)}
                            className="absolute -top-2 -right-2 p-1 rounded-full bg-white text-stone-500 hover:text-red-600 shadow border border-stone-200 cursor-pointer"
                            title="Rimuovi dal confronto"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                          
                          <div 
                            className="aspect-[3/4] rounded-lg overflow-hidden bg-white mb-2 cursor-pointer"
                            onClick={() => {
                              onClose();
                              onQuickView(p);
                            }}
                          >
                            <img
                              src={p.images[0]}
                              alt={p.name}
                              className="w-full h-full object-cover object-top hover:scale-105 transition-transform"
                            />
                          </div>

                          <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider block">
                            {p.brand || 'Boutique'}
                          </span>
                          <h4 
                            className="font-serif font-bold text-stone-900 text-sm line-clamp-2 hover:text-amber-900 cursor-pointer"
                            onClick={() => {
                              onClose();
                              onQuickView(p);
                            }}
                          >
                            {p.name}
                          </h4>

                          <div className="mt-2 flex items-baseline justify-between">
                            <span className="font-serif font-bold text-base text-stone-900">{p.price} €</span>
                            {p.originalPrice && (
                              <span className="text-xs text-stone-400 line-through">{p.originalPrice} €</span>
                            )}
                          </div>

                          <button
                            onClick={() => onAddToCart(p)}
                            className="w-full mt-2.5 py-2 px-3 bg-stone-900 text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Nel Carrello</span>
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-stone-100">
                  {/* Category */}
                  <tr>
                    <td className="p-3 font-semibold text-stone-700 bg-stone-50">Categoria</td>
                    {compareProducts.map(p => (
                      <td key={p.id} className="p-3 border-l border-stone-100 capitalize">
                        {p.category} &bull; {p.subcategory}
                      </td>
                    ))}
                  </tr>

                  {/* Composition */}
                  <tr>
                    <td className="p-3 font-semibold text-stone-700 bg-stone-50">Composizione Tessuto</td>
                    {compareProducts.map(p => (
                      <td key={p.id} className="p-3 border-l border-stone-100 font-medium text-stone-800">
                        {p.composition}
                      </td>
                    ))}
                  </tr>

                  {/* Made in / Origin */}
                  <tr>
                    <td className="p-3 font-semibold text-stone-700 bg-stone-50">Provenienza & Standard</td>
                    {compareProducts.map(p => (
                      <td key={p.id} className="p-3 border-l border-stone-100 text-stone-600 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{p.madeIn}</span>
                      </td>
                    ))}
                  </tr>

                  {/* Sizes */}
                  <tr>
                    <td className="p-3 font-semibold text-stone-700 bg-stone-50">Taglie Disponibili</td>
                    {compareProducts.map(p => (
                      <td key={p.id} className="p-3 border-l border-stone-100">
                        <div className="flex flex-wrap gap-1">
                          {p.sizes.map(s => (
                            <span key={s} className="px-1.5 py-0.5 rounded bg-stone-100 text-[10px] font-semibold text-stone-800">
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Colors */}
                  <tr>
                    <td className="p-3 font-semibold text-stone-700 bg-stone-50">Colori</td>
                    {compareProducts.map(p => (
                      <td key={p.id} className="p-3 border-l border-stone-100">
                        <div className="flex items-center gap-1.5">
                          {p.colors.map(c => (
                            <span
                              key={c.name}
                              className="w-3.5 h-3.5 rounded-full border border-stone-300 inline-block shadow-2xs"
                              style={{ backgroundColor: c.hex }}
                              title={c.name}
                            />
                          ))}
                          <span className="text-[11px] text-stone-600 ml-1">
                            {p.colors.map(c => c.name).join(', ')}
                          </span>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Rating */}
                  <tr>
                    <td className="p-3 font-semibold text-stone-700 bg-stone-50">Valutazione Clienti</td>
                    {compareProducts.map(p => (
                      <td key={p.id} className="p-3 border-l border-stone-100">
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                          <strong className="text-stone-800">{p.rating}</strong>
                          <span className="text-stone-400">({p.reviewCount} recensioni)</span>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Stock */}
                  <tr>
                    <td className="p-3 font-semibold text-stone-700 bg-stone-50">Disponibilità Magazzino</td>
                    {compareProducts.map(p => (
                      <td key={p.id} className="p-3 border-l border-stone-100 font-medium">
                        {p.stock > 0 ? (
                          <span className="text-emerald-700 flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" /> Disponibile ({p.stock} pz)
                          </span>
                        ) : (
                          <span className="text-red-600">Esaurito</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Care */}
                  <tr>
                    <td className="p-3 font-semibold text-stone-700 bg-stone-50">Cura del Capo</td>
                    {compareProducts.map(p => (
                      <td key={p.id} className="p-3 border-l border-stone-100 text-stone-500">
                        {p.careInstructions}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-stone-200 bg-stone-50 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-stone-900 text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 cursor-pointer"
          >
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
};
