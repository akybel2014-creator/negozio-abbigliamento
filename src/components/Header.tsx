import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  Sparkles, 
  MapPin, 
  PhoneCall,
  Scissors,
  Download,
  Scale,
  Store,
  Home
} from 'lucide-react';
import { ProductCategory } from '../types';

interface HeaderProps {
  activePage: 'home' | 'shop';
  onNavigate: (page: 'home' | 'shop', cat?: ProductCategory) => void;
  currentCategory: ProductCategory;
  cartCount: number;
  wishlistCount: number;
  compareCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenCompare: () => void;
  onOpenImporter: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenOutfitBuilder: () => void;
  onOpenBoutiqueInfo: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  onNavigate,
  currentCategory,
  cartCount,
  wishlistCount,
  compareCount,
  onOpenCart,
  onOpenWishlist,
  onOpenCompare,
  onOpenImporter,
  searchQuery,
  onSearchChange,
  onOpenOutfitBuilder,
  onOpenBoutiqueInfo
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-all">
      {/* Announcement Bar */}
      <div className="bg-stone-900 text-stone-200 text-xs py-2 px-4 text-center tracking-wider font-light flex items-center justify-between sm:justify-center gap-4">
        <div className="flex items-center gap-3">
          <span>✨ Spedizione express omaggio sopra i 100€ in tutta Italia</span>
          <span className="hidden md:inline text-stone-500">•</span>
          <span className="hidden md:inline">Feed XML Matterhorn Moda B2B Sincronizzato</span>
        </div>

