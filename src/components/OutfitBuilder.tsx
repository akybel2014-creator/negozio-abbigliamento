import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  ShoppingBag, 
  Check, 
  RefreshCw, 
  ChevronRight, 
  ChevronLeft 
} from 'lucide-react';
import { Product, ProductSize, ProductColor } from '../types';

interface OutfitBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddLookToCart: (items: { product: Product; size: ProductSize | string; color: ProductColor }[]) => void;
}

export const OutfitBuilder: React.FC<OutfitBuilderProps> = ({
  isOpen,
  onClose,
  products,
  onAddLookToCart
}) => {
  if (!isOpen) return null;

  // Filter products by outfit slot
  const tops = products.filter(p => p.outfitSlot === 'top');
  const bottoms = products.filter(p => p.outfitSlot === 'bottom');
  const shoes = products.filter(p => p.outfitSlot === 'shoes');
  const accessories = products.filter(p => p.outfitSlot === 'accessory');

  const [selectedTopIdx, setSelectedTopIdx] = useState(0);
  const [selectedBottomIdx, setSelectedBottomIdx] = useState(0);
  const [selectedShoesIdx, setSelectedShoesIdx] = useState(0);
  const [selectedAccessoryIdx, setSelectedAccessoryIdx] = useState(0);
  const [bundleAdded, setBundleAdded] = useState(false);

  const currentTop = tops[selectedTopIdx] || tops[0];
  const currentBottom = bottoms[selectedBottomIdx] || bottoms[0];
  const currentShoes = shoes[selectedShoesIdx] || shoes[0];
  const currentAccessory = accessories[selectedAccessoryIdx] || accessories[0];

  const rawTotal = (currentTop?.price || 0) + 
                   (currentBottom?.price || 0) + 
                   (currentShoes?.price || 0) + 
                   (currentAccessory?.price || 0);

  // 15% discount for complete 4-piece outfit
  const bundleDiscountPercent = 15;
  const bundleTotal = Math.round(rawTotal * (1 - bundleDiscountPercent / 100));
  const savings = rawTotal - bundleTotal;

  const handleRandomize = () => {
    setSelectedTopIdx(Math.floor(Math.random() * tops.length));
    setSelectedBottomIdx(Math.floor(Math.random() * bottoms.length));
    setSelectedShoesIdx(Math.floor(Math.random() * shoes.length));
    setSelectedAccessoryIdx(Math.floor(Math.random() * accessories.length));
  };

  const handleAddBundle = () => {
    const bundleItems = [
      { product: currentTop, size: currentTop.sizes[0], color: currentTop.colors[0] },
      { product: currentBottom, size: currentBottom.sizes[0], color: currentBottom.colors[0] },
      { product: currentShoes, size: currentShoes.sizes[0], color: currentShoes.colors[0] },
      { product: currentAccessory, size: currentAccessory.sizes[0], color: currentAccessory.colors[0] }
    ].filter(i => Boolean(i.product));

    onAddLookToCart(bundleItems);
    setBundleAdded(true);
    setTimeout(() => {
      setBundleAdded(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-100 text-amber-900">
              <Sparkles className="w-5 h-5 text-amber-800" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                Atelier Virtuale • Componi il tuo Look
              </h2>
              <p className="text-xs text-stone-500">
                Abbina e combina i capi sartoriali. Risparmia il 15% sul look coordinato completo!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRandomize}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-200/80 hover:bg-stone-300 text-stone-700 text-xs font-semibold cursor-pointer transition-colors"
              title="Genera look casuale"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ispirazione Casuale</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-stone-500 hover:text-stone-950 hover:bg-stone-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Studio Canvas: 4 slots */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 bg-stone-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            
            {/* Slot 1: Top */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                  <span>1. Capo Superiore</span>
                  <span className="text-amber-800">{currentTop?.category.toUpperCase()}</span>
                </div>

                <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-stone-50 mb-3 border border-stone-100">
                  <img
                    src={currentTop?.images[0]}
                    alt={currentTop?.name}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-x-2 bottom-2 flex justify-between z-10">
                    <button
                      onClick={() => setSelectedTopIdx((selectedTopIdx - 1 + tops.length) % tops.length)}
                      className="p-1 rounded-full bg-white/90 text-stone-800 hover:bg-white shadow cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setSelectedTopIdx((selectedTopIdx + 1) % tops.length)}
                      className="p-1 rounded-full bg-white/90 text-stone-800 hover:bg-white shadow cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h4 className="font-serif text-sm font-bold text-stone-900 line-clamp-1">{currentTop?.name}</h4>
                <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">{currentTop?.composition}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[11px] text-stone-400">Prezzo singolo</span>
                <span className="font-serif font-bold text-sm text-stone-900">{currentTop?.price} €</span>
              </div>
            </div>

            {/* Slot 2: Bottom */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                  <span>2. Capo Inferiore</span>
                  <span className="text-amber-800">{currentBottom?.category.toUpperCase()}</span>
                </div>

                <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-stone-50 mb-3 border border-stone-100">
                  <img
                    src={currentBottom?.images[0]}
                    alt={currentBottom?.name}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-x-2 bottom-2 flex justify-between z-10">
                    <button
                      onClick={() => setSelectedBottomIdx((selectedBottomIdx - 1 + bottoms.length) % bottoms.length)}
                      className="p-1 rounded-full bg-white/90 text-stone-800 hover:bg-white shadow cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setSelectedBottomIdx((selectedBottomIdx + 1) % bottoms.length)}
                      className="p-1 rounded-full bg-white/90 text-stone-800 hover:bg-white shadow cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h4 className="font-serif text-sm font-bold text-stone-900 line-clamp-1">{currentBottom?.name}</h4>
                <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">{currentBottom?.composition}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[11px] text-stone-400">Prezzo singolo</span>
                <span className="font-serif font-bold text-sm text-stone-900">{currentBottom?.price} €</span>
              </div>
            </div>

            {/* Slot 3: Shoes */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                  <span>3. Calzature</span>
                  <span className="text-amber-800">SCARPE</span>
                </div>

                <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-stone-50 mb-3 border border-stone-100">
                  <img
                    src={currentShoes?.images[0]}
                    alt={currentShoes?.name}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-x-2 bottom-2 flex justify-between z-10">
                    <button
                      onClick={() => setSelectedShoesIdx((selectedShoesIdx - 1 + shoes.length) % shoes.length)}
                      className="p-1 rounded-full bg-white/90 text-stone-800 hover:bg-white shadow cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setSelectedShoesIdx((selectedShoesIdx + 1) % shoes.length)}
                      className="p-1 rounded-full bg-white/90 text-stone-800 hover:bg-white shadow cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h4 className="font-serif text-sm font-bold text-stone-900 line-clamp-1">{currentShoes?.name}</h4>
                <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">{currentShoes?.composition}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[11px] text-stone-400">Prezzo singolo</span>
                <span className="font-serif font-bold text-sm text-stone-900">{currentShoes?.price} €</span>
              </div>
            </div>

            {/* Slot 4: Accessory */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                  <span>4. Pelletteria & Accessori</span>
                  <span className="text-amber-800">ACCESSORI</span>
                </div>

                <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-stone-50 mb-3 border border-stone-100">
                  <img
                    src={currentAccessory?.images[0]}
                    alt={currentAccessory?.name}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-x-2 bottom-2 flex justify-between z-10">
                    <button
                      onClick={() => setSelectedAccessoryIdx((selectedAccessoryIdx - 1 + accessories.length) % accessories.length)}
                      className="p-1 rounded-full bg-white/90 text-stone-800 hover:bg-white shadow cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setSelectedAccessoryIdx((selectedAccessoryIdx + 1) % accessories.length)}
                      className="p-1 rounded-full bg-white/90 text-stone-800 hover:bg-white shadow cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h4 className="font-serif text-sm font-bold text-stone-900 line-clamp-1">{currentAccessory?.name}</h4>
                <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">{currentAccessory?.composition}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[11px] text-stone-400">Prezzo singolo</span>
                <span className="font-serif font-bold text-sm text-stone-900">{currentAccessory?.price} €</span>
              </div>
            </div>

          </div>
        </div>

        {/* Outfit Action Bar */}
        <div className="p-5 sm:p-6 border-t border-stone-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-baseline gap-3">
            <div>
              <span className="text-xs text-stone-400 uppercase tracking-wider block">Prezzo Outfit Completo:</span>
              <div className="flex items-baseline gap-2">
                <span className="text-sm text-stone-400 line-through">{rawTotal} €</span>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-amber-900">{bundleTotal} €</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Risparmi {savings} € (-15%)
                </span>
              </div>
            </div>
          </div>

          <div className="w-full sm:w-auto flex gap-3">
            <button
              onClick={handleAddBundle}
              className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer ${
                bundleAdded
                  ? 'bg-emerald-700 text-white'
                  : 'bg-stone-900 text-white hover:bg-stone-800 active:scale-95'
              }`}
            >
              {bundleAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Look Aggiunto al Carrello!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Aggiungi Look Completo al Carrello</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
