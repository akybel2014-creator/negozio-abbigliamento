import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Layers, 
  Tag, 
  Download, 
  ShoppingBag 
} from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { CategoryData } from '../services/matterhornApi';
import { ProductCard } from './ProductCard';

interface HomePageProps {
  categories: CategoryData[];
  onSelectCategory: (catId: ProductCategory) => void;
  onNavigateToShop: (catId?: ProductCategory) => void;
  onOpenImporter: () => void;
  featuredProducts: Product[];
  wishlist: Product[];
  compareProductIds: string[];
  onToggleWishlist: (p: Product) => void;
  onQuickView: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  onToggleCompare: (p: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  categories,
  onNavigateToShop,
  onOpenImporter,
  featuredProducts,
  wishlist,
  compareProductIds,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  onToggleCompare
}) => {
  const brands = ['DKaren', 'Obsessive', 'Róża', 'Anais', 'Awama'];

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Banner */}
      <div className="relative bg-stone-900 text-stone-100 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=80"
            alt="Collezioni Moda"
            className="w-full h-full object-cover object-top opacity-30 filter brightness-75 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-900/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-semibold tracking-widest uppercase backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Feed XML Matterhorn Moda • Catalogo Ufficiale</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-tight">
              Moda & Lingerie Europea <span className="italic font-normal text-amber-200">B2B e Dettaglio</span>.
            </h1>

            <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed max-w-xl">
              Capi autentici importati direttamente dal feed XML di Matterhorn Moda. 
              Abiti da donna, lingerie raffinata, moda uomo e accessori con prezzi ingrosso e al dettaglio.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <button
                onClick={() => onNavigateToShop('tutti')}
                className="px-7 py-3.5 bg-white text-stone-950 text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-xl hover:bg-stone-100 transition-all shadow-lg hover:shadow-xl cursor-pointer flex items-center gap-2 group"
              >
                <span>Esplora lo Shop Completo</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onOpenImporter}
                className="px-5 py-3.5 bg-amber-800/80 backdrop-blur-md text-amber-100 border border-amber-600/40 text-xs sm:text-sm font-medium tracking-wide uppercase rounded-xl hover:bg-amber-800 transition-all cursor-pointer flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-amber-300" />
                <span>Gestione Import XML</span>
              </button>
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="mt-14 pt-6 border-t border-stone-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-stone-300">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-stone-800/60 text-amber-300 border border-stone-700/40">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider">Prodotti Originali</h4>
                <p className="text-xs text-stone-400 mt-0.5">Certificati dai produttori europei</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-stone-800/60 text-amber-300 border border-stone-700/40">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider">Spedizione Rapida</h4>
                <p className="text-xs text-stone-400 mt-0.5">Consegna in 24/48h con DHL Express</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-stone-800/60 text-amber-300 border border-stone-700/40">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider">Feed B2B Sincronizzato</h4>
                <p className="text-xs text-stone-400 mt-0.5">Scorte e prezzi sempre aggiornati</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-stone-800/60 text-amber-300 border border-stone-700/40">
                <Tag className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider">Prezzi Competitivi</h4>
                <p className="text-xs text-stone-400 mt-0.5">Margine e sconti promozionali attivi</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION: CATEGORIE PRODOTTO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <span className="text-xs font-bold tracking-widest text-amber-800 uppercase block">
              Esplora il Catalogo
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-stone-900 mt-1">
              Categorie di Prodotto
            </h2>
          </div>
          <button
            onClick={() => onNavigateToShop('tutti')}
            className="text-xs font-semibold uppercase tracking-wider text-amber-900 hover:text-amber-950 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Visualizza tutto lo Shop</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigateToShop(cat.id as ProductCategory)}
              className="group relative bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl hover:border-stone-400 transition-all duration-300 cursor-pointer flex flex-col"
            >
              {/* Category Image */}
              <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 block mb-1">
                    {cat.count} {cat.count === 1 ? 'Capo' : 'Capi Disponibili'}
                  </span>
                  <h3 className="font-serif text-2xl font-semibold leading-snug">
                    {cat.name}
                  </h3>
                </div>
              </div>

              {/* Description & Action */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-stone-600 line-clamp-2 font-light">
                  {cat.description}
                </p>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-900 group-hover:text-amber-800 transition-colors">
                    Esplora Categoria
                  </span>
                  <div className="p-2 rounded-full bg-stone-100 group-hover:bg-amber-800 group-hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: BRAND PARTNER */}
      <section className="bg-stone-100 py-12 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold tracking-widest text-amber-800 uppercase block">
              Fornitori & Produttori Ufficiali
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900 mt-1">
              I Marchi di Matterhorn Moda
            </h3>
            <p className="text-xs text-stone-500 mt-2">
              Importiamo capi dai più celebri brand di intimo, lingerie e prêt-à-porter europeo.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {brands.map((b) => (
              <div
                key={b}
                onClick={() => onNavigateToShop('tutti')}
                className="px-6 py-4 bg-white rounded-xl border border-stone-200 hover:border-stone-400 hover:shadow-md transition-all cursor-pointer font-serif font-bold text-lg text-stone-800 text-center tracking-wider"
              >
                {b}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: NUOVI ARRIVI IN EVIDENZA */}
      {featuredProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
            <div>
              <span className="text-xs font-bold tracking-widest text-amber-800 uppercase block">
                Selezione del Momento
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-stone-900 mt-1">
                Nuovi Arrivi Importati
              </h2>
            </div>
            <button
              onClick={() => onNavigateToShop('tutti')}
              className="text-xs font-semibold uppercase tracking-wider text-amber-900 hover:text-amber-950 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Vedi tutti ({featuredProducts.length})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 8).map((product) => (
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
      )}

      {/* SECTION: B2B INTEGRATION CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border border-stone-800 shadow-xl">
          <div className="max-w-xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Download className="w-3.5 h-3.5" />
              <span>Sincronizzazione XML B2B</span>
            </div>
            <h3 className="font-serif text-3xl font-bold">
              Vuoi importare altri prodotti o aggiornare i listini?
            </h3>
            <p className="text-stone-300 text-sm font-light leading-relaxed">
              Il nostro backend dedicato si collega a <code>matterhorn-moda.it</code>, scarica in tempo reale il catalogo in streaming e permette di personalizzare margine di ricarico e categorie.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <button
              onClick={onOpenImporter}
              className="px-6 py-3.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold uppercase tracking-wider text-xs rounded-xl shadow-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Apri Pannello Importazione</span>
            </button>
            <button
              onClick={() => onNavigateToShop('tutti')}
              className="px-6 py-3.5 bg-stone-800 hover:bg-stone-700 text-white font-medium uppercase tracking-wider text-xs rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Vai allo Shop</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
