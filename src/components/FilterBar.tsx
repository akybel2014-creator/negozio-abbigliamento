import React from 'react';
import { X, ArrowUpDown, Tag } from 'lucide-react';
import { FilterState, ProductSize } from '../types';
import { SUBCATEGORIES_BY_CATEGORY } from '../data/products';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalResults: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults
}) => {
  const SIZES: ProductSize[] = ['XS', 'S', 'M', 'L', 'XL', '38', '40', '42', '44', '46', 'Unica'];
  const availableSubcategories = filters.category !== 'tutti' && filters.category !== 'saldi'
    ? SUBCATEGORIES_BY_CATEGORY[filters.category] || []
    : [];

  const hasActiveFilters = 
    filters.subcategory !== null || 
    filters.selectedSize !== null || 
    filters.maxPrice < 600 || 
    filters.onSaleOnly || 
    Boolean(filters.search);

  return (
    <div className="bg-white border-y border-stone-200 py-4 px-4 sm:px-6 lg:px-8 mb-8 sticky top-20 z-30 shadow-xs backdrop-blur-md bg-white/95">
      <div className="max-w-7xl mx-auto space-y-3">
        {/* Top Filter Row: Subcategories + Results Count + Sorter */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Subcategory Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <button
              onClick={() => onFilterChange({ subcategory: null })}
              className={`px-3 py-1.5 rounded-full text-xs font-medium tracking-wide uppercase transition-all shrink-0 cursor-pointer ${
                filters.subcategory === null
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              Tutti
            </button>

            {availableSubcategories.map((sub) => (
              <button
                key={sub}
                onClick={() => onFilterChange({ subcategory: filters.subcategory === sub ? null : sub })}
                className={`px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all shrink-0 cursor-pointer ${
                  filters.subcategory === sub
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {sub}
              </button>
            ))}

            {/* Quick On Sale Filter */}
            <button
              onClick={() => onFilterChange({ onSaleOnly: !filters.onSaleOnly })}
              className={`px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all shrink-0 cursor-pointer flex items-center gap-1 ${
                filters.onSaleOnly
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100'
              }`}
            >
              <Tag className="w-3 h-3" />
              <span>In Saldo</span>
            </button>
          </div>

          {/* Right Controls: Sort & Active Count */}
          <div className="flex items-center justify-between md:justify-end gap-4 shrink-0">
            <span className="text-xs text-stone-500">
              <strong className="text-stone-900">{totalResults}</strong> capi disponibili
            </span>

            {/* Sort Selector */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
              <select
                value={filters.sortBy}
                onChange={(e) => onFilterChange({ sortBy: e.target.value as FilterState['sortBy'] })}
                className="text-xs bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5 text-stone-700 focus:outline-none focus:ring-1 focus:ring-stone-400 cursor-pointer"
              >
                <option value="featured">Consigliati / In Evidenza</option>
                <option value="price-asc">Prezzo: dal più basso</option>
                <option value="price-desc">Prezzo: dal più alto</option>
                <option value="rating">Valutazione Clienti</option>
                <option value="newest">Novità di Stagione</option>
              </select>
            </div>
          </div>
        </div>

        {/* Extended Filter Bar: Price Slider & Size Chips */}
        <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4 text-xs">
          {/* Sizes */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-stone-500 font-medium">Taglia:</span>
            {SIZES.map((size) => (
              <button
                key={size}
                onClick={() => onFilterChange({ selectedSize: filters.selectedSize === size ? null : size })}
                className={`w-7 h-7 rounded-md font-medium text-[11px] transition-all cursor-pointer ${
                  filters.selectedSize === size
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Price Range */}
          <div className="flex items-center gap-3">
            <span className="text-stone-500 font-medium">Prezzo max:</span>
            <input
              type="range"
              min="80"
              max="600"
              step="20"
              value={filters.maxPrice}
              onChange={(e) => onFilterChange({ maxPrice: Number(e.target.value) })}
              className="accent-stone-900 cursor-pointer w-28 sm:w-36"
            />
            <span className="font-semibold text-stone-900 min-w-14">
              {filters.maxPrice} €
            </span>

            {/* Clear filters trigger */}
            {hasActiveFilters && (
              <button
                onClick={onResetFilters}
                className="flex items-center gap-1 text-[11px] text-amber-900 hover:text-amber-950 font-medium ml-2 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reimposta</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
