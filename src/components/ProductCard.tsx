import React from 'react';
import { Heart, Eye, ShoppingBag, Star, Sparkles, Scale } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (p: Product) => void;
  onQuickView: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  isCompared?: boolean;
  onToggleCompare?: (p: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  isCompared = false,
  onToggleCompare
}) => {
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div className={`group relative bg-white rounded-xl overflow-hidden border transition-all duration-300 flex flex-col ${
      isCompared ? 'border-amber-700 ring-2 ring-amber-700/20 shadow-md' : 'border-stone-200/80 hover:border-stone-400 hover:shadow-xl'
    }`}>
      {/* Product Image Area */}
      <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden cursor-pointer" onClick={() => onQuickView(product)}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Alternate image on hover if available */}
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.name} dettaglio`}
            className="w-full h-full object-cover object-top absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            loading="lazy"
          />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.brand && (
            <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-amber-900/90 text-amber-100 backdrop-blur-xs rounded shadow-xs">
              {product.brand}
            </span>
          )}
          {product.isSale && (
            <span className="px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase bg-amber-800 text-white rounded-md shadow-sm">
              -{discountPercent}% SALDI
            </span>
          )}
          {product.isNew && !product.isSale && (
            <span className="px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase bg-stone-900 text-white rounded-md shadow-sm">
              Nuovo
            </span>
          )}
          {product.isBestSeller && (
            <span className="px-2.5 py-1 text-[11px] font-medium tracking-wide uppercase bg-amber-100 text-amber-900 border border-amber-300/80 rounded-md shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-700" />
              Iconico
            </span>
          )}
          {product.stock <= 4 && (
            <span className="px-2 py-0.5 text-[10px] font-medium bg-red-50 text-red-700 border border-red-200 rounded">
              Solo {product.stock} rimasti
            </span>
          )}
        </div>

        {/* Top Right Action Buttons (Wishlist & Compare) */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-all cursor-pointer shadow-sm ${
              isWishlisted
                ? 'bg-red-50 text-red-600 scale-110'
                : 'bg-white/80 text-stone-600 hover:text-stone-950 hover:bg-white'
            }`}
            aria-label="Aggiungi ai preferiti"
            title="Aggiungi ai preferiti"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current text-red-600' : ''}`} />
          </button>

          {onToggleCompare && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleCompare(product);
              }}
              className={`p-2 rounded-full backdrop-blur-md transition-all cursor-pointer shadow-sm ${
                isCompared
                  ? 'bg-amber-900 text-white scale-110'
                  : 'bg-white/80 text-stone-600 hover:text-stone-950 hover:bg-white'
              }`}
              aria-label="Confronta prodotto"
              title={isCompared ? 'Rimuovi dal confronto' : 'Aggiungi al confronto'}
            >
              <Scale className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Actions Hover Overlay on Desktop */}
        <div className="absolute inset-x-3 bottom-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex-1 py-2.5 px-3 bg-white/95 backdrop-blur text-stone-900 rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-white shadow-md flex items-center justify-center gap-1.5 cursor-pointer transition-transform active:scale-95"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Dettagli</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="p-2.5 bg-stone-900 text-white rounded-lg hover:bg-stone-800 shadow-md flex items-center justify-center cursor-pointer transition-transform active:scale-95"
            title="Aggiungi al carrello"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Subcategory & Origin */}
          <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
            <span className="uppercase tracking-widest font-medium truncate max-w-[150px]">{product.subcategory}</span>
            <span className="text-amber-800 font-medium truncate max-w-[120px]">{product.madeIn.split(',')[0]}</span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onQuickView(product)}
            className="font-serif text-base font-semibold text-stone-900 hover:text-amber-900 transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          <p className="text-xs text-stone-500 line-clamp-1 mt-0.5 font-light">
            {product.subtitle}
          </p>

          {/* Color swatches preview */}
          <div className="flex items-center gap-1.5 mt-2.5">
            {product.colors.map((c) => (
              <span
                key={c.name}
                className="w-3 h-3 rounded-full border border-stone-300 shadow-2xs"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
            <span className="text-[10px] text-stone-400 ml-1">
              {product.colors.length} {product.colors.length === 1 ? 'colore' : 'colori'}
            </span>
          </div>
        </div>

        {/* Rating and Pricing Row */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-stone-600">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span className="font-semibold text-stone-800">{product.rating}</span>
            <span className="text-[10px] text-stone-400">({product.reviewCount})</span>
          </div>

          <div className="text-right">
            {product.originalPrice ? (
              <div className="flex items-baseline gap-1.5">
                <span className="text-xs text-stone-400 line-through">
                  {product.originalPrice} €
                </span>
                <span className="font-serif font-bold text-base text-amber-900">
                  {product.price} €
                </span>
              </div>
            ) : (
              <span className="font-serif font-bold text-base text-stone-900">
                {product.price} €
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
