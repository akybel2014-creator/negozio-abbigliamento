import https from 'https';
import fs from 'fs';

function fetchXml(catId, limit) {
  return new Promise((resolve) => {
    const url = "https://matterhorn-moda.it/xmldata/products_full.php?type=products_xml" + (catId ? "&category_id=" + catId : "");
    https.get(url, (res) => {
      let data = "";
      res.on("data", chunk => {
        data += chunk;
        const matches = data.match(/<\/product>/g);
        if (matches && matches.length >= limit) {
          res.destroy();
          resolve(data);
        }
      });
      res.on("end", () => resolve(data));
    }).on("error", () => resolve(""));
  });
}

const COLOR_MAP = {
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

function getColorHex(colorName) {
  if (!colorName) return '#27272a';
  const clean = colorName.toLowerCase().trim();
  for (const [key, hex] of Object.entries(COLOR_MAP)) {
    if (clean.includes(key)) return hex;
  }
  return '#3b3b3b';
}

export function parseProductsFromXml(xmlText, fallbackCat = 'donna', limit = 20) {
  const products = [];
  const productBlocks = xmlText.split("<product ").slice(1);
  
  for (const block of productBlocks) {
    if (products.length >= limit) break;
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

      const id = idMatch ? "mh-" + idMatch[1] : "mh-" + Math.random().toString(36).slice(2, 8);
      const rawName = nameMatch ? nameMatch[1].trim() : "Capo di Abbigliamento";
      const brand = brandMatch ? brandMatch[1].trim() : "Matterhorn";
      const catPath = categoryPathMatch ? categoryPathMatch[1].trim() : "";
      const rawPrice = priceMatch ? parseFloat(priceMatch[1]) : 35;
      const wholesalePrice = isNaN(rawPrice) ? 35 : rawPrice;
      
      // Calculate retail price with wholesale markup (approx +60%)
      const price = Math.round(wholesalePrice * 1.6);
      const originalPrice = Math.round(price * 1.25);

      const rawDesc = descMatch ? descMatch[1] : "";
      
      // Extract composition if present
      let composition = "Cotone & Fibre Nobili Certificate";
      const compMatch = rawDesc.match(/<strong>([^<]+)<\/strong>\s*(\d+\s*%)/g);
      if (compMatch && compMatch.length > 0) {
        composition = compMatch.map(s => s.replace(/<[^>]+>/g, "").trim()).join(", ");
      }

      // Clean description text
      let textDesc = rawDesc
        .replace(/<table[\s\S]*?<\/table>/gi, "")
        .replace(/<div class=['"]prod_data['"][\s\S]*?<\/div>/gi, "")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      if (!textDesc || textDesc.length < 20) {
        textDesc = `${rawName} realizzato con cura dal brand ${brand}. Design elegante e raffinato con vestibilità confortevole.`;
      }

      // Determine category: donna, uomo, accessori
      let category = fallbackCat;
      let outfitSlot = "top";
      const lowerPath = (catPath + " " + rawName).toLowerCase();
      if (lowerPath.includes("scarpe") || lowerPath.includes("calzatur") || lowerPath.includes("sandali")) {
        category = "donna";
        outfitSlot = "shoes";
      } else if (lowerPath.includes("accessori") || lowerPath.includes("borsa") || lowerPath.includes("cintur")) {
        category = "accessori";
        outfitSlot = "accessory";
      } else if (lowerPath.includes("men") || lowerPath.includes("uomo") || lowerPath.includes("per lui")) {
        category = "uomo";
        outfitSlot = lowerPath.includes("pantal") || lowerPath.includes("boxer") || lowerPath.includes("slip") ? "bottom" : "top";
      } else {
        category = "donna";
        if (lowerPath.includes("pantal") || lowerPath.includes("gonna") || lowerPath.includes("culotte") || lowerPath.includes("leggings")) {
          outfitSlot = "bottom";
        } else {
          outfitSlot = "top";
        }
      }

      const colorName = colorMatch ? colorMatch[1].trim() : "Tinta Unita";
      const hex = getColorHex(colorName);
      const sizes = rawOptions.length > 0 ? rawOptions.slice(0, 6) : ["S", "M", "L", "XL"];

      products.push({
        id,
        name: rawName,
        subtitle: `${typeMatch ? typeMatch[1].trim() : "Moda"} • Brand ${brand} (Matterhorn Moda)`,
        category,
        subcategory: categoryMatch ? categoryMatch[1].trim() : "Abbigliamento",
        price,
        originalPrice,
        isNew: true,
        isBestSeller: Math.random() > 0.65,
        isSale: true,
        rating: +(4.6 + Math.random() * 0.4).toFixed(1),
        reviewCount: Math.floor(10 + Math.random() * 35),
        description: textDesc,
        details: [
          `Brand originale: ${brand}`,
          `Categoria catalogo: ${catPath}`,
          `Codice articolo fornitore: ${idMatch ? idMatch[1] : ""}`,
          `Fornito tramite feed XML Matterhorn Moda B2B`,
          `Garanzia di qualità conforme standard UE`
        ],
        composition,
        careInstructions: "Lavaggio a 30°C programma delicato, stirare a bassa temperatura",
        madeIn: `Unione Europea (${brand})`,
        images,
        colors: [
          { name: colorName, hex }
        ],
        sizes,
        stock: Math.floor(3 + Math.random() * 10),
        outfitSlot,
        brand
      });
    } catch {
      // skip errors on individual malformed elements
    }
  }
  return products;
}

async function run() {
  console.log("Fetching Category 60 (Moda Donna)...");
  const xml60 = await fetchXml("60", 15);
  const donnaItems = parseProductsFromXml(xml60, "donna", 15);

  console.log("Fetching Category 62 (Intimo Donna)...");
  const xml62 = await fetchXml("62", 10);
  const intimoItems = parseProductsFromXml(xml62, "donna", 10);

  console.log("Fetching Category 223 (Men Fashion)...");
  const xml223 = await fetchXml("223", 10);
  const uomoItems = parseProductsFromXml(xml223, "uomo", 10);

  const allImported = [...donnaItems, ...intimoItems, ...uomoItems];
  console.log("Total imported from Matterhorn XML:", allImported.length);

  const fileContent = `import { Product } from '../types';\n\nexport const MATTERHORN_PRODUCTS: Product[] = ${JSON.stringify(allImported, null, 2)};\n`;
  fs.writeFileSync('src/data/matterhornProducts.ts', fileContent);
  console.log("Wrote src/data/matterhornProducts.ts successfully!");
}

run();
