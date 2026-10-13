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
  Scissors
} from 'lucide-react';
import { ProductCategory } from '../types';

interface HeaderProps {
  currentCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenOutfitBuilder: () => void;
  onOpenBoutiqueInfo: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCategory,
  onSelectCategory,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
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
      <div className="bg-stone-900 text-stone-200 text-xs py-2 px-4 text-center tracking-wider font-light flex items-center justify-center gap-4">
        <span>✨ Spedizione express omaggio sopra i 100€ in tutta Italia</span>
        <span className="hidden sm:inline text-stone-500">•</span>
        <span className="hidden sm:inline">Servizio Sartoria & Su Misura attivo a Milano & Roma</span>
        <span className="hidden md:inline text-stone-500">•</span>
        <button 
          onClick={onOpenBoutiqueInfo}
          className="hidden md:inline underline hover:text-white transition-colors cursor-pointer"
        >
          Visita la Boutique
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 hover:text-stone-950 transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 ml-1 text-stone-700 hover:text-stone-950 transition-colors"
              aria-label="Cerca"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex-1 lg:flex-none text-center lg:text-left">
            <button 
              onClick={() => {
                onSelectCategory('tutti');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-block text-left cursor-pointer group"
            >
              <span className="font-serif text-2xl sm:text-3xl tracking-widest uppercase font-semibold text-stone-900 group-hover:text-amber-900 transition-colors block">
                Atelier Sartoria
              </span>
              <span className="text-[10px] tracking-[0.25em] text-stone-500 uppercase font-sans block mt-0.5">
                Negozio di Abbigliamento • Milano
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7">
            <button
              onClick={() => onSelectCategory('tutti')}
              className={`text-sm tracking-wider uppercase font-medium transition-colors cursor-pointer py-1 border-b-2 ${
                currentCategory === 'tutti' 
                  ? 'border-stone-900 text-stone-900' 
                  : 'border-transparent text-stone-600 hover:text-stone-950'
              }`}
            >
              Tutte le Collezioni
            </button>
            <button
              onClick={() => onSelectCategory('donna')}
              className={`text-sm tracking-wider uppercase font-medium transition-colors cursor-pointer py-1 border-b-2 ${
                currentCategory === 'donna' 
                  ? 'border-stone-900 text-stone-900' 
                  : 'border-transparent text-stone-600 hover:text-stone-950'
              }`}
            >
              Donna
            </button>
            <button
              onClick={() => onSelectCategory('uomo')}
              className={`text-sm tracking-wider uppercase font-medium transition-colors cursor-pointer py-1 border-b-2 ${
                currentCategory === 'uomo' 
                  ? 'border-stone-900 text-stone-900' 
                  : 'border-transparent text-stone-600 hover:text-stone-950'
              }`}
            >
              Uomo
            </button>
            <button
              onClick={() => onSelectCategory('accessori')}
              className={`text-sm tracking-wider uppercase font-medium transition-colors cursor-pointer py-1 border-b-2 ${
                currentCategory === 'accessori' 
                  ? 'border-stone-900 text-stone-900' 
                  : 'border-transparent text-stone-600 hover:text-stone-950'
              }`}
            >
              Accessori
            </button>
            <button
              onClick={() => onSelectCategory('saldi')}
              className={`text-sm tracking-wider uppercase font-medium transition-colors cursor-pointer py-1 border-b-2 ${
                currentCategory === 'saldi' 
                  ? 'border-amber-800 text-amber-800' 
                  : 'border-transparent text-amber-800/80 hover:text-amber-900'
              }`}
            >
              Saldi
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
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Search Input on Desktop */}
            <div className="hidden lg:relative lg:block">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Cerca abiti, tessuti, cappotti..."
                  className="w-56 pl-9 pr-4 py-1.5 text-xs rounded-full border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-400 focus:border-stone-400 transition-all"
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
                placeholder="Cerca capi di abbigliamento, tessuti, accessori..."
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
                onSelectCategory('tutti');
                setMobileMenuOpen(false);
              }}
              className={`text-left text-base font-medium py-2 border-b border-stone-100 ${
                currentCategory === 'tutti' ? 'text-amber-900 font-semibold' : 'text-stone-800'
              }`}
            >
              Tutte le Collezioni
            </button>
            <button
              onClick={() => {
                onSelectCategory('donna');
                setMobileMenuOpen(false);
              }}
              className={`text-left text-base font-medium py-2 border-b border-stone-100 ${
                currentCategory === 'donna' ? 'text-amber-900 font-semibold' : 'text-stone-800'
              }`}
            >
              Collezione Donna
            </button>
            <button
              onClick={() => {
                onSelectCategory('uomo');
                setMobileMenuOpen(false);
              }}
              className={`text-left text-base font-medium py-2 border-b border-stone-100 ${
                currentCategory === 'uomo' ? 'text-amber-900 font-semibold' : 'text-stone-800'
              }`}
            >
              Collezione Uomo
            </button>
            <button
              onClick={() => {
                onSelectCategory('accessori');
                setMobileMenuOpen(false);
              }}
              className={`text-left text-base font-medium py-2 border-b border-stone-100 ${
                currentCategory === 'accessori' ? 'text-amber-900 font-semibold' : 'text-stone-800'
              }`}
            >
              Pelletteria & Accessori
            </button>
            <button
              onClick={() => {
                onSelectCategory('saldi');
                setMobileMenuOpen(false);
              }}
              className={`text-left text-base font-medium py-2 border-b border-stone-100 ${
                currentCategory === 'saldi' ? 'text-amber-900 font-semibold' : 'text-amber-800'
              }`}
            >
              Saldi Stagionali
            </button>
          </div>

          <div className="pt-2 space-y-2">
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
