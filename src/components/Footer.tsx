import React, { useState } from 'react';
import { Mail, Check, MapPin, Phone } from 'lucide-react';
import { ProductCategory } from '../types';

interface FooterProps {
  onSelectCategory: (cat: ProductCategory) => void;
  onOpenSizeGuide: () => void;
  onOpenBoutiqueInfo: () => void;
  onOpenOutfitBuilder: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenSizeGuide,
  onOpenBoutiqueInfo,
  onOpenOutfitBuilder
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Section */}
        <div className="bg-stone-900 rounded-2xl p-8 sm:p-10 border border-stone-800 mb-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-md text-center md:text-left">
            <span className="text-amber-400 text-xs font-semibold tracking-widest uppercase">
              Club Sartoriale Esclusivo
            </span>
            <h3 className="font-serif text-2xl font-bold text-white mt-1">
              Ricevi il 10% di sconto sul primo ordine
            </h3>
            <p className="text-xs text-stone-400 mt-2">
              Iscriviti per accedere in anteprima alle vendite private, inviti alle sfilate e consigli di stile dei nostri maestri sarti.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex flex-col sm:flex-row gap-2 max-w-md">
            {subscribed ? (
              <div className="flex items-center gap-2 bg-emerald-950 border border-emerald-800 text-emerald-300 px-4 py-3 rounded-xl text-xs font-semibold">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Grazie! Usa il codice coupon BENVENUTO10 alla cassa.</span>
              </div>
            ) : (
              <>
                <div className="relative flex-1">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Il tuo indirizzo email..."
                    className="w-full pl-9 pr-4 py-3 bg-stone-950 border border-stone-700 rounded-xl text-xs text-white placeholder-stone-500 focus:outline-none focus:border-stone-400"
                  />
                  <Mail className="w-4 h-4 text-stone-500 absolute left-3 top-3.5" />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-white text-stone-950 font-semibold uppercase tracking-wider text-xs rounded-xl hover:bg-stone-200 transition-colors cursor-pointer shrink-0"
                >
                  Iscriviti
                </button>
              </>
            )}
          </form>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 text-xs">
          <div>
            <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider mb-4">
              Atelier Sartoria
            </h4>
            <p className="text-stone-400 leading-relaxed font-light mb-4">
              Negozio di abbigliamento e sartoria artigianale italiana. Eccellenza dei tessuti, eleganza sobria e cura millimetrica del dettaglio.
            </p>
            <div className="space-y-1.5 text-stone-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Via Montenapoleone 18, Milano</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>+39 02 8901 4455</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4">
              Collezioni
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button 
                  onClick={() => onSelectCategory('donna')} 
                  className="text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  Collezione Donna
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('uomo')} 
                  className="text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  Collezione Uomo
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('accessori')} 
                  className="text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  Pelletteria & Borse
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('saldi')} 
                  className="text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Saldi di Stagione (-20%)
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenOutfitBuilder} 
                  className="text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  Studio Outfit Virtuale
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4">
              Servizio Clienti
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button 
                  onClick={onOpenSizeGuide} 
                  className="text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  Guida alle Taglie
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenBoutiqueInfo} 
                  className="text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  Servizio Sartoria & Su Misura
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenBoutiqueInfo} 
                  className="text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  Spedizioni e Resi Gratuiti
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenBoutiqueInfo} 
                  className="text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  Le Nostre Sedi Fisiche
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4">
              Garanzie & Pagamenti
            </h4>
            <p className="text-stone-400 leading-relaxed font-light mb-4">
              Tutti i pagamenti sono protetti con crittografia SSL 256-bit. Spedizione tracciata assicurata inclusa.
            </p>
            <div className="flex flex-wrap gap-2 text-[10px] font-semibold text-stone-300">
              <span className="px-2 py-1 rounded bg-stone-900 border border-stone-800">Visa</span>
              <span className="px-2 py-1 rounded bg-stone-900 border border-stone-800">Mastercard</span>
              <span className="px-2 py-1 rounded bg-stone-900 border border-stone-800">Apple Pay</span>
              <span className="px-2 py-1 rounded bg-stone-900 border border-stone-800">Klarna</span>
              <span className="px-2 py-1 rounded bg-stone-900 border border-stone-800">PayPal</span>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div>
            © {new Date().getFullYear()} Atelier Sartoria — Negozio di Abbigliamento. Tutti i diritti riservati. Made in Italy.
          </div>
          <div className="flex gap-4">
            <span>P.IVA IT 08912340961</span>
            <span>•</span>
            <span>Milano Moda</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
