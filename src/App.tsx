import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { ShopPage } from './components/ShopPage';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { OutfitBuilder } from './components/OutfitBuilder';
import { BoutiqueInfo } from './components/BoutiqueInfo';
import { CheckoutModal } from './components/CheckoutModal';
import { MatterhornImporterModal } from './components/MatterhornImporterModal';
import { ProductCompareModal } from './components/ProductCompareModal';
import { Footer } from './components/Footer';
import { MATTERHORN_PRODUCTS } from './data/matterhornProducts';
import { matterhornApi, CategoryData } from './services/matterhornApi';
import { 
  Product, 
  ProductCategory, 
  ProductSize, 
  ProductColor, 
  CartItem, 
  OrderDetails 
} from './types';
import { Sparkles, Scale } from 'lucide-react';

export const App: React.FC = () => {
  // Navigation: 'home' | 'shop'
  const [activePage, setActivePage] = useState<'home' | 'shop'>('home');
  const [currentCategory, setCurrentCategory] = useState<ProductCategory>('tutti');

  // Search input
  const [searchQuery, setSearchQuery] = useState('');

  // Products Catalog: ONLY authentic Matterhorn Moda products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('matterhorn_store_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return MATTERHORN_PRODUCTS;
  });

  // Categories list with counts
  const [categories, setCategories] = useState<CategoryData[]>([
    {
      id: 'donna',
      name: 'Abbigliamento Donna',
      matterhornId: '60',
      count: 15,
      image: 'https://matterhorn-moda.it/pics_source/976954.jpg',
      description: 'Completi, pantaloni, vestiti da giorno e moda femminile raffinata'
    },
    {
      id: 'intimo',
      name: 'Intimo & Lingerie',
      matterhornId: '62',
      count: 10,
      image: 'https://matterhorn-moda.it/pics_source/1135401.jpg',
      description: 'Reggiseni push-up, pizzi floreali, body e completi seducenti'
    },
    {
      id: 'uomo',
      name: 'Moda Uomo',
      matterhornId: '223',
      count: 10,
      image: 'https://matterhorn-moda.it/pics_source/1130664.jpg',
      description: 'Boxer anatomici, slip sartoriali e intimo maschile di qualità'
    },
    {
      id: 'accessori',
      name: 'Borse & Accessori',
      matterhornId: '171',
      count: 5,
      image: 'https://matterhorn-moda.it/pics_source/1090400.jpg',
      description: 'Sciarpe, balaklava, berretti, borse e accessori di tendenza'
    },
    {
      id: 'scarpe',
      name: 'Calzature & Scarpe',
      matterhornId: '170',
      count: 4,
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80',
      description: 'Décolleté, sandali, calzature e accessori'
    },
    {
      id: 'costumi',
      name: 'Costumi da Bagno',
      matterhornId: '30',
      count: 4,
      image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80',
      description: 'Bikini due pezzi, costumi interi e moda mare estiva'
    }
  ]);

  // Load from backend on start
  const loadBackendData = useCallback(async () => {
    try {
      const [backendProducts, backendCategories] = await Promise.all([
        matterhornApi.getProducts(),
        matterhornApi.getCategories()
      ]);
      if (backendProducts && backendProducts.length > 0) {
        setProducts(backendProducts);
      }
      if (backendCategories && backendCategories.length > 0) {
        setCategories(backendCategories);
      }
    } catch {
      // Use local bundle fallback
    }
  }, []);

  useEffect(() => {
    loadBackendData();
  }, [loadBackendData]);

  // Persist products locally
  useEffect(() => {
    try {
      localStorage.setItem('matterhorn_store_products', JSON.stringify(products));
    } catch {}
  }, [products]);

  // Cart State (Persisted in localStorage)
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('matterhorn_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist State (Persisted in localStorage)
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('matterhorn_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Product Comparison state (Max 4 products)
  const [compareProductIds, setCompareProductIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('matterhorn_compare');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('matterhorn_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('matterhorn_wishlist', JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('matterhorn_compare', JSON.stringify(compareProductIds));
    } catch {}
  }, [compareProductIds]);

  // Modals & Drawers state
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isOutfitBuilderOpen, setIsOutfitBuilderOpen] = useState(false);
  const [isBoutiqueInfoOpen, setIsBoutiqueInfoOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isImporterOpen, setIsImporterOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Checkout discount & promo pass-through
  const [checkoutPromo, setCheckoutPromo] = useState<string | null>(null);
  const [checkoutDiscount, setCheckoutDiscount] = useState(0);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Navigation handlers
  const handleNavigate = (page: 'home' | 'shop', cat: ProductCategory = 'tutti') => {
    setActivePage(page);
    setCurrentCategory(cat);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Compare products toggle
  const handleToggleCompare = (product: Product) => {
    setCompareProductIds(prev => {
      if (prev.includes(product.id)) {
        showToast(`Rimosso dal confronto: ${product.name}`);
        return prev.filter(id => id !== product.id);
      }
      if (prev.length >= 4) {
        showToast('Puoi confrontare fino a un massimo di 4 prodotti contemporaneamente.');
        return prev;
      }
      showToast(`Aggiunto al confronto: ${product.name}`);
      return [...prev, product.id];
    });
  };

  const handleRemoveFromCompare = (id: string) => {
    setCompareProductIds(prev => prev.filter(i => i !== id));
  };

  const handleClearCompare = () => {
    setCompareProductIds([]);
    showToast('Confronto prodotti azzerato.');
  };

  // Importer actions
  const handleImportSuccess = (imported: Product[], mode: 'append' | 'replace') => {
    if (mode === 'replace') {
      setProducts(imported);
      showToast(`Catalogo sostituito con ${imported.length} prodotti da Matterhorn Moda!`);
    } else {
      setProducts(prev => {
        const existingIds = new Set(prev.map(p => p.id));
        const newItems = imported.filter(p => !existingIds.has(p.id));
        return [...newItems, ...prev];
      });
      showToast(`Aggiunti ${imported.length} capi dal feed XML di Matterhorn Moda!`);
    }
    loadBackendData();
  };

  const handleRestoreOriginal = () => {
    setProducts(MATTERHORN_PRODUCTS);
    showToast('Catalogo reimpostato con successo.');
    loadBackendData();
  };

  // Cart actions
  const handleAddToCart = (
    product: Product, 
    size?: ProductSize | string, 
    color?: ProductColor, 
    qty: number = 1
  ) => {
    const chosenSize = (size || product.sizes[0] || 'M') as ProductSize;
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
  const handleAddLookToCart = (bundle: { product: Product; size: ProductSize | string; color: ProductColor }[]) => {
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

  // Compared products resolution
  const comparedProductsList = useMemo(() => {
    return products.filter(p => compareProductIds.includes(p.id));
  }, [products, compareProductIds]);

  // Cart totals
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

      {/* Floating Compare Bar */}
      {compareProductIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-stone-900/95 backdrop-blur-md text-white px-5 py-3 rounded-full shadow-2xl border border-stone-700 flex items-center gap-4 animate-in slide-in-from-bottom duration-300">
          <div className="flex items-center gap-2 text-xs">
            <Scale className="w-4 h-4 text-amber-400" />
            <span><strong>{compareProductIds.length}</strong> capi selezionati per il confronto</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCompareOpen(true)}
              className="px-4 py-1.5 rounded-full bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Confronta Ora
            </button>
            <button
              onClick={handleClearCompare}
              className="text-stone-400 hover:text-white text-xs underline cursor-pointer"
            >
              Annulla
            </button>
          </div>
        </div>
      )}

      {/* Main Header */}
      <Header
        activePage={activePage}
        onNavigate={handleNavigate}
        currentCategory={currentCategory}
        cartCount={cart.reduce((sum, i) => sum + i.quantity, 0)}
        wishlistCount={wishlist.length}
        compareCount={compareProductIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenImporter={() => setIsImporterOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenOutfitBuilder={() => setIsOutfitBuilderOpen(true)}
        onOpenBoutiqueInfo={() => setIsBoutiqueInfoOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-1 w-full">
        {activePage === 'home' ? (
          <HomePage
            categories={categories}
            onSelectCategory={(cat) => handleNavigate('shop', cat)}
            onNavigateToShop={(cat) => handleNavigate('shop', cat || 'tutti')}
            onOpenImporter={() => setIsImporterOpen(true)}
            featuredProducts={products}
            wishlist={wishlist}
            compareProductIds={compareProductIds}
            onToggleWishlist={handleToggleWishlist}
            onQuickView={(p) => setQuickViewProduct(p)}
            onAddToCart={(p) => handleAddToCart(p)}
            onToggleCompare={handleToggleCompare}
          />
        ) : (
          <ShopPage
            products={products}
            currentCategory={currentCategory}
            onSelectCategory={setCurrentCategory}
            wishlist={wishlist}
            compareProductIds={compareProductIds}
            onToggleWishlist={handleToggleWishlist}
            onQuickView={(p) => setQuickViewProduct(p)}
            onAddToCart={(p) => handleAddToCart(p)}
            onToggleCompare={handleToggleCompare}
          />
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

      {/* Matterhorn Moda XML Importer Modal */}
      <MatterhornImporterModal
        isOpen={isImporterOpen}
        onClose={() => setIsImporterOpen(false)}
        onImportSuccess={handleImportSuccess}
        onRestoreOriginal={handleRestoreOriginal}
        currentCatalogCount={products.length}
      />

      {/* Product Comparison Modal */}
      <ProductCompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        compareProducts={comparedProductsList}
        onRemoveFromCompare={handleRemoveFromCompare}
        onClearCompare={handleClearCompare}
        onAddToCart={handleAddToCart}
        onQuickView={(p) => setQuickViewProduct(p)}
      />

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => handleNavigate('shop', cat)}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onOpenBoutiqueInfo={() => setIsBoutiqueInfoOpen(true)}
        onOpenOutfitBuilder={() => setIsOutfitBuilderOpen(true)}
      />
    </div>
  );
};

export default App;
