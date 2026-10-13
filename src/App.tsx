import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { FilterBar } from './components/FilterBar';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { OutfitBuilder } from './components/OutfitBuilder';
import { BoutiqueInfo } from './components/BoutiqueInfo';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';
import { INITIAL_PRODUCTS } from './data/products';
import { 
  Product, 
  ProductCategory, 
  ProductSize, 
  ProductColor, 
  CartItem, 
  FilterState, 
  OrderDetails 
} from './types';
import { Sparkles, ShoppingBag } from 'lucide-react';

export const App: React.FC = () => {
  // Products
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);

  // Cart State (Persisted in localStorage)
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('atelier_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist State (Persisted in localStorage)
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('atelier_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('atelier_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('atelier_wishlist', JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  // Filter State
  const [filters, setFilters] = useState<FilterState>({
    category: 'tutti',
    subcategory: null,
    search: '',
    maxPrice: 600,
    selectedSize: null,
    sortBy: 'featured',
    onSaleOnly: false,
    material: null
  });

  // Modals & Drawers state
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isOutfitBuilderOpen, setIsOutfitBuilderOpen] = useState(false);
  const [isBoutiqueInfoOpen, setIsBoutiqueInfoOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Checkout discount & promo pass-through
  const [checkoutPromo, setCheckoutPromo] = useState<string | null>(null);
  const [checkoutDiscount, setCheckoutDiscount] = useState(0);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Cart actions
  const handleAddToCart = (
    product: Product, 
    size?: ProductSize, 
    color?: ProductColor, 
    qty: number = 1
  ) => {
    const chosenSize = size || product.sizes[0] || 'M';
    const chosenColor = color || product.colors[0];
    const itemId = `${product.id}-${chosenSize}-${chosenColor.name}`;

    setCart(prev => {
      const existing = prev.find(i => i.id === itemId);
      if (existing) {
        return prev.map(i => i.id === itemId ? { ...i, quantity: i.quantity + qty } : i);
      }
      return [...prev, {
        id: itemId,
        product,
        selectedSize: chosenSize,
        selectedColor: chosenColor,
        quantity: qty
      }];
    });

    showToast(`"${product.name}" aggiunto al carrello!`);
  };

  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCart(prev => 
      prev
        .map(i => i.id === id ? { ...i, quantity: i.quantity + delta } : i)
        .filter(i => i.quantity > 0)
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist actions
  const handleToggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        showToast(`Rimosso dai preferiti`);
        return prev.filter(p => p.id !== product.id);
      } else {
        showToast(`"${product.name}" salvato nei preferiti!`);
        return [...prev, product];
      }
    });
  };

  const handleMoveWishlistToCart = (product: Product) => {
    handleAddToCart(product);
    setWishlist(prev => prev.filter(p => p.id !== product.id));
  };

  // Outfit bundle addition
  const handleAddLookToCart = (bundle: { product: Product; size: ProductSize; color: ProductColor }[]) => {
    bundle.forEach(item => {
      handleAddToCart(item.product, item.size, item.color, 1);
    });
    showToast(`Look completo (${bundle.length} capi) aggiunto al carrello!`);
  };

  // Checkout trigger from Cart Drawer
  const handleProceedToCheckout = (appliedCode: string | null, discountAmt: number) => {
    setCheckoutPromo(appliedCode);
    setCheckoutDiscount(discountAmt);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderCompleted = (order: OrderDetails) => {
    setCart([]);
    showToast(`Ordine #${order.orderNumber} registrato con successo!`);
  };

  // Filter handlers
  const handleCategoryChange = (cat: ProductCategory) => {
    setFilters(prev => ({
      ...prev,
      category: cat,
      subcategory: null,
      onSaleOnly: cat === 'saldi' ? true : prev.onSaleOnly
    }));
  };

  const handleFilterUpdate = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      category: 'tutti',
      subcategory: null,
      search: '',
      maxPrice: 600,
      selectedSize: null,
      sortBy: 'featured',
      onSaleOnly: false,
      material: null
    });
  };

  // Filtered Products computation
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Category filter
      if (filters.category === 'saldi') {
        if (!p.isSale) return false;
      } else if (filters.category !== 'tutti') {
        if (p.category !== filters.category) return false;
      }

      // Subcategory filter
      if (filters.subcategory && p.subcategory !== filters.subcategory) {
        return false;
      }

      // On sale toggle
      if (filters.onSaleOnly && !p.isSale) {
        return false;
      }

      // Max price
      if (p.price > filters.maxPrice) {
        return false;
      }

      // Size
      if (filters.selectedSize && !p.sizes.includes(filters.selectedSize)) {
        return false;
      }

      // Search query (name, subtitle, description, madeIn, composition)
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const matches = 
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.composition.toLowerCase().includes(q) ||
          p.madeIn.toLowerCase().includes(q);
        if (!matches) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      if (filters.sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0; // 'featured' keep original
    });
  }, [products, filters]);

  // Cart totals for checkout calculation
  const subtotal = cart.reduce((acc, i) => acc + i.product.price * i.quantity, 0);
  const shippingCost = subtotal >= 100 || subtotal === 0 ? 0 : 9.9;
  const grandTotal = Math.max(0, subtotal - checkoutDiscount + shippingCost);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold animate-in slide-in-from-bottom duration-200 border border-stone-700">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <Header
        currentCategory={filters.category}
        onSelectCategory={handleCategoryChange}
        cartCount={cart.reduce((sum, i) => sum + i.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        searchQuery={filters.search}
        onSearchChange={(q) => setFilters(prev => ({ ...prev, search: q }))}
        onOpenOutfitBuilder={() => setIsOutfitBuilderOpen(true)}
        onOpenBoutiqueInfo={() => setIsBoutiqueInfoOpen(true)}
      />

      {/* Hero Banner (Shown when not heavily searching or on homepage) */}
      {!filters.search && filters.category === 'tutti' && (
        <Hero
          onSelectCategory={handleCategoryChange}
          onOpenOutfitBuilder={() => setIsOutfitBuilderOpen(true)}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 gap-2">
          <div>
            <span className="text-xs font-semibold tracking-widest text-amber-800 uppercase">
              {filters.category === 'saldi' ? 'Occasioni di Stagione' : 'Collezioni Sartoriali Italiane'}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-stone-900 capitalize mt-0.5">
              {filters.category === 'tutti' 
                ? 'Tutti i Capi d’Abbigliamento' 
                : filters.category === 'saldi'
                ? 'Saldi Esclusivi'
                : `Collezione ${filters.category}`}
            </h2>
          </div>

          {/* Quick Outfit Builder Callout */}
          <button
            onClick={() => setIsOutfitBuilderOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 text-amber-900 border border-amber-200/80 hover:bg-amber-100 transition-colors text-xs font-semibold cursor-pointer w-fit"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Mix & Match Outfit (-15%)</span>
          </button>
        </div>

        {/* Filter and Subcategory Bar */}
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterUpdate}
          onResetFilters={handleResetFilters}
          totalResults={filteredProducts.length}
        />

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 max-w-lg mx-auto my-8">
            <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400 mb-4">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-800">Nessun capo trovato</h3>
            <p className="text-xs text-stone-500 mt-2 mb-6 leading-relaxed">
              Non ci sono articoli che corrispondono esattamente ai filtri selezionati. Prova a modificare i criteri di ricerca.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition-colors cursor-pointer"
            >
              Mostra tutti i capi
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlist.some(p => p.id === product.id)}
                onToggleWishlist={handleToggleWishlist}
                onQuickView={(p) => setQuickViewProduct(p)}
                onAddToCart={(p) => handleAddToCart(p)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modals & Slide-over Drawers */}
      <ProductDetailModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={quickViewProduct ? wishlist.some(p => p.id === quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onCheckout={handleProceedToCheckout}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleToggleWishlist}
        onMoveToCart={handleMoveWishlistToCart}
        onQuickView={(p) => setQuickViewProduct(p)}
      />

      <OutfitBuilder
        isOpen={isOutfitBuilderOpen}
        onClose={() => setIsOutfitBuilderOpen(false)}
        products={products}
        onAddLookToCart={handleAddLookToCart}
      />

      <BoutiqueInfo
        isOpen={isBoutiqueInfoOpen}
        onClose={() => setIsBoutiqueInfoOpen(false)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        subtotal={subtotal}
        discount={checkoutDiscount}
        shipping={shippingCost}
        total={grandTotal}
        appliedPromo={checkoutPromo}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Footer */}
      <Footer
        onSelectCategory={handleCategoryChange}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onOpenBoutiqueInfo={() => setIsBoutiqueInfoOpen(true)}
        onOpenOutfitBuilder={() => setIsOutfitBuilderOpen(true)}
      />
    </div>
  );
};

export default App;
