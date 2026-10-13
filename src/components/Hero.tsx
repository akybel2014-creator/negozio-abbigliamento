import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, Truck, Scissors } from 'lucide-react';
import { ProductCategory } from '../types';

interface HeroProps {
  onSelectCategory: (cat: ProductCategory) => void;
  onOpenOutfitBuilder: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectCategory, onOpenOutfitBuilder }) => {
  return (
    <div className="relative bg-stone-900 text-stone-100 overflow-hidden">
      {/* Background with luxury editorial imagery and gradient overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=80"
          alt="Atelier Sartoria Moda"
          className="w-full h-full object-cover object-top opacity-35 filter brightness-75 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-900/70 to-transparent" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-stone-950/40 to-stone-950/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-medium tracking-widest uppercase backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Collezione Autunno / Inverno • Milano</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-tight">
            L'eleganza senza tempo del <span className="italic font-normal text-amber-200">Made in Italy</span>.
          </h1>

          <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed max-w-xl">
            Tessuti nobili, lavorazione semi-intelata e tagli sartoriali creati nei laboratori italiani. 
            Capi pensati per durare una vita, non una stagione.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 items-center">
            <button
              onClick={() => onSelectCategory('donna')}
              className="px-6 py-3.5 bg-white text-stone-950 text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-full hover:bg-stone-100 transition-all shadow-lg hover:shadow-xl cursor-pointer flex items-center gap-2 group"
            >
              <span>Scopri Donna</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => onSelectCategory('uomo')}
              className="px-6 py-3.5 bg-stone-800/80 backdrop-blur-md text-white border border-stone-700 text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-full hover:bg-stone-700 transition-all cursor-pointer flex items-center gap-2 group"
            >
              <span>Scopri Uomo</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={onOpenOutfitBuilder}
              className="px-5 py-3.5 bg-amber-900/40 text-amber-200 border border-amber-700/60 text-xs sm:text-sm font-medium tracking-wide uppercase rounded-full hover:bg-amber-800/50 transition-all cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Studio Outfit Virtuale</span>
            </button>
          </div>
        </div>

        {/* Value Propositions Banner */}
        <div className="mt-16 pt-8 border-t border-stone-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-stone-300">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-stone-800/60 text-amber-300 border border-stone-700/40">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider">100% Made in Italy</h4>
              <p className="text-xs text-stone-400 mt-0.5">Filati biellesi, sete comasche e cuoio fiorentino</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-stone-800/60 text-amber-300 border border-stone-700/40">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider">Spedizione Express</h4>
              <p className="text-xs text-stone-400 mt-0.5">Consegna in 24/48h e resi gratuiti 30 giorni</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-stone-800/60 text-amber-300 border border-stone-700/40">
              <Scissors className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider">Servizio Sartoria</h4>
              <p className="text-xs text-stone-400 mt-0.5">Orli e messe a punto gratuite presso le nostre boutique</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-stone-800/60 text-amber-300 border border-stone-700/40">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider">Consulenza di Stile</h4>
              <p className="text-xs text-stone-400 mt-0.5">Personal shopper e compositore outfit integrato</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
