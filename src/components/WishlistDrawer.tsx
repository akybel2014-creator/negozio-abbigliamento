import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (p: Product) => void;
  onMoveToCart: (p: Product) => void;
  onQuickView: (p: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onMoveToCart,
  onQuickView
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-600 fill-current" />
            <h2 className="font-serif text-xl font-bold text-stone-900">Lista Desideri</h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-stone-200 text-stone-800 font-semibold">
              {wishlist.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-500 hover:text-stone-950 hover:bg-stone-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 divide-y divide-stone-100">
          {wishlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                <Heart className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-800">Nessun capo salvato</h3>
                <p className="text-xs text-stone-500 max-w-xs mt-1">
                  Clicca sull'icona a cuore dei tuoi capi preferiti per salvarli qui e ritrovarli facilmente.
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition-all cursor-pointer"
              >
                Esplora i Capi
              </button>
            </div>
          ) : (
            wishlist.map((product) => (
              <div key={product.id} className="py-4 flex gap-4 first:pt-0">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  onClick={() => {
                    onClose();
                    onQuickView(product);
                  }}
                  className="w-20 h-24 object-cover object-top rounded-lg bg-stone-100 shrink-0 border border-stone-200 cursor-pointer"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 
                        onClick={() => {
                          onClose();
                          onQuickView(product);
                        }}
                        className="font-serif text-sm font-bold text-stone-900 line-clamp-1 pr-2 hover:text-amber-900 cursor-pointer"
                      >
                        {product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveFromWishlist(product)}
                        className="text-stone-400 hover:text-red-600 transition-colors p-1"
                        title="Rimuovi"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs text-stone-500 mt-0.5 line-clamp-1">{product.subtitle}</p>
                    <span className="font-serif font-bold text-sm text-stone-900 mt-1 block">
                      {product.price} €
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => onMoveToCart(product)}
                      className="flex-1 py-2 px-3 bg-stone-900 text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Nel Carrello</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {wishlist.length > 0 && (
          <div className="p-4 border-t border-stone-200 bg-stone-50 text-center">
            <button
              onClick={onClose}
              className="text-xs font-semibold uppercase tracking-wider text-stone-600 hover:text-stone-900 cursor-pointer"
            >
              Continua a curiosare
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
