import https from 'https';
import { Product, ProductColor, OutfitSlot } from '../types';

const COLOR_MAP: Record<string, string> = {
  'nero': '#18181b',
  'bianco': '#fdfbf7',
  'rosa': '#f472b6',
  'rosso': '#dc2626',
  'blu': '#1e40af',
  'granata': '#831843',
  'marrone': '#78350f',
  'beige': '#d2b48c',
  'verde': '#15803d',
  'grigio': '#6b7280',
  'giallo': '#eab308',
  'viola': '#7e22ce',
  'ecru': '#fef3c7',
  'cammello': '#b45309',
  'fucsia': '#d946ef'
};

function getColorHex(colorName?: string): string {
  if (!colorName) return '#27272a';
  const clean = colorName.toLowerCase().trim();
  for (const [key, hex] of Object.entries(COLOR_MAP)) {
    if (clean.includes(key)) return hex;
  }
  return '#3b3b3b';
}

export function fetchXmlStream(url: string, limit: number = 300): Promise<string> {
  return new Promise((resolve, reject) => {
    let targetUrl = url;
    // Auto-normalize type=xml to type=products_xml for Matterhorn Moda
    if (targetUrl.includes('matterhorn') && targetUrl.includes('type=xml') && !targetUrl.includes('type=products_xml')) {
      targetUrl = targetUrl.replace('type=xml', 'type=products_xml');
    }

    const req = https.get(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'application/xml, text/xml, */*'
      }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
        if (limit && limit > 0) {
          const matches = data.match(/<\/product>/g);
          if (matches && matches.length >= limit) {
            res.destroy();
            resolve(data);
          }
        }
      });
      res.on('end', () => resolve(data));
    });

    req.on('error', (err) => reject(err));
    req.setTimeout(35000, () => {
      req.destroy();
      resolve('');
    });
  });
}

