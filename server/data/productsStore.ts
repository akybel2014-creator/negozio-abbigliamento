import fs from 'fs';
import path from 'path';
import { Product, CategoryInfo, CatalogStats } from '../types';
import { MATTERHORN_PRODUCTS } from '../../src/data/matterhornProducts';

const DATA_DIR = path.resolve('data');
const DATA_FILE = path.join(DATA_DIR, 'matterhorn_catalog.json');

// Ensure directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function extractModelKey(name: string): string | null {
  const match = name.toLowerCase().match(/model\s+(\d+)/);
  return match ? match[1] : null;
}

// Format raw products with clean category naming
function normalizeProducts(items: any[]): Product[] {
  return items.map(p => {
    let cat = p.category;
    let catName = p.categoryName;
    const lower = ((p.categoryPath || '') + ' ' + (p.subcategory || '') + ' ' + p.name).toLowerCase();

    // Prioritize UOMO / PER LUI so men's underwear/swimwear is kept separate from women's lingerie
    if (
      cat === 'uomo' ||
      lower.includes('/per lui') ||
      lower.includes('per lui') ||
      lower.includes('intimo da uomo') ||
      lower.includes('da uomo') ||
      lower.includes('uomo') ||
      lower.includes('men')
    ) {
      cat = 'uomo';
      catName = 'Moda Uomo';
    } else if (lower.includes('scarpe') || lower.includes('sandali') || lower.includes('stival')) {
      cat = 'scarpe';
      catName = 'Calzature';
    } else if (lower.includes('accessori') || lower.includes('borsa') || lower.includes('sciarpa') || lower.includes('cappello') || lower.includes('balaklava')) {
      cat = 'accessori';
      catName = 'Borse & Accessori';
    } else if (lower.includes('costumi') || lower.includes('bikini') || lower.includes('mare')) {
      cat = 'costumi';
      catName = 'Costumi da Bagno';
    } else if (lower.includes('reggisen') || lower.includes('intimo') || lower.includes('culotte') || lower.includes('perizom') || lower.includes('lingerie') || lower.includes('notte')) {
      cat = 'intimo';
      catName = 'Intimo & Lingerie';
    } else {
      cat = 'donna';
      catName = 'Abbigliamento Donna';
    }

    return {
      ...p,
      category: cat,
      categoryName: catName || (cat === 'donna' ? 'Abbigliamento Donna' : cat === 'intimo' ? 'Intimo & Lingerie' : cat === 'uomo' ? 'Moda Uomo' : cat === 'accessori' ? 'Borse & Accessori' : cat === 'scarpe' ? 'Calzature' : 'Costumi da Bagno')
    };
  });
}

class ProductsStore {
  private products: Product[] = [];

  constructor() {
    this.init();
  }

