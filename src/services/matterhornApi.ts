import { Product } from '../types';

export interface CategoryData {
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

export const matterhornApi = {
  async getProducts(params?: { category?: string; brand?: string; search?: string }): Promise<Product[]> {
    const query = new URLSearchParams();
    if (params?.category && params.category !== 'tutti') query.append('category', params.category);
    if (params?.brand) query.append('brand', params.brand);
    if (params?.search) query.append('search', params.search);

    const res = await fetch(`/api/matterhorn/products?${query.toString()}`);
    if (!res.ok) throw new Error('Errore nel recupero prodotti dal server');
    const data = await res.json();
    return data.products || [];
  },

  async getCategories(): Promise<CategoryData[]> {
    const res = await fetch('/api/matterhorn/categories');
    if (!res.ok) throw new Error('Errore nel recupero categorie');
    const data = await res.json();
    return data.categories || [];
  },

  async getStats(): Promise<CatalogStats> {
    const res = await fetch('/api/matterhorn/stats');
    if (!res.ok) throw new Error('Errore nel recupero statistiche');
    const data = await res.json();
    return data.stats;
  },

  async checkDuplicates(options: {
    url?: string;
    categoryId?: string;
    limit?: number;
    markupPercent?: number;
  }): Promise<{
    success: boolean;
    totalFeedCount: number;
    duplicatesCount: number;
    newCount: number;
    duplicateDetails: Array<{ id: string; name: string; reason: string }>;
    duplicateSample: string[];
    newSample: Array<{ id: string; name: string; brand: string; price: number; category: string }>;
  }> {
    const res = await fetch('/api/matterhorn/check-duplicates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(options)
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Errore nel controllo duplicati');
    }
    return data;
  },

  async importFeed(options: {
    url?: string;
    categoryId?: string;
    limit?: number;
    markupPercent?: number;
    mode?: 'append' | 'replace';
  }): Promise<{ 
    success: boolean;
    importedCount: number; 
    duplicatesSkipped: number;
    totalCatalogCount: number; 
    duplicateSample?: string[];
    duplicateDetails?: Array<{ id: string; name: string; reason: string }>;
    message: string;
    products: Product[];
    allProducts?: Product[];
  }> {
    const res = await fetch('/api/matterhorn/import', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(options)
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Impossibile completare l\'importazione XML');
    }
    return data;
  },

  async deleteProduct(id: string): Promise<boolean> {
    const res = await fetch(`/api/matterhorn/products/${encodeURIComponent(id)}`, {
      method: 'DELETE'
    });
    const data = await res.json();
    return data.success;
  },

  async resetCatalog(): Promise<Product[]> {
    const res = await fetch('/api/matterhorn/reset', {
      method: 'POST'
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error('Errore durante il ripristino');
    return data.products;
  }
};