export function parseMatterhornXml(xmlText: string, markupMultiplier: number = 1.6, limit: number = 300): Product[] {
  const products: Product[] = [];
  const productBlocks = xmlText.split('<product ').slice(1);

  for (const block of productBlocks) {
    if (limit && limit > 0 && products.length >= limit) break;
    try {
      const idMatch = block.match(/id="([^"]+)"/);
      const nameMatch = block.match(/<name><!\[CDATA\[(.*?)\]\]><\/name>/);
      const brandMatch = block.match(/<brand><!\[CDATA\[(.*?)\]\]><\/brand>/);
      const categoryPathMatch = block.match(/<category_path><!\[CDATA\[(.*?)\]\]><\/category_path>/);
      const categoryMatch = block.match(/<category[^>]*><!\[CDATA\[(.*?)\]\]><\/category>/);
      const colorMatch = block.match(/<color><!\[CDATA\[(.*?)\]\]><\/color>/);
      const typeMatch = block.match(/<type><!\[CDATA\[(.*?)\]\]><\/type>/);
      const priceMatch = block.match(/<price><!\[CDATA\[(.*?)\]\]><\/price>/);
      const descMatch = block.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/);

      const images = [...block.matchAll(/<image_url>(.*?)<\/image_url>/g)].map(m => m[1]);
      if (!images || images.length === 0) continue;

      const rawOptions = [...block.matchAll(/<option_name><!\[CDATA\[(.*?)\]\]><\/option_name>/g)].map(m => m[1].trim());

      const rawId = idMatch ? idMatch[1] : Math.random().toString(36).slice(2, 8);
      const id = 'mh-' + rawId;
      const rawName = nameMatch ? nameMatch[1].trim() : 'Capo Moda';
      const brand = brandMatch ? brandMatch[1].trim() : 'Matterhorn Moda';
      const catPath = categoryPathMatch ? categoryPathMatch[1].trim() : '';
      const rawPrice = priceMatch ? parseFloat(priceMatch[1]) : 30;
      const wholesalePrice = isNaN(rawPrice) ? 30 : rawPrice;
      const price = Math.round(wholesalePrice * markupMultiplier);
      const originalPrice = Math.round(price * 1.25);

      const rawDesc = descMatch ? descMatch[1] : '';
      let composition = 'Tessuto Conforme Standard Europei';
      const compMatch = rawDesc.match(/<strong>([^<]+)<\/strong>\s*(\d+\s*%)/g);
      if (compMatch && compMatch.length > 0) {
        composition = compMatch.map(s => s.replace(/<[^>]+>/g, '').trim()).join(', ');
      }

      let textDesc = rawDesc
        .replace(/<table[\s\S]*?<\/table>/gi, '')
        .replace(/<div class=['"]prod_data['"][\s\S]*?<\/div>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      if (!textDesc || textDesc.length < 20) {
        textDesc = `${rawName} della linea ufficiale ${brand}. Design elegante e confortevole confezionato con materiali europei selezionati.`;
      }

      // Map to divided categories: donna, intimo, uomo, accessori, scarpe, costumi
      let category = 'donna';
      let categoryName = 'Abbigliamento Donna';
      let outfitSlot: OutfitSlot = 'top';
      const lower = (catPath + ' ' + rawName + ' ' + (categoryMatch ? categoryMatch[1] : '')).toLowerCase();

      // IMPORTANT: Prioritize Men's / PER LUI / Uomo detection first so men's boxer/slip/costume don't end up in women's intimo or bikini
      if (
        lower.includes('/per lui') || 
        lower.includes('per lui') || 
        lower.includes('intimo da uomo') || 
        lower.includes('uomo') || 
        lower.includes('men') ||
        catPath.toLowerCase().includes('per lui') ||
        catPath.toLowerCase().includes('uomo')
      ) {
        category = 'uomo';
        categoryName = 'Moda Uomo';
        outfitSlot = (lower.includes('boxer') || lower.includes('slip') || lower.includes('pantal')) ? 'bottom' : 'top';
      } else if (lower.includes('scarpe') || lower.includes('sandali') || lower.includes('calzatur') || lower.includes('stival')) {
        category = 'scarpe';
        categoryName = 'Calzature';
        outfitSlot = 'shoes';
      } else if (lower.includes('accessori') || lower.includes('borsa') || lower.includes('cintur') || lower.includes('sciarpa') || lower.includes('cappello') || lower.includes('balaklava')) {
        category = 'accessori';
        categoryName = 'Borse & Accessori';
        outfitSlot = 'accessory';
      } else if (lower.includes('costum') || lower.includes('bikini') || lower.includes('mare')) {
        category = 'costumi';
        categoryName = 'Costumi da Bagno';
        outfitSlot = 'top';
      } else if (lower.includes('intimo') || lower.includes('reggisen') || lower.includes('culotte') || lower.includes('perizom') || lower.includes('body') || lower.includes('lingerie') || lower.includes('notte') || lower.includes('pigiama')) {
        category = 'intimo';
        categoryName = 'Intimo & Lingerie';
        outfitSlot = lower.includes('culotte') || lower.includes('perizom') || lower.includes('slip') ? 'bottom' : 'top';
      } else {
        category = 'donna';
        categoryName = 'Abbigliamento Donna';
        outfitSlot = lower.includes('pantal') || lower.includes('gonna') || lower.includes('pantaloncini') ? 'bottom' : 'top';
      }

      const colorName = colorMatch ? colorMatch[1].trim() : 'Tinta Unita';
      const hex = getColorHex(colorName);
      const sizes = rawOptions.length > 0 ? rawOptions.slice(0, 8) : ['S', 'M', 'L'];

      products.push({
        id,
        name: rawName,
        subtitle: `${typeMatch ? typeMatch[1].trim() : 'Moda'} • Brand ${brand}`,
        category,
        categoryName,
        subcategory: categoryMatch ? categoryMatch[1].trim() : categoryName,
        price,
        originalPrice,
        wholesalePrice,
        isNew: true,
        isBestSeller: Math.random() > 0.65,
        isSale: true,
        rating: +(4.6 + Math.random() * 0.4).toFixed(1),
        reviewCount: Math.floor(10 + Math.random() * 30),
        description: textDesc,
        details: [
          `Brand: ${brand}`,
          `Categoria fornitore: ${catPath}`,
          `Codice articolo: ${rawId}`,
          `Fornitore: Matterhorn Moda B2B`,
          `Spedizione rapida da magazzino centrale europeo`
        ],
        composition,
        careInstructions: 'Lavaggio a 30°C programma delicato, stirare a bassa temperatura',
        madeIn: `Unione Europea (${brand})`,
        images,
        colors: [{ name: colorName, hex }],
        sizes,
        stock: Math.floor(3 + Math.random() * 10),
        outfitSlot,
        brand,
        importedFrom: 'https://matterhorn-moda.it/xmldata/products_full.php?type=xml',
        importedAt: new Date().toISOString()
      });
    } catch {
      // skip malformed entries
    }
  }

  return products;
}
