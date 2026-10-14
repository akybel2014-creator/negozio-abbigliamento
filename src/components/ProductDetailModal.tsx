import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Heart, 
  ShoppingBag, 
  Check, 
  Ruler, 
  ShieldCheck, 
  Truck, 
  Sparkles,
  Info
} from 'lucide-react';
import { Product, ProductColor, ProductSize } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: ProductSize | string, color: ProductColor, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onOpenSizeGuide: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  onOpenSizeGuide
}) => {
  if (!product) return null;

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<ProductSize | string>(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 text-stone-700 hover:text-stone-950 hover:bg-white shadow-md transition-all cursor-pointer"
          aria-label="Chiudi finestra"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Photo Gallery */}
        <div className="md:w-1/2 bg-stone-100 flex flex-col justify-between p-4 sm:p-6 border-b md:border-b-0 md:border-r border-stone-200">
          <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-white shadow-sm">
            <img
              src={product.images[activeImageIdx] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-top"
            />
            {product.isSale && (
              <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-amber-800 text-white rounded-md shadow">
                -{discountPercent}% SALDI
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-16 h-20 rounded-lg overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                    activeImageIdx === idx ? 'border-stone-900 shadow-md' : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover object-top" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Product Details & Controls */}
        <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto max-h-[85vh] md:max-h-[92vh] flex flex-col justify-between">
          <div className="space-y-5">
            {/* Badges and Subtitle */}
            <div className="flex items-center justify-between text-xs text-stone-500">
              <span className="uppercase tracking-widest font-semibold text-amber-800">{product.subcategory}</span>
              <span className="flex items-center gap-1 text-stone-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                {product.madeIn}
              </span>
            </div>

            {/* Name */}
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900">
                {product.name}
              </h2>
              <p className="text-stone-500 text-sm mt-1">{product.subtitle}</p>
            </div>

            {/* Rating and Price */}
            <div className="flex items-center justify-between py-2 border-y border-stone-100">
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-stone-300'}`}
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-stone-700 ml-1">{product.rating}</span>
                <span className="text-xs text-stone-400">({product.reviewCount} recensioni verificate)</span>
              </div>

              <div>
                {product.originalPrice ? (
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm text-stone-400 line-through">{product.originalPrice} €</span>
                    <span className="font-serif text-2xl font-bold text-amber-900">{product.price} €</span>
                  </div>
                ) : (
                  <span className="font-serif text-2xl font-bold text-stone-900">{product.price} €</span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-stone-600 text-sm leading-relaxed font-light">
              {product.description}
            </p>

            {/* Color Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-stone-700">
                  Colore: <span className="font-normal text-stone-900">{selectedColor.name}</span>
                </span>
              </div>
              <div className="flex gap-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    className={`relative w-8 h-8 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center ${
                      selectedColor.name === c.name ? 'border-stone-900 scale-110 shadow-sm' : 'border-stone-300'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  >
                    {selectedColor.name === c.name && (
                      <Check className={`w-4 h-4 ${['#FDFBF7', '#F5F5F4', '#CBD5E1', '#D2B48C'].includes(c.hex) ? 'text-stone-900' : 'text-white'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-stone-700">
                  Taglia: <span className="font-normal text-stone-900">{selectedSize}</span>
                </span>
                <button
                  onClick={onOpenSizeGuide}
                  className="text-xs text-stone-600 hover:text-stone-900 underline flex items-center gap-1 cursor-pointer font-medium"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Guida alle Taglie</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-3.5 py-2 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                      selectedSize === s
                        ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                        : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Action Buttons */}
            <div className="pt-2 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-stone-300 rounded-lg bg-stone-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-stone-600 hover:text-stone-950 font-medium text-sm cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-sm font-semibold text-stone-900 min-w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-3 py-2 text-stone-600 hover:text-stone-950 font-medium text-sm cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  disabled={product.stock <= 0}
                  className={`flex-1 py-3.5 px-6 rounded-xl font-semibold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer ${
                    addedSuccess
                      ? 'bg-emerald-700 text-white'
                      : product.stock <= 0
                      ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                      : 'bg-stone-900 text-white hover:bg-stone-800 active:scale-[0.98]'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Aggiunto al Carrello!</span>
                    </>
                  ) : product.stock <= 0 ? (
                    <span>Esaurito</span>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Aggiungi al Carrello • {(product.price * quantity).toFixed(0)} €</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isWishlisted
                      ? 'bg-red-50 text-red-600 border-red-200'
                      : 'border-stone-200 text-stone-600 hover:text-stone-950 hover:bg-stone-50'
                  }`}
                  aria-label="Aggiungi ai preferiti"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current text-red-600' : ''}`} />
                </button>
              </div>

              {product.stock <= 4 && (
                <div className="flex items-center gap-1.5 text-xs text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200/60">
                  <Info className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Disponibilità limitata: restano solo {product.stock} pezzi in magazzino.</span>
                </div>
              )}
            </div>

            {/* Garment Highlights & Fabric Details Accordion */}
            <div className="pt-4 border-t border-stone-200 space-y-3 text-xs text-stone-600">
              <div>
                <span className="font-semibold text-stone-800 uppercase tracking-wider">Composizione:</span>{' '}
                {product.composition}
              </div>
              <div>
                <span className="font-semibold text-stone-800 uppercase tracking-wider">Cura del capo:</span>{' '}
                {product.careInstructions}
              </div>
              <ul className="list-disc pl-4 space-y-1 text-stone-500">
                {product.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            </div>

            {/* Reassurances */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-stone-100 text-[11px] text-stone-500">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-stone-700" />
                <span>Spedizione 24/48h & reso 30gg</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>Confezione regalo sartoriale inclusa</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
