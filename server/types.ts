export type ProductCategory = 'donna' | 'uomo' | 'accessori' | 'intimo' | 'scarpe' | 'costumi';

export interface ProductColor {
  name: string;
  hex: string;
}

export type OutfitSlot = 'top' | 'bottom' | 'shoes' | 'accessory';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: string; // 'donna' | 'uomo' | 'accessori' | 'intimo' | 'scarpe' | 'costumi'
  categoryName?: string;
  subcategory: string;
  price: number;
  originalPrice?: number;
  wholesalePrice?: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  isSale?: boolean;
  rating: number;
  reviewCount: number;
  description: string;
  details: string[];
  composition: string;
  careInstructions: string;
  madeIn: string;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  stock: number;
  outfitSlot: OutfitSlot;
  brand?: string;
  importedFrom?: string;
  importedAt?: string;
}

export interface ImportOptions {
  url?: string;
  categoryId?: string;
  limit?: number;
  markupPercent?: number;
  mode?: 'append' | 'replace';
}

export interface CategoryInfo {
  id: string;
  name: string;
  matterhornId?: string;
  count: number;
  image: string;
  description: string;
}

export interface CatalogStats {
  totalProducts: number;
  totalBrands: number;
  categoriesCount: Record<string, number>;
  lastUpdated: string;
}
