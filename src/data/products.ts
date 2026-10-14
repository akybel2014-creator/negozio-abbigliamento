import { Product } from '../types';
import { MATTERHORN_PRODUCTS } from './matterhornProducts';

// Only authentic products imported from Matterhorn Moda XML feed
export const INITIAL_PRODUCTS: Product[] = MATTERHORN_PRODUCTS;

export const CATEGORIES = [
  { id: 'tutti', label: 'Tutti i Capi', matterhornId: 'all' },
  { id: 'donna', label: 'Abbigliamento Donna', matterhornId: '60' },
  { id: 'intimo', label: 'Intimo & Lingerie', matterhornId: '62' },
  { id: 'uomo', label: 'Moda Uomo', matterhornId: '223' },
  { id: 'accessori', label: 'Borse & Accessori', matterhornId: '171' },
  { id: 'scarpe', label: 'Calzature', matterhornId: '170' },
  { id: 'costumi', label: 'Costumi da Bagno', matterhornId: '30' },
  { id: 'saldi', label: 'Saldi & Offerte', matterhornId: '' }
];

export const SUBCATEGORIES_BY_CATEGORY: Record<string, string[]> = {
  donna: ['Completi', 'Pantaloni, pantaloncini da donna', 'Vestiti da giorno', 'Gonne', 'Abiti eleganti'],
  intimo: ['Reggiseni', 'Push Up', 'Soft, Semi-Soft', 'Culotte', 'Perizoma', 'Body & Lingerie', 'Pigiami'],
  uomo: ['Boxer', 'Slip', 'Pigiami Uomo', 'Maglieria Uomo'],
  accessori: ['Borse', 'Sciarpe & Scialli', 'Balaklava', 'Cappelli'],
  scarpe: ['Décolleté', 'Sandali', 'Stivali'],
  costumi: ['Bikini', 'Costumi Interi', 'Moda Mare']
};

export const PROMO_CODES: Record<string, { discountPercent: number; description: string }> = {
  'BENVENUTO10': { discountPercent: 10, description: 'Sconto di benvenuto del 10%' },
  'MODA20': { discountPercent: 20, description: 'Sconto esclusivo Boutique del 20%' },
  'MATTERHORN15': { discountPercent: 15, description: 'Sconto speciale B2B del 15%' }
};
