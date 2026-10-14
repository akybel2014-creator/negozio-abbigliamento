import { Router, Request, Response } from 'express';
import { productsStore } from '../data/productsStore';
import { fetchXmlStream, parseMatterhornXml } from '../services/xmlFeedService';

export const matterhornRouter = Router();

// GET all products with optional filters
matterhornRouter.get('/products', (req: Request, res: Response) => {
  try {
    const { category, brand, search } = req.query;
    const products = productsStore.getAll(
      category as string | undefined,
      brand as string | undefined,
      search as string | undefined
    );
    res.json({
      success: true,
      count: products.length,
      products
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Errore nel recupero prodotti' });
  }
});

// GET categories with counts and metadata
matterhornRouter.get('/categories', (_req: Request, res: Response) => {
  try {
    const categories = productsStore.getCategories();
    res.json({
      success: true,
      categories
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Errore nel recupero categorie' });
  }
});

// GET stats
matterhornRouter.get('/stats', (_req: Request, res: Response) => {
  try {
    const stats = productsStore.getStats();
    res.json({
      success: true,
      stats
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST live XML duplicate check preview without saving
matterhornRouter.post('/check-duplicates', async (req: Request, res: Response) => {
  try {
    const { 
      url = 'https://matterhorn-moda.it/xmldata/products_full.php?type=products_xml', 
      categoryId,
      limit = 300,
      markupPercent = 60
    } = req.body;

    let targetUrl = url;
    if (categoryId && categoryId !== 'all' && !targetUrl.includes('category_id=')) {
      targetUrl += (targetUrl.includes('?') ? '&' : '?') + `category_id=${categoryId}`;
    }

    const multiplier = 1 + (Number(markupPercent) / 100);
    const xml = await fetchXmlStream(targetUrl, Number(limit));

    if (!xml || !xml.includes('<product')) {
      return res.status(400).json({ 
        success: false,
        error: 'Nessun prodotto trovato o feed non raggiungibile.' 
      });
    }

    const parsedProducts = parseMatterhornXml(xml, multiplier, Number(limit));
    const check = productsStore.checkDuplicates(parsedProducts);

    res.json({
      success: true,
      totalFeedCount: parsedProducts.length,
      duplicatesCount: check.duplicatesCount,
      newCount: check.newCount,
      duplicateDetails: check.duplicateDetails,
      duplicateSample: check.duplicateDetails.slice(0, 15).map(d => `${d.name} (${d.reason})`),
      newSample: check.newProducts.slice(0, 10).map(p => ({ id: p.id, name: p.name, brand: p.brand, price: p.price, category: p.category }))
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || 'Errore nel controllo duplicati' });
  }
});

// POST live XML import from Matterhorn
matterhornRouter.post('/import', async (req: Request, res: Response) => {
  try {
    const { 
      url = 'https://matterhorn-moda.it/xmldata/products_full.php?type=products_xml', 
      categoryId,
      limit = 300,
      markupPercent = 60,
      mode = 'append'
    } = req.body;

    let targetUrl = url;
    if (categoryId && categoryId !== 'all' && !targetUrl.includes('category_id=')) {
      targetUrl += (targetUrl.includes('?') ? '&' : '?') + `category_id=${categoryId}`;
    }

    const multiplier = 1 + (Number(markupPercent) / 100);
    console.log(`[Matterhorn Route] Importing from ${targetUrl} (Limit: ${limit}, Markup: ${markupPercent}%, Mode: ${mode})`);

    const xml = await fetchXmlStream(targetUrl, Number(limit));

    if (!xml || !xml.includes('<product')) {
      return res.status(400).json({ 
        success: false,
        error: 'Nessun prodotto trovato o feed non raggiungibile. Verifica l\'URL fornito.' 
      });
    }

    const parsedProducts = parseMatterhornXml(xml, multiplier, Number(limit));

    if (parsedProducts.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Nessun prodotto valido estratto dal feed XML.'
      });
    }

    const batchResult = productsStore.addBatch(parsedProducts, mode as 'append' | 'replace');

    const message = batchResult.duplicatesSkipped > 0
      ? `Importati ${batchResult.addedCount} nuovi capi. ${batchResult.duplicatesSkipped} articoli doppi già presenti sono stati scartati.`
      : `Importati con successo ${batchResult.addedCount} articoli nel catalogo.`;

    res.json({
      success: true,
      importedCount: batchResult.addedCount,
      duplicatesSkipped: batchResult.duplicatesSkipped,
      totalCatalogCount: batchResult.totalCatalogCount,
      duplicateSample: batchResult.duplicateNames.slice(0, 15),
      duplicateDetails: batchResult.duplicateDetails.slice(0, 30),
      message,
      mode,
      sourceUrl: targetUrl,
      products: batchResult.addedProducts,
      allProducts: batchResult.allProducts
    });
  } catch (err: any) {
    console.error('[Matterhorn Route] Error importing XML:', err);
    res.status(500).json({ 
      success: false, 
      error: err.message || 'Errore durante l\'importazione del feed XML' 
    });
  }
});

// DELETE single product
matterhornRouter.delete('/products/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = productsStore.delete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Prodotto non trovato' });
    }
    res.json({ success: true, message: `Prodotto ${id} eliminato.` });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST reset to initial Matterhorn batch
matterhornRouter.post('/reset', (_req: Request, res: Response) => {
  try {
    const products = productsStore.reset();
    res.json({
      success: true,
      message: 'Catalogo reimpostato con i prodotti certificati Matterhorn Moda.',
      count: products.length,
      products
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});
