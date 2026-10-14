import React, { useState, useMemo } from 'react';
import { 
  Layers, 
  Grid3X3, 
  ArrowUpDown, 
  Tag, 
  X, 
  ChevronRight,
  Filter
} from 'lucide-react';
import { Product, ProductCategory, ProductSize, FilterState } from '../types';
import { ProductCard } from './ProductCard';

interface ShopPageProps {
  products: Product[];
  currentCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  wishlist: Product[];
  compareProductIds: string[];
  onToggleWishlist: (p: Product) => void;
  onQuickView: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  onToggleCompare: (p: Product) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  products,
  currentCategory,
  onSelectCategory,
  wishlist,
  compareProductIds,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  onToggleCompare
}) => {
  // View mode: 'divided' (separated by category sections in order) or 'unified' (single continuous grid)
  const [viewMode, setViewMode] = useState<'divided' | 'unified'>('divided');

  // Filters state
  const [filters, setFilters] = useState<FilterState>({
    category: currentCategory,
    subcategory: null,
    search: '',
    maxPrice: 600,
    selectedSize: null,
    sortBy: 'featured',
    onSaleOnly: false,
    material: null,
    selectedBrand: null
  });

  // Sync prop category change with filter
  React.useEffect(() => {
    setFilters(prev => ({
      ...prev,
      category: currentCategory,
      subcategory: null
    }));
  }, [currentCategory]);

  // Order of categories for divided view
  const ORDERED_CATEGORIES: { id: string; name: string; icon: string; desc: string }[] = [
    { id: 'donna', name: 'Abbigliamento Donna', icon: '👗', desc: 'Completi, pantaloni, gonne e vestiti da giorno' },
    { id: 'intimo', name: 'Intimo & Lingerie Donna', icon: '👙', desc: 'Reggiseni push-up, pizzi floreali, body e completi intimi' },
    { id: 'uomo', name: 'Moda Uomo', icon: '👔', desc: 'Boxer, slip, intimo anatomico e abbigliamento maschile' },
    { id: 'accessori', name: 'Borse & Accessori', icon: '👜', desc: 'Sciarpe, balaklava, berretti e pelletteria' },
    { id: 'scarpe', name: 'Calzature', icon: '👠', desc: 'Scarpe, sandali e décolleté moda' },
    { id: 'costumi', name: 'Costumi da Bagno', icon: '🩱', desc: 'Bikini e moda mare' }
  ];

  // Available brands in the catalog
  const availableBrands = useMemo(() => {
    const set = new Set<string>();
    products.forEach(p => {
      if (p.brand) set.add(p.brand);
    });
    return Array.from(set).sort();
  }, [products]);

  // Filtered Products computation
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Category filter
      if (filters.category === 'saldi') {
        if (!p.isSale) return false;
      } else if (filters.category !== 'tutti') {
        if (p.category !== filters.category) return false;
      }

      // Subcategory
      if (filters.subcategory && p.subcategory !== filters.subcategory) {
        return false;
      }

      // Brand
      if (filters.selectedBrand && p.brand !== filters.selectedBrand) {
        return false;
      }

      // On sale
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

      // Search
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const matches = 
          p.name.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          (p.brand && p.brand.toLowerCase().includes(q)) ||
          p.description.toLowerCase().includes(q);
        if (!matches) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      if (filters.sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0;
    });
  }, [products, filters]);

  // Subcategories available for active category
  const availableSubcategories = useMemo(() => {
    const subs = new Set<string>();
    const pool = filters.category === 'tutti' ? products : products.filter(p => p.category === filters.category);
    pool.forEach(p => {
      if (p.subcategory) subs.add(p.subcategory);
    });
    return Array.from(subs);
  }, [products, filters.category]);

  const SIZES: ProductSize[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '38', '40', '42', '44', '46', 'Unica'];

  const handleResetFilters = () => {
    setFilters({
      category: 'tutti',
      subcategory: null,
      search: '',
      maxPrice: 600,
      selectedSize: null,
      sortBy: 'featured',
      onSaleOnly: false,
      material: null,
      selectedBrand: null
    });
    onSelectCategory('tutti');
  };

  const hasActiveFilters = 
    filters.subcategory !== null || 
    filters.selectedSize !== null || 
    filters.selectedBrand !== null ||
    filters.maxPrice < 600 || 
    filters.onSaleOnly || 
    Boolean(filters.search);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-stone-900 text-white rounded-2xl p-6 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-lg">
        <div>
          <span className="text-amber-400 text-xs font-bold tracking-widest uppercase block mb-1">
            Shop Ufficiale • Matterhorn Moda B2B
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold">
            Tutte le Categorie in Ordine
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 mt-2 max-w-xl font-light">
            Esplora le sezioni dedicate: abbigliamento femminile, intimo & lingerie, moda maschile, accessori e calzature.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-2 bg-stone-800 p-1.5 rounded-xl border border-stone-700 text-xs shrink-0">
          <button
            onClick={() => setViewMode('divided')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'divided'
                ? 'bg-amber-600 text-stone-950 font-bold shadow-xs'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Per Sezioni Divise</span>
          </button>
          <button
            onClick={() => setViewMode('unified')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'unified'
                ? 'bg-amber-600 text-stone-950 font-bold shadow-xs'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            <Grid3X3 className="w-3.5 h-3.5" />
            <span>Griglia Continua</span>
          </button>
        </div>
      </div>

      {/* Category Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-stone-200">
        <button
          onClick={() => {
            onSelectCategory('tutti');
            setFilters(prev => ({ ...prev, category: 'tutti', subcategory: null }));
          }}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all shrink-0 cursor-pointer ${
            filters.category === 'tutti'
              ? 'bg-stone-900 text-white shadow-md'
              : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
          }`}
        >
          🌐 Tutte le Categorie ({products.length})
        </button>

        {ORDERED_CATEGORIES.map(cat => {
          const count = products.filter(p => p.category === cat.id).length;
          return (
            <button
              key={cat.id}
              onClick={() => {
                onSelectCategory(cat.id as ProductCategory);
                setFilters(prev => ({ ...prev, category: cat.id as ProductCategory, subcategory: null }));
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                filters.category === cat.id
                  ? 'bg-stone-900 text-white shadow-md'
                  : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                filters.category === cat.id ? 'bg-amber-500 text-stone-950' : 'bg-stone-100 text-stone-600'
              }`}>
                {count}
              </span>
            </button>
          );
        })}

        <button
          onClick={() => {
            onSelectCategory('saldi');
            setFilters(prev => ({ ...prev, category: 'saldi', subcategory: null, onSaleOnly: true }));
          }}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
            filters.category === 'saldi'
              ? 'bg-amber-800 text-white shadow-md'
              : 'bg-amber-50 border border-amber-200 text-amber-900 hover:bg-amber-100'
          }`}
        >
          <Tag className="w-3.5 h-3.5" />
          <span>Saldi & Offerte</span>
        </button>
      </div>

      {/* Filter and Control Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
          
          {/* Subcategory Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <span className="text-stone-400 font-semibold uppercase text-[10px] shrink-0 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Sottocategorie:
            </span>
            <button
              onClick={() => setFilters(prev => ({ ...prev, subcategory: null }))}
              className={`px-3 py-1 rounded-full text-xs font-medium tracking-wide transition-all shrink-0 cursor-pointer ${
                filters.subcategory === null
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              Tutte
            </button>
            {availableSubcategories.map(sub => (
              <button
                key={sub}
                onClick={() => setFilters(prev => ({ ...prev, subcategory: prev.subcategory === sub ? null : sub }))}
                className={`px-3 py-1 rounded-full text-xs font-medium tracking-wide transition-all shrink-0 cursor-pointer ${
                  filters.subcategory === sub
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>

          {/* Right Sorter and Count */}
          <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
            <span className="text-xs text-stone-500">
              <strong className="text-stone-900">{filteredProducts.length}</strong> articoli
            </span>

            <div className="flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as FilterState['sortBy'] }))}
                className="text-xs bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5 text-stone-700 focus:outline-none cursor-pointer"
              >
                <option value="featured">Consigliati / Rilevanza</option>
                <option value="price-asc">Prezzo: dal più basso</option>
                <option value="price-desc">Prezzo: dal più alto</option>
                <option value="rating">Miglior Valutazione</option>
                <option value="newest">Novità Fornitore</option>
              </select>
            </div>
          </div>
        </div>

        {/* Secondary Filter Row: Brands, Price, Sizes */}
        <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4 text-xs">
          {/* Brand select */}
          {availableBrands.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-stone-500 font-medium">Brand:</span>
              <select
                value={filters.selectedBrand || ''}
                onChange={(e) => setFilters(prev => ({ ...prev, selectedBrand: e.target.value ? e.target.value : null }))}
                className="text-xs bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1 text-stone-800 cursor-pointer focus:outline-none"
              >
                <option value="">Tutti i Brand ({availableBrands.length})</option>
                {availableBrands.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
          )}

          {/* Size Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-stone-500 font-medium">Taglia:</span>
            {SIZES.map(s => (
              <button
                key={s}
                onClick={() => setFilters(prev => ({ ...prev, selectedSize: prev.selectedSize === s ? null : s }))}
                className={`w-6 h-6 rounded font-semibold text-[10px] transition-all cursor-pointer ${
                  filters.selectedSize === s
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Price Range */}
          <div className="flex items-center gap-2">
            <span className="text-stone-500 font-medium">Prezzo max:</span>
            <input
              type="range"
              min="15"
              max="250"
              step="5"
              value={filters.maxPrice}
              onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
              className="accent-stone-900 cursor-pointer w-24"
            />
            <span className="font-semibold text-stone-900">{filters.maxPrice} €</span>

            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1 text-[11px] text-amber-900 hover:text-amber-950 font-medium ml-2 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reimposta</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* PRODUCTS DISPLAY AREA */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 max-w-lg mx-auto">
          <p className="font-serif text-xl font-bold text-stone-800">Nessun articolo trovato con i filtri correnti</p>
          <p className="text-xs text-stone-500 mt-2 mb-6">
            Prova a modificare i filtri o azzerali per vedere tutti i prodotti del catalogo Matterhorn Moda.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-6 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition-colors cursor-pointer"
          >
            Mostra tutto lo Shop
          </button>
        </div>
      ) : viewMode === 'divided' && filters.category === 'tutti' ? (
        /* DIVIDED BY CATEGORIES IN ORDER */
        <div className="space-y-14">
          {ORDERED_CATEGORIES.map(cat => {
            const catItems = filteredProducts.filter(p => p.category === cat.id);
            if (catItems.length === 0) return null;

            return (
              <section key={cat.id} className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-xs space-y-6">
                {/* Section Category Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl p-2 rounded-xl bg-stone-100">{cat.icon}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="font-serif text-2xl font-bold text-stone-900">
                          {cat.name}
                        </h2>
                        <span className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold">
                          {catItems.length} {catItems.length === 1 ? 'capo' : 'capi'}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5">{cat.desc}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onSelectCategory(cat.id as ProductCategory);
                      setFilters(prev => ({ ...prev, category: cat.id as ProductCategory, subcategory: null }));
                    }}
                    className="text-xs font-semibold text-amber-900 hover:text-amber-950 flex items-center gap-1 cursor-pointer self-start sm:self-auto"
                  >
                    <span>Vedi solo {cat.name}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Grid for this category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {catItems.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isWishlisted={wishlist.some(p => p.id === product.id)}
                      onToggleWishlist={onToggleWishlist}
                      onQuickView={onQuickView}
                      onAddToCart={onAddToCart}
                      isCompared={compareProductIds.includes(product.id)}
                      onToggleCompare={onToggleCompare}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        /* UNIFIED CONTINUOUS GRID VIEW OR SPECIFIC CATEGORY FILTERED */
        <div>
          {filters.category !== 'tutti' && (
            <div className="mb-6 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800">Categoria Selezionata</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 capitalize">
                  {filters.category === 'saldi' ? 'Saldi & Offerte' : ORDERED_CATEGORIES.find(c => c.id === filters.category)?.name || filters.category}
                </h2>
              </div>
              <button
                onClick={() => {
                  onSelectCategory('tutti');
                  setFilters(prev => ({ ...prev, category: 'tutti', subcategory: null }));
                }}
                className="text-xs font-semibold text-stone-600 hover:text-stone-900 underline cursor-pointer"
              >
                ← Torna a Tutte le Categorie
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlist.some(p => p.id === product.id)}
                onToggleWishlist={onToggleWishlist}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
                isCompared={compareProductIds.includes(product.id)}
                onToggleCompare={onToggleCompare}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
