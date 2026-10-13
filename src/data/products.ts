import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Cappotto Sartoriale in Cashmere & Lana',
    subtitle: 'Doppiopetto con rever a lancia e cintura sartoriale',
    category: 'donna',
    subcategory: 'Cappotti & Trench',
    price: 490,
    originalPrice: 620,
    isSale: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 38,
    description: 'Un capolavoro dell’artigianato sartoriale italiano. Realizzato in blend di lana vergine e cashmere toscano, questo cappotto monopetto avvolge la silhouette con eleganza senza tempo e un calore impareggiabile.',
    details: [
      'Costruzione semi-intelata per una caduta fluida e perfetta',
      'Bottoni in vero corno naturale incisi a mano',
      'Fodera interna in pura viscosa jacquard traspirante',
      'Tasche a filetto profonde con pattina interna'
    ],
    composition: '80% Pura Lana Vergine, 20% Cashmere Superfine',
    careInstructions: 'Lavaggio a secco specializzato, stirare a bassa temperatura',
    madeIn: 'Firenze, Italia',
    images: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Cammello Reale', hex: '#C19A6B' },
      { name: 'Nero Assoluto', hex: '#1C1917' },
      { name: 'Grigio Antracite', hex: '#4B5563' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: 4,
    outfitSlot: 'top'
  },
  {
    id: 'prod-2',
    name: 'Blazer Monopetto Sartoriale Milano',
    subtitle: 'Giacca destrutturata in fresco lana pettinata',
    category: 'uomo',
    subcategory: 'Abiti & Giacche',
    price: 360,
    isNew: true,
    isBestSeller: true,
    rating: 5.0,
    reviewCount: 24,
    description: 'Ispirato allo stile della sartoria milanese contemporanea: spalla naturale senza spallina rigida, rever classico e vestibilità impeccabile sia su camicia che su maglieria fine.',
    details: [
      'Costruzione decostruita ultra-leggera "Spalla a camicia"',
      'Doppio spacco posteriore per massima libertà di movimento',
      'Taschino a barchetta rifinito a punto sarto',
      'Due tasche interne porta documenti e smartphone'
    ],
    composition: '100% Fresco Lana Pettinata Biellese Super 130s',
    careInstructions: 'Lavaggio a secco professionale, appendere su gruccia sagomata',
    madeIn: 'Biella, Italia',
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Blu Notte Savoia', hex: '#1E293B' },
      { name: 'Grigio Fumo', hex: '#64748B' },
      { name: 'Verde Bosco', hex: '#14532D' }
    ],
    sizes: ['46', '48', '50', '52', '54'],
    stock: 6,
    outfitSlot: 'top'
  },
  {
    id: 'prod-3',
    name: 'Camicia in Pura Seta Comasca',
    subtitle: 'Taglio morbido con colletto alla francese e polsini a gemello',
    category: 'donna',
    subcategory: 'Camicie & Top',
    price: 210,
    isNew: true,
    rating: 4.8,
    reviewCount: 19,
    description: 'Tessuta e nobilitata nei rinomati laboratori serici di Como. Una camicia fluida e luminosa che accarezza la pelle, ideale dal mattino in ufficio all’aperitivo serale.',
    details: [
      'Pura crêpe de Chine di seta pura 16 momme',
      'Chiusura frontale con bottoni in madreperla australiana',
      'Cuciture francesi invisibili ad alta resistenza',
      'Polsini stondati con doppio bottone regolabile'
    ],
    composition: '100% Seta Naturale di Como',
    careInstructions: 'Lavaggio a mano delicato in acqua fredda o a secco',
    madeIn: 'Como, Italia',
    images: [
      'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Panna Perlato', hex: '#FDFBF7' },
      { name: 'Rosa Cipria', hex: '#FBCFE8' },
      { name: 'Nero Satin', hex: '#18181B' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    stock: 8,
    outfitSlot: 'top'
  },
  {
    id: 'prod-4',
    name: 'Pantaloni Sartoriali a Gamba Larga',
    subtitle: 'Vita alta con doppia pence e linea a palazzo',
    category: 'donna',
    subcategory: 'Pantaloni & Gonne',
    price: 185,
    originalPrice: 220,
    isSale: true,
    rating: 4.9,
    reviewCount: 31,
    description: 'Il perfetto connubio di rigore sartoriale e comfort contemporaneo. La caduta fluida del tessuto allunga la figura, mentre le doppie pence donano volume sofisticato.',
    details: [
      'Cinturino interno rinforzato con passanti invisibili',
      'Chiusura sartoriale con gancio a scomparsa e zip YKK',
      'Tasche laterali alla francese e tasche a filetto dietro',
      'Orlo rifinito a mano con 5 cm di riserva allungabile'
    ],
    composition: '65% Lana Vergine, 33% Viscosa, 2% Elastan',
    careInstructions: 'Lavaggio a secco o programma lana a freddo',
    madeIn: 'Treviso, Italia',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Avorio Caldo', hex: '#F5F5F4' },
      { name: 'Nero Sartoriale', hex: '#1C1917' },
      { name: 'Cioccolato Fondente', hex: '#451A03' }
    ],
    sizes: ['38', '40', '42', '44', '46'],
    stock: 5,
    outfitSlot: 'bottom'
  },
  {
    id: 'prod-5',
    name: 'Pantaloni Chino Sartoriali in Cotone Ritorto',
    subtitle: 'Gamba asciutta affusolata con risvolto 4cm',
    category: 'uomo',
    subcategory: 'Pantaloni',
    price: 145,
    isBestSeller: true,
    rating: 4.7,
    reviewCount: 42,
    description: 'Il classico pantalone italiano rivisitato: cotone doppio ritorto tinto in capo per un effetto di colore ricco e morbidezza eccezionale sin dal primo indosso.',
    details: [
      'Tessuto gabardina di cotone stretch pettinato',
      'Taschino porta monete sartoriale frontale',
      'Chiusura con bottone in corozo naturale e zip metallica',
      'Interno cintura foderato in oxford millerighe'
    ],
    composition: '98% Cotone Egiziano Ritorto, 2% Elastan',
    careInstructions: 'Lavabile in lavatrice a 30°C, lavare al rovescio',
    madeIn: 'Napoli, Italia',
    images: [
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Sabbia Naturale', hex: '#D2B48C' },
      { name: 'Verde Salvia', hex: '#657865' },
      { name: 'Blu Navy', hex: '#1E3A8A' }
    ],
    sizes: ['46', '48', '50', '52', '54'],
    stock: 9,
    outfitSlot: 'bottom'
  },
  {
    id: 'prod-6',
    name: 'Borsa a Tracolla in Pelle Pieno Fiore',
    subtitle: 'Artigianato fiorentino con metalleria in ottone dorato',
    category: 'accessori',
    subcategory: 'Borse & Pelletteria',
    price: 295,
    originalPrice: 340,
    isSale: true,
    isBestSeller: true,
    rating: 5.0,
    reviewCount: 56,
    description: 'Conciata al vegetale secondo la tradizione secolare toscana. La pelle sviluppa una magnifica patina col passare del tempo, rendendo ogni esemplare unico.',
    details: [
      'Pelle di vitello pieno fiore conciata al vegetale',
      'Interno foderato in suede scamosciato tono su tono',
      'Tracolla regolabile e amovibile per doppio uso a spalla o a mano',
      'Scomparto principale con tasca a zip e divisorio centrale'
    ],
    composition: '100% Vera Pelle Bovina Italiana Conciata al Vegetale',
    careInstructions: 'Pulire con panno morbido in cotone, applicare crema per cuoio naturale',
    madeIn: 'Firenze, Italia',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Cuoio Cognac', hex: '#9A3412' },
      { name: 'Bordeaux Nobile', hex: '#881337' },
      { name: 'Nero Ossidiana', hex: '#09090B' }
    ],
    sizes: ['Unica'],
    stock: 3,
    outfitSlot: 'accessory'
  },
  {
    id: 'prod-7',
    name: 'Mocassini Penny Loafer Sartoriali',
    subtitle: 'Lavorazione Blake con suola in cuoio e guardolo cucito',
    category: 'uomo',
    subcategory: 'Calzature',
    price: 280,
    isNew: true,
    rating: 4.9,
    reviewCount: 15,
    description: 'L’emblema del gusto italiano informale ma ricercato. Realizzati a mano nelle Marche con vitello spazzolato lucido e sottopiede ammortizzato.',
    details: [
      'Costruzione artigianale con cucitura passante Blake',
      'Fodera interna interamente in vitello traspirante',
      'Sottotacco in gomma antiscivolo vulcanizzata',
      'Profilo affusolato con vaschetta cucita a mano'
    ],
    composition: '100% Pregiato Cuoio e Vitello Italiano',
    careInstructions: 'Lucidare regolarmente con cera neutra o spazzola in crine di cavallo',
    madeIn: 'Montegranaro, Marche, Italia',
    images: [
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Marrone Testa di Moro', hex: '#3B1D11' },
      { name: 'Nero Lucido', hex: '#18181B' }
    ],
    sizes: ['40', '41', '42', '43', '44', '45'],
    stock: 5,
    outfitSlot: 'shoes'
  },
  {
    id: 'prod-8',
    name: 'Décolleté Slingback in Pelle & Seta',
    subtitle: 'Tacco a rocchetto 6.5 cm con punta sfilata elegante',
    category: 'donna',
    subcategory: 'Calzature',
    price: 260,
    isBestSeller: true,
    rating: 4.8,
    reviewCount: 28,
    description: 'Linee essenziali e proporzioni armoniose. Il tacco medio equilibrato garantisce stabilità e portabilità prolungata per eventi, serate o giornate dinamiche in città.',
    details: [
      'Cinturino slingback elasticizzato regolabile sul tallone',
      'Soletta interna con cuscinetto memory foam ergonomico',
      'Suola in cuoio naturale con isolamento protettivo',
      'Altezza tacco confortevole 6.5 cm'
    ],
    composition: 'Tomaia in Vitello Soft e Fodera in Capra Supermorbida',
    careInstructions: 'Conservare nella dustbag inclusa lontano da fonti di calore',
    madeIn: 'Riviera del Brenta, Venezia, Italia',
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1581101767113-1677fc2beaa8?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Nero Intenso', hex: '#171717' },
      { name: 'Nude Cipria', hex: '#FBCFE8' },
      { name: 'Rosso Valentino', hex: '#991B1B' }
    ],
    sizes: ['36', '37', '38', '39', '40', '41'],
    stock: 7,
    outfitSlot: 'shoes'
  },
  {
    id: 'prod-9',
    name: 'Sciarpa Jacquard in 100% Cashmere Rigenerato',
    subtitle: 'Frange rifinite a mano e finitura garzata a pelo morbido',
    category: 'accessori',
    subcategory: 'Sciarpe & Foulard',
    price: 115,
    originalPrice: 140,
    isSale: true,
    rating: 4.9,
    reviewCount: 64,
    description: 'Morbidezza sublime nel pieno rispetto dell’ambiente. Prodotta nel distretto circolare di Prato attraverso il riciclo di fibre pregiate senza l’uso di tinture aggressive.',
    details: [
      'Dimensioni generose: 190 cm x 45 cm',
      'Bordi con frange lunghe 8 cm arrotolate a mano',
      'Termoregolazione naturale per le mezze stagioni e l’inverno',
      'Confezionata in elegante scatola regalo goffrata'
    ],
    composition: '100% Cashmere Pregiato Riciclato di Prato',
    careInstructions: 'Lavare a secco delicato o a mano in acqua tiepida con sapone neutro',
    madeIn: 'Prato, Toscana, Italia',
    images: [
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Grigio Melange', hex: '#9CA3AF' },
      { name: 'Cammello Caldo', hex: '#B45309' },
      { name: 'Blu Ottanio', hex: '#155E75' }
    ],
    sizes: ['Unica'],
    stock: 12,
    outfitSlot: 'accessory'
  },
  {
    id: 'prod-10',
    name: 'Abito Midi in Seta e Viscosa Stampata',
    subtitle: 'Motivo floreale vintage esclusivo con cintura sottile rimovibile',
    category: 'donna',
    subcategory: 'Abiti da Donna',
    price: 320,
    isNew: true,
    rating: 5.0,
    reviewCount: 18,
    description: 'Un abito poetico e femminile caratterizzato da maniche a tre quarti con polsino morbido, gonna a ruota che danza ad ogni passo e corpino valorizzante.',
    details: [
      'Stampa artistica creata in esclusiva per la boutique',
      'Gonna plissata a taglio sbieco ultra-leggera',
      'Cintura coordinata con fibbia in metallo dorato',
      'Fodera interna antistatica in seta leggera'
    ],
    composition: '60% Seta Pura, 40% Viscosa Certificata FSC',
    careInstructions: 'Lavaggio a secco ecologico',
    madeIn: 'Milano, Italia',
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Smeraldo Botanico', hex: '#064E3B' },
      { name: 'Rubino Notturno', hex: '#4C0519' }
    ],
    sizes: ['38', '40', '42', '44', '46'],
    stock: 4,
    outfitSlot: 'top'
  },
  {
    id: 'prod-11',
    name: 'Maglione Girocollo in Lana Merinos Extrafine',
    subtitle: 'Lavorazione a costine sottili titolo 2/30 millesimi',
    category: 'uomo',
    subcategory: 'Maglieria',
    price: 165,
    isBestSeller: true,
    rating: 4.8,
    reviewCount: 37,
    description: 'Il capo essenziale nel guardaroba maschile elegante. Leggero ma termico, perfetto sotto la giacca o abbinato casualmente a un denim sartoriale.',
    details: [
      'Filato Zegna Baruffa Merinos Extrafine 19.5 micron',
      'Collo, polsi e fondo rifiniti a costa elastica tubolare',
      'Trattamento anti-pilling a lunga durata',
      'Non pizzica, sensazione vellutata direttamente sulla pelle'
    ],
    composition: '100% Pura Lana Vergine Merinos Extrafine',
    careInstructions: 'Lavaggio a mano o in lavatrice a freddo ciclo delicato',
    madeIn: 'Biella, Italia',
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Bordeaux Vino', hex: '#581C87' },
      { name: 'Grigio Perla', hex: '#CBD5E1' },
      { name: 'Blu Oltremare', hex: '#1E40AF' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 11,
    outfitSlot: 'top'
  },
  {
    id: 'prod-12',
    name: 'Cintura Sartoriale Reversibile in Vitello e Nabuk',
    subtitle: 'Fibbia satinata satin-brass rotante e larghezza 32mm',
    category: 'accessori',
    subcategory: 'Cinture',
    price: 95,
    rating: 4.7,
    reviewCount: 22,
    description: 'La versatilità elevata a stile: da un lato morbido vitello nero spazzolato per le occasioni formali, dall’altro nabuk testa di moro per il weekend.',
    details: [
      'Meccanismo rotante brevettato fluido e robusto',
      'Bordi tinti e rifiniti a mano con 4 passaggi di cera d’api',
      'Fori ovali sartoriali anti-deformazione',
      'Larghezza classica 3.2 cm universale per tutti i passanti'
    ],
    composition: '100% Cuoio Pieno Fiore e Nabuk Naturale',
    careInstructions: 'Spolverare con panno asciutto',
    madeIn: 'Parma, Italia',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Nero / Testa di Moro', hex: '#27272A' }
    ],
    sizes: ['Unica'],
    stock: 14,
    outfitSlot: 'accessory'
  }
];

export const CATEGORIES = [
  { id: 'tutti', label: 'Tutte le Collezioni' },
  { id: 'donna', label: 'Collezione Donna' },
  { id: 'uomo', label: 'Collezione Uomo' },
  { id: 'accessori', label: 'Pelletteria & Accessori' },
  { id: 'saldi', label: 'Saldi Stagionali' }
];

export const SUBCATEGORIES_BY_CATEGORY: Record<string, string[]> = {
  donna: ['Cappotti & Trench', 'Camicie & Top', 'Pantaloni & Gonne', 'Abiti da Donna', 'Calzature'],
  uomo: ['Abiti & Giacche', 'Maglieria', 'Pantaloni', 'Calzature'],
  accessori: ['Borse & Pelletteria', 'Sciarpe & Foulard', 'Cinture']
};

export const PROMO_CODES: Record<string, { discountPercent: number; description: string }> = {
  'BENVENUTO10': { discountPercent: 10, description: 'Sconto di benvenuto del 10%' },
  'MODA20': { discountPercent: 20, description: 'Sconto esclusivo Boutique del 20%' },
  'ITALIA15': { discountPercent: 15, description: 'Sconto Made in Italy del 15%' }
};
