import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Truck, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';
import { CartItem } from '../types';
import { PROMO_CODES } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onCheckout: (appliedCode: string | null, discountAmount: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout
}) => {
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 100;
  const STANDARD_SHIPPING_COST = 9.9;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Discount calculation
  let discountAmount = 0;
  if (appliedPromo && PROMO_CODES[appliedPromo]) {
    discountAmount = (subtotal * PROMO_CODES[appliedPromo].discountPercent) / 100;
  }

  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : STANDARD_SHIPPING_COST;
  const total = Math.max(0, subtotal - discountAmount + shippingCost);
  const progressToFreeShipping = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const handleApplyPromo = () => {
    const code = promoCodeInput.trim().toUpperCase();
    if (!code) return;
    if (PROMO_CODES[code]) {
      setAppliedPromo(code);
      setPromoError('');
    } else {
      setPromoError('Codice non valido. Prova "BENVENUTO10" o "MODA20".');
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCodeInput('');
    setPromoError('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-stone-900" />
            <h2 className="font-serif text-xl font-bold text-stone-900">Il Tuo Carrello</h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-stone-200 text-stone-800 font-semibold">
              {items.reduce((sum, i) => sum + i.quantity, 0)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-500 hover:text-stone-950 hover:bg-stone-200 transition-colors cursor-pointer"
            aria-label="Chiudi carrello"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress bar */}
        {items.length > 0 && (
          <div className="px-5 py-3 bg-amber-50/70 border-b border-amber-100 text-xs">
            {remainingForFreeShipping > 0 ? (
              <div className="flex items-center gap-1.5 text-stone-700 mb-1.5 font-medium">
                <Truck className="w-4 h-4 text-amber-800 shrink-0" />
                <span>
                  Aggiungi altri <strong className="text-amber-900">{remainingForFreeShipping.toFixed(2)} €</strong> per ottenere la spedizione gratuita!
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-emerald-800 font-semibold mb-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Complimenti! Hai ottenuto la Spedizione Gratuita Express!</span>
              </div>
            )}
            <div className="w-full h-1.5 bg-amber-200/60 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-800 transition-all duration-500 rounded-full"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>
        )}

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-stone-100">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-800">Il tuo carrello è vuoto</h3>
                <p className="text-xs text-stone-500 max-w-xs mt-1">
                  Esplora le collezioni sartoriali e scopri i capi d'abbigliamento perfetti per il tuo stile.
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition-all cursor-pointer"
              >
                Inizia lo Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="py-4 flex gap-4 first:pt-0">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-20 h-24 object-cover object-top rounded-lg bg-stone-100 shrink-0 border border-stone-200"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-serif text-sm font-bold text-stone-900 line-clamp-1 pr-2">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-stone-400 hover:text-red-600 transition-colors p-1"
                        title="Rimuovi capo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-xs text-stone-500">
                      <span>Taglia: <strong className="text-stone-800">{item.selectedSize}</strong></span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        Colore: 
                        <span 
                          className="w-2.5 h-2.5 rounded-full inline-block border border-stone-300" 
                          style={{ backgroundColor: item.selectedColor.hex }} 
                        />
                        <strong className="text-stone-800">{item.selectedColor.name}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="px-2 py-0.5 text-stone-600 hover:text-stone-950 font-medium text-xs cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-2 py-0.5 text-xs font-semibold text-stone-900 min-w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="px-2 py-0.5 text-stone-600 hover:text-stone-950 font-medium text-xs cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="font-serif font-bold text-sm text-stone-900">
                        {(item.product.price * item.quantity).toFixed(0)} €
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with Promo Code and Totals */}
        {items.length > 0 && (
          <div className="p-5 border-t border-stone-200 bg-stone-50 space-y-4">
            {/* Promo Code Input */}
            <div>
              {appliedPromo ? (
                <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-lg p-2.5 text-xs text-amber-900">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    <span>Codice <strong>{appliedPromo}</strong> attivo (-{PROMO_CODES[appliedPromo].discountPercent}%)</span>
                  </div>
                  <button
                    onClick={handleRemovePromo}
                    className="text-stone-400 hover:text-stone-700 font-bold ml-2"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={promoCodeInput}
                        onChange={(e) => setPromoCodeInput(e.target.value)}
                        placeholder="Codice promozionale (es. BENVENUTO10)"
                        className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border border-stone-200 bg-white focus:outline-none focus:ring-1 focus:ring-stone-400 uppercase"
                      />
                      <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
                    </div>
                    <button
                      onClick={handleApplyPromo}
                      className="px-3.5 py-2 bg-stone-800 text-white text-xs font-semibold rounded-lg hover:bg-stone-900 cursor-pointer"
                    >
                      Applica
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-[11px] text-red-600 pl-1">{promoError}</p>
                  )}
                  <p className="text-[10px] text-stone-400 pl-1">
                    Suggerimento: usa <code className="bg-stone-200 px-1 py-0.5 rounded text-stone-700">BENVENUTO10</code> per il 10% di sconto
                  </p>
                </div>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-200/80 pt-3">
              <div className="flex justify-between">
                <span>Subtotale</span>
                <span className="font-semibold text-stone-900">{subtotal.toFixed(2)} €</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-amber-800 font-medium">
                  <span>Sconto Coupon ({appliedPromo})</span>
                  <span>-{discountAmount.toFixed(2)} €</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Spedizione Express</span>
                <span>
                  {shippingCost === 0 ? (
                    <strong className="text-emerald-700 uppercase tracking-wider text-[11px]">Gratuita</strong>
                  ) : (
                    `${shippingCost.toFixed(2)} €`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                <span>Totale Ordine</span>
                <span className="font-serif text-lg">{total.toFixed(2)} €</span>
              </div>
            </div>

            {/* Checkout Action */}
            <div className="space-y-2 pt-1">
              <button
                onClick={() => onCheckout(appliedPromo, discountAmount)}
                className="w-full py-3.5 bg-stone-900 text-white rounded-xl font-semibold uppercase tracking-wider text-xs hover:bg-stone-800 transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <span>Procedi al Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex justify-between items-center text-[10px] text-stone-400 pt-1">
                <span>🔒 Pagamento sicuro crittografato SSL</span>
                <button
                  onClick={onClearCart}
                  className="hover:text-red-600 underline cursor-pointer"
                >
                  Svuota carrello
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