  private init() {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.products = normalizeProducts(parsed);
          console.log(`[ProductsStore] Loaded ${this.products.length} products from disk.`);
          return;
        }
      }
    } catch (err) {
      console.warn('[ProductsStore] Could not read file, seeding from Matterhorn bundle:', err);
    }

    // Initialize with verified authentic Matterhorn Moda products
    this.products = normalizeProducts(MATTERHORN_PRODUCTS);
    this.persist();
    console.log(`[ProductsStore] Initialized with ${this.products.length} Matterhorn products.`);
  }

  private persist() {
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(this.products, null, 2), 'utf-8');
    } catch (err) {
      console.error('[ProductsStore] Failed to persist products:', err);
    }
  }

  public getAll(filterCat?: string, filterBrand?: string, search?: string): Product[] {
    let result = [...this.products];

    if (filterCat && filterCat !== 'tutti') {
      result = result.filter(p => p.category === filterCat);
    }

    if (filterBrand) {
      result = result.filter(p => p.brand?.toLowerCase() === filterBrand.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        (p.brand && p.brand.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q)
      );
    }

    return result;
  }

  public getById(id: string): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  public checkDuplicates(items: Product[]): {
    duplicatesCount: number;
    newCount: number;
    duplicateDetails: Array<{ id: string; name: string; reason: string }>;
    newProducts: Product[];
  } {
    const normalized = normalizeProducts(items);
    const existingIds = new Set(this.products.map(p => p.id.toLowerCase().trim()));
    const existingRawIds = new Set(this.products.map(p => p.id.replace('mh-', '').toLowerCase().trim()));
    const existingNames = new Set(this.products.map(p => p.name.toLowerCase().trim()));
    const existingModels = new Set(
      this.products
        .map(p => extractModelKey(p.name))
        .filter((k): k is string => Boolean(k))
    );
    const existingImages = new Set(
      this.products
        .map(p => (p.images && p.images[0]) ? p.images[0].trim() : null)
        .filter((img): img is string => Boolean(img))
    );

    const duplicateDetails: Array<{ id: string; name: string; reason: string }> = [];
    const newProducts: Product[] = [];

    // Also track within batch to avoid duplicates in the same feed
    const seenBatchIds = new Set<string>();
    const seenBatchNames = new Set<string>();

    for (const item of normalized) {
      const cleanId = item.id.toLowerCase().trim();
      const rawId = item.id.replace('mh-', '').toLowerCase().trim();
      const cleanName = item.name.toLowerCase().trim();
      const modelKey = extractModelKey(item.name);
      const firstImage = (item.images && item.images[0]) ? item.images[0].trim() : null;

      let duplicateReason: string | null = null;

      if (existingIds.has(cleanId) || existingRawIds.has(rawId)) {
        duplicateReason = `ID prodotto già presente (${rawId})`;
      } else if (existingNames.has(cleanName)) {
        duplicateReason = `Nome articolo identico già a catalogo`;
      } else if (modelKey && existingModels.has(modelKey)) {
        duplicateReason = `Modello #${modelKey} già registrato`;
      } else if (firstImage && existingImages.has(firstImage)) {
        duplicateReason = `Immagine e capo identico già presente`;
      } else if (seenBatchIds.has(cleanId) || seenBatchNames.has(cleanName)) {
        duplicateReason = `Articolo doppio all'interno dello stesso feed`;
      }

      if (duplicateReason) {
        duplicateDetails.push({
          id: item.id,
          name: item.name,
          reason: duplicateReason
        });
      } else {
        seenBatchIds.add(cleanId);
        seenBatchNames.add(cleanName);
        newProducts.push(item);
      }
    }

    return {
      duplicatesCount: duplicateDetails.length,
      newCount: newProducts.length,
      duplicateDetails,
      newProducts
    };
  }

  public addBatch(newItems: Product[], mode: 'append' | 'replace' = 'append'): {
    addedCount: number;
    duplicatesSkipped: number;
    totalCatalogCount: number;
    addedProducts: Product[];
    duplicateNames: string[];
    duplicateDetails: Array<{ id: string; name: string; reason: string }>;
    allProducts: Product[];
  } {
    const normalized = normalizeProducts(newItems);
    
    if (mode === 'replace') {
      this.products = normalized;
      this.persist();
      return {
        addedCount: normalized.length,
        duplicatesSkipped: 0,
        totalCatalogCount: this.products.length,
        addedProducts: normalized,
        duplicateNames: [],
        duplicateDetails: [],
        allProducts: this.products
      };
    }

    const check = this.checkDuplicates(normalized);

    this.products = [...check.newProducts, ...this.products];
    this.persist();

    return {
      addedCount: check.newCount,
      duplicatesSkipped: check.duplicatesCount,
      totalCatalogCount: this.products.length,
      addedProducts: check.newProducts,
      duplicateNames: check.duplicateDetails.map(d => d.name),
      duplicateDetails: check.duplicateDetails,
      allProducts: this.products
    };
  }

  public delete(id: string): boolean {
    const initialLen = this.products.length;
    this.products = this.products.filter(p => p.id !== id);
    if (this.products.length !== initialLen) {
      this.persist();
      return true;
    }
    return false;
  }

  public reset(): Product[] {
    this.products = normalizeProducts(MATTERHORN_PRODUCTS);
    this.persist();
    return this.products;
  }

  public getCategories(): CategoryInfo[] {
    const CATEGORY_META: Record<string, { name: string; image: string; desc: string; matterhornId: string }> = {
      'donna': {
        name: 'Abbigliamento Donna',
        desc: 'Completi, pantaloni, vestiti da giorno e moda femminile',
        image: 'https://matterhorn-moda.it/pics_source/976954.jpg',
        matterhornId: '60'
      },
      'intimo': {
        name: 'Intimo & Lingerie',
        desc: 'Reggiseni push-up, pizzo floreale, body, culotte e completi seducenti',
        image: 'https://matterhorn-moda.it/pics_source/1135401.jpg',
        matterhornId: '62'
      },
      'uomo': {
        name: 'Moda Uomo',
        desc: 'Boxer anatomici, slip sartoriali e abbigliamento intimo maschile',
        image: 'https://matterhorn-moda.it/pics_source/1130664.jpg',
        matterhornId: '223'
      },
      'accessori': {
        name: 'Borse & Accessori',
        desc: 'Sciarpe, balaklava, berretti, borse e accessori di tendenza',
        image: 'https://matterhorn-moda.it/pics_source/1090400.jpg',
        matterhornId: '171'
      },
      'scarpe': {
        name: 'Calzature & Scarpe',
        desc: 'Décolleté, sandali, stivali e calzature fashion',
        image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80',
        matterhornId: '170'
      },
      'costumi': {
        name: 'Costumi da Bagno',
        desc: 'Bikini due pezzi, costumi interi e moda mare estiva',
        image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80',
        matterhornId: '30'
      }
    };

    const counts: Record<string, number> = {};
    for (const p of this.products) {
      counts[p.category] = (counts[p.category] || 0) + 1;
    }

    return Object.entries(CATEGORY_META).map(([id, meta]) => {
      // Find a real product image if available
      const sample = this.products.find(p => p.category === id && p.images && p.images[0]);
      return {
        id,
        name: meta.name,
        matterhornId: meta.matterhornId,
        count: counts[id] || 0,
        image: sample ? sample.images[0] : meta.image,
        description: meta.desc
      };
    });
  }

  public getStats(): CatalogStats {
    const brands = new Set<string>();
    const categoriesCount: Record<string, number> = {};

    for (const p of this.products) {
      if (p.brand) brands.add(p.brand);
      categoriesCount[p.category] = (categoriesCount[p.category] || 0) + 1;
    }

    return {
      totalProducts: this.products.length,
      totalBrands: brands.size,
      categoriesCount,
      lastUpdated: new Date().toISOString()
    };
  }
}

export const productsStore = new ProductsStore();
