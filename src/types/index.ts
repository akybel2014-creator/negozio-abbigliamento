export type ProductCategory = 'tutti' | 'donna' | 'intimo' | 'uomo' | 'accessori' | 'scarpe' | 'costumi' | 'saldi';

export type ProductSize = 
  | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'
  | '36' | '37' | '38' | '39' | '40' | '41' | '42' | '43' | '44' | '45' | '46' | '48' | '50' | '52' | '54'
  | 'Unica';

export interface ProductColor {
  name: string;
  hex: string;
}

export type OutfitSlot = 'top' | 'bottom' | 'shoes' | 'accessory';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  categoryName?: string;
  subcategory: string;
  price: number;
  originalPrice?: number;
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
  sizes: (ProductSize | string)[];
  stock: number;
  outfitSlot: OutfitSlot;
  brand?: string;
  wholesalePrice?: number;
  importedFrom?: string;
  importedAt?: string;
  categoryPath?: string;
}

export interface CartItem {
  id: string;
  product: Product;
  selectedSize: ProductSize;
  selectedColor: ProductColor;
  quantity: number;
}

export interface FilterState {
  category: ProductCategory;
  subcategory: string | null;
  search: string;
  maxPrice: number;
  selectedSize: (ProductSize | string) | null;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'rating';
  onSaleOnly: boolean;
  material: string | null;
  selectedBrand: string | null;
}

export interface OrderDetails {
  orderNumber: string;
  fullName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  paymentMethod: string;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  items: CartItem[];
  date: string;
}