        {/* Quick Importer Trigger Button in announcement bar */}
        <button
          onClick={onOpenImporter}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-stone-950 font-bold hover:bg-amber-400 text-[11px] tracking-wide uppercase transition-colors cursor-pointer shadow-xs"
        >
          <Download className="w-3 h-3 text-stone-950" />
          <span>Gestione Feed XML B2B</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 hover:text-stone-950 transition-colors cursor-pointer"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 ml-1 text-stone-700 hover:text-stone-950 transition-colors cursor-pointer"
              aria-label="Cerca"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex-1 lg:flex-none text-center lg:text-left">
            <button 
              onClick={() => {
                onNavigate('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-block text-left cursor-pointer group"
            >
              <span className="font-serif text-2xl sm:text-3xl tracking-widest uppercase font-semibold text-stone-900 group-hover:text-amber-900 transition-colors block">
                Atelier Moda
              </span>
              <span className="text-[10px] tracking-[0.22em] text-stone-500 uppercase font-sans block mt-0.5">
                Matterhorn Moda • B2B & Retail Store
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-5">
            {/* Home Link */}
            <button
              onClick={() => onNavigate('home')}
              className={`text-sm tracking-wider uppercase font-semibold transition-colors cursor-pointer py-1 border-b-2 flex items-center gap-1.5 ${
                activePage === 'home'
                  ? 'border-stone-900 text-stone-900' 
                  : 'border-transparent text-stone-600 hover:text-stone-950'
              }`}
            >
              <Home className="w-4 h-4 text-stone-600" />
              <span>Home</span>
            </button>

            {/* Shop Page Link with All Categories */}
            <button
              onClick={() => onNavigate('shop', 'tutti')}
              className={`text-sm tracking-wider uppercase font-semibold transition-colors cursor-pointer py-1 border-b-2 flex items-center gap-1.5 ${
                activePage === 'shop' && currentCategory === 'tutti'
                  ? 'border-stone-900 text-stone-900' 
                  : 'border-transparent text-stone-600 hover:text-stone-950'
              }`}
            >
              <Store className="w-4 h-4 text-stone-600" />
              <span>Shop (Tutte le Categorie)</span>
            </button>

            {/* Direct category quick filters in shop */}
            <button
              onClick={() => onNavigate('shop', 'donna')}
              className={`text-sm tracking-wider uppercase font-medium transition-colors cursor-pointer py-1 border-b-2 ${
                activePage === 'shop' && currentCategory === 'donna'
                  ? 'border-stone-900 text-stone-900' 
                  : 'border-transparent text-stone-600 hover:text-stone-950'
              }`}
            >
              Donna
            </button>
            <button
              onClick={() => onNavigate('shop', 'intimo')}
              className={`text-sm tracking-wider uppercase font-medium transition-colors cursor-pointer py-1 border-b-2 ${
                activePage === 'shop' && currentCategory === 'intimo'
                  ? 'border-stone-900 text-stone-900' 
                  : 'border-transparent text-stone-600 hover:text-stone-950'
              }`}
            >
              Intimo
            </button>
            <button
              onClick={() => onNavigate('shop', 'uomo')}
              className={`text-sm tracking-wider uppercase font-medium transition-colors cursor-pointer py-1 border-b-2 ${
                activePage === 'shop' && currentCategory === 'uomo'
                  ? 'border-stone-900 text-stone-900' 
                  : 'border-transparent text-stone-600 hover:text-stone-950'
              }`}
            >
              Uomo
            </button>
            <button
              onClick={() => onNavigate('shop', 'accessori')}
              className={`text-sm tracking-wider uppercase font-medium transition-colors cursor-pointer py-1 border-b-2 ${
                activePage === 'shop' && currentCategory === 'accessori'
                  ? 'border-stone-900 text-stone-900' 
                  : 'border-transparent text-stone-600 hover:text-stone-950'
              }`}
            >
              Accessori
            </button>

            {/* Special Action: Virtual Stylist */}
            <button
              onClick={onOpenOutfitBuilder}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium tracking-wide uppercase bg-amber-50 text-amber-900 border border-amber-200/80 hover:bg-amber-100 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Crea Outfit</span>
            </button>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-2.5 sm:space-x-4">
            {/* Search Input on Desktop */}
            <div className="hidden lg:relative lg:block">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Cerca prodotti o marchi..."
                  className="w-44 xl:w-52 pl-9 pr-4 py-1.5 text-xs rounded-full border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-400 focus:border-stone-400 transition-all"
                />
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
                {searchQuery && (
                  <button 
                    onClick={() => onSearchChange('')}
                    className="absolute right-2.5 top-2 text-stone-400 hover:text-stone-600 text-xs"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* Import XML Button */}
            <button
              onClick={onOpenImporter}
              className="p-2 text-stone-700 hover:text-amber-900 transition-colors hidden sm:flex items-center gap-1.5 text-xs font-semibold cursor-pointer rounded-lg hover:bg-amber-50"
              title="Pannello Gestione Importazione XML"
            >
              <Download className="w-4 h-4 text-amber-800" />
              <span className="hidden xl:inline">Import B2B</span>
            </button>

            {/* Compare Products Button */}
            <button
              onClick={onOpenCompare}
              className="p-2 text-stone-700 hover:text-stone-950 transition-colors relative cursor-pointer"
              title="Confronta prodotti selezionati"
              aria-label="Confronto prodotti"
            >
              <Scale className="w-5 h-5 text-stone-700" />
              {compareCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-stone-900 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in">
                  {compareCount}
                </span>
              )}
            </button>

            {/* Boutique Location Info */}
            <button
              onClick={onOpenBoutiqueInfo}
              className="p-2 text-stone-700 hover:text-stone-950 transition-colors hidden sm:flex items-center gap-1 text-xs font-medium cursor-pointer"
              title="Informazioni e Negozi fisici"
            >
              <MapPin className="w-4 h-4 text-stone-600" />
              <span className="hidden xl:inline">Boutique</span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="p-2 text-stone-700 hover:text-stone-950 transition-colors relative cursor-pointer"
              aria-label="Preferiti"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-amber-800 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 bg-stone-900 text-white px-3.5 py-2 rounded-full hover:bg-stone-800 transition-colors cursor-pointer shadow-sm group"
              aria-label="Carrello"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium tracking-wider uppercase hidden sm:inline">
                Carrello
              </span>
            </button>
          </div>

        </div>

        {/* Mobile Search Bar Collapsible */}
        {isSearchOpen && (
          <div className="py-3 px-2 border-t border-stone-100 lg:hidden animate-in fade-in">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Cerca prodotti o marchi..."
                className="w-full pl-9 pr-8 py-2 text-sm rounded-lg border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-400"
                autoFocus
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600 text-sm"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-6 py-6 space-y-4 shadow-xl">
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
              }}
              className={`text-left text-base font-semibold py-2 border-b border-stone-100 flex items-center gap-2 ${
                activePage === 'home' ? 'text-amber-900' : 'text-stone-800'
              }`}
            >
              <Home className="w-4 h-4 text-stone-600" />
              <span>Home (Categorie & Vetrina)</span>
            </button>

            <button
              onClick={() => {
                onNavigate('shop', 'tutti');
                setMobileMenuOpen(false);
              }}
              className={`text-left text-base font-semibold py-2 border-b border-stone-100 flex items-center gap-2 ${
                activePage === 'shop' && currentCategory === 'tutti' ? 'text-amber-900' : 'text-stone-800'
              }`}
            >
              <Store className="w-4 h-4 text-stone-600" />
              <span>Shop Completo (Categorie Divise)</span>
            </button>

            <button
              onClick={() => {
                onNavigate('shop', 'donna');
                setMobileMenuOpen(false);
              }}
              className="text-left text-sm py-1.5 text-stone-700 pl-6"
            >
              👗 Abbigliamento Donna
            </button>

            <button
              onClick={() => {
                onNavigate('shop', 'intimo');
                setMobileMenuOpen(false);
              }}
              className="text-left text-sm py-1.5 text-stone-700 pl-6"
            >
              👙 Intimo & Lingerie
            </button>

            <button
              onClick={() => {
                onNavigate('shop', 'uomo');
                setMobileMenuOpen(false);
              }}
              className="text-left text-sm py-1.5 text-stone-700 pl-6"
            >
              👔 Moda Uomo
            </button>

            <button
              onClick={() => {
                onNavigate('shop', 'accessori');
                setMobileMenuOpen(false);
              }}
              className="text-left text-sm py-1.5 text-stone-700 pl-6"
            >
              👜 Borse & Accessori
            </button>
          </div>

          <div className="pt-2 space-y-2">
            <button
              onClick={() => {
                onOpenImporter();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-800 text-white font-medium text-sm shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Pannello Importazione Feed XML</span>
            </button>

            <button
              onClick={() => {
                onOpenCompare();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-stone-100 text-stone-800 font-medium text-sm"
            >
              <Scale className="w-4 h-4 text-stone-700" />
              <span>Confronta Capi ({compareCount})</span>
            </button>

            <button
              onClick={() => {
                onOpenOutfitBuilder();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-50 text-amber-900 font-medium text-sm border border-amber-200"
            >
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>Crea il tuo Outfit (Virtual Stylist)</span>
            </button>

            <button
              onClick={() => {
                onOpenBoutiqueInfo();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-stone-100 text-stone-800 font-medium text-sm"
            >
              <Scissors className="w-4 h-4 text-stone-600" />
              <span>Servizi di Sartoria & Negozi Fisici</span>
            </button>
          </div>

          <div className="pt-4 border-t border-stone-100 flex justify-between text-xs text-stone-500">
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> Milano: Via Montenapoleone 18
            </div>
            <div className="flex items-center gap-1">
              <PhoneCall className="w-3.5 h-3.5" /> +39 02 8901 4455
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
