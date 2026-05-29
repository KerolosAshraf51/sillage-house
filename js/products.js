// ============================================================
//  Sillage House — Product & Category Data Layer
//  Clean rewrite: no Best Seller logic, new product catalogue
// ============================================================

// ── Default Categories ───────────────────────────────────────
const defaultCategories = ["French", "Arabic", "Niche"];

// ── Default Products ─────────────────────────────────────────
const defaultProducts = [
  {
    id: 1,
    name: "Sauvage",
    brand: "Dior",
    price: 900,
    oldPrice: null,
    category: "French",
    volume: null,
    images: [
      "https://i.pinimg.com/736x/cd/c1/27/cdc127ba7c52284ad240073fe7dfc0e6.jpg"
    ],
    description: "An untamed force of nature — raw woods, electric bergamot, and Ambroxan. Dior's most iconic masculine statement.",
    isNew: false
  },
  {
    id: 2,
    name: "Homme",
    brand: "Dior",
    price: 950,
    oldPrice: null,
    category: "French",
    volume: null,
    images: [
      "https://i.pinimg.com/736x/44/0b/85/440b8574686fc9aa080eac47ce1211fd.jpg"
    ],
    description: "Refined iris, vetiver, and cedar compose this understated masterpiece — the quiet confidence of true elegance.",
    isNew: false
  },
  {
    id: 3,
    name: "Y Eau De Parfum",
    brand: "Yves Saint Laurent",
    price: 950,
    oldPrice: null,
    category: "French",
    volume: null,
    images: [
      "https://i.pinimg.com/1200x/16/10/7c/16107cb7e86b6766147a8e608c1a4652.jpg"
    ],
    description: "A bold fusion of fresh ginger, sage, and warm amber. Youth, ambition, and raw energy captured in a bottle.",
    isNew: false
  },
  {
    id: 4,
    name: "Bleu de Chanel",
    brand: "Chanel",
    price: 1100,
    oldPrice: null,
    category: "French",
    volume: null,
    images: [
      "https://i.pinimg.com/736x/07/a8/07/07a807239ea02ce9aa6bcda77553ccd2.jpg"
    ],
    description: "An aromatic-woody fragrance of extraordinary freshness and depth. The essence of Chanel sophistication redefined.",
    isNew: false
  },
  {
    id: 5,
    name: "Jean Paul Ultra Male",
    brand: "Jean Paul Gaultier",
    price: 1300,
    oldPrice: null,
    category: "French",
    volume: null,
    images: [
      "https://i.pinimg.com/736x/e7/fa/69/e7fa69db165c7d894ec56f3c72370488.jpg"
    ],
    description: "An intensified masculine declaration — pear, lavender, and a seductive vanilla base that commands every room.",
    isNew: true
  },
  {
    id: 6,
    name: "Jean Paul La Belle",
    brand: "Jean Paul Gaultier",
    price: 1350,
    oldPrice: null,
    category: "French",
    volume: null,
    images: [
      "https://i.pinimg.com/736x/cc/f9/b3/ccf9b3424a6ee60502f1ebf539743b07.jpg"
    ],
    description: "A feminine floriental of exquisite contrast — pear blossom, jasmine, and tonka bean create addictive sensuality.",
    isNew: true
  },
  {
    id: 7,
    name: "De Marly",
    brand: "Parfums de Marly",
    price: 950,
    oldPrice: null,
    category: "Niche",
    volume: null,
    images: [
      "https://i.pinimg.com/736x/e7/93/c7/e793c754dea45844d6a41b81ff5f4117.jpg"
    ],
    description: "Inspired by the grandeur of Versailles — a lavish equestrian accord of leather, spice, and golden amber.",
    isNew: false
  },
  {
    id: 8,
    name: "Baccarat Rouge 540",
    brand: "Maison Francis Kurkdjian",
    price: 1100,
    oldPrice: null,
    category: "Niche",
    volume: null,
    images: [
      "https://i.pinimg.com/736x/42/30/04/4230049b68066416a29f015346fc404b.jpg"
    ],
    description: "Luminous jasmine and saffron melt into cedarwood and ambergris. A crystalline, otherworldly luxury.",
    isNew: false
  },
  {
    id: 9,
    name: "Imagination",
    brand: "Louis Vuitton",
    price: 1150,
    oldPrice: null,
    category: "French",
    volume: null,
    images: [
      "https://i.pinimg.com/736x/cc/85/51/cc85516672296725428b1eeee9091914.jpg"
    ],
    description: "A voyage of the senses — citrus, tea accord, and warm woods that evoke distant horizons and infinite freedom.",
    isNew: true
  },
  {
    id: 10,
    name: "Stronger With You",
    brand: "Emporio Armani",
    price: 950,
    oldPrice: null,
    category: "French",
    volume: null,
    images: [
      "https://i.pinimg.com/736x/61/46/d6/6146d6272f8dec6d064fea64cc7cc916.jpg"
    ],
    description: "Chestnut, pink pepper, and sage in a warm fougère embrace. Modern masculinity at its most magnetic.",
    isNew: false
  },
  {
    id: 11,
    name: "Acqua Di Gio",
    brand: "Giorgio Armani",
    price: 1100,
    oldPrice: null,
    category: "French",
    volume: null,
    images: [
      "https://i.pinimg.com/736x/05/9d/c8/059dc832740067aba240b6adb24d2e7c.jpg"
    ],
    description: "The eternal scent of the Mediterranean — aquatic freshness, bergamot, and marine notes captured in timeless form.",
    isNew: false
  },
  {
    id: 12,
    name: "Si",
    brand: "Giorgio Armani",
    price: 1150,
    oldPrice: null,
    category: "French",
    volume: null,
    images: [
      "https://i.pinimg.com/736x/d7/33/7b/d7337b81d1effb33124ce5dded12bdab.jpg"
    ],
    description: "Blackcurrant nectar, rose, and patchouli — a modern feminine power statement of grace and determination.",
    isNew: false
  },
  {
    id: 13,
    name: "Valentino Uomo",
    brand: "Valentino",
    price: 1100,
    oldPrice: null,
    category: "French",
    volume: null,
    images: [
      "https://i.pinimg.com/736x/fb/30/b2/fb30b2d25d1a234a0aeb7f739e9d927f.jpg"
    ],
    description: "Bergamot, iris, and warm leather — Roman couture elegance distilled into a singular, memorable fragrance.",
    isNew: false
  },
  {
    id: 14,
    name: "Asad",
    brand: "Lattafa",
    price: 1125,
    oldPrice: null,
    category: "Arabic",
    volume: null,
    images: [
      "https://i.pinimg.com/736x/e6/98/b9/e698b9231607a280599126ceaa59988e.jpg"
    ],
    description: "A regal Arabic composition of oud, musk, and smoky amber — bold, commanding, and unmistakably opulent.",
    isNew: false
  },
  {
    id: 15,
    name: "Fakhar Black",
    brand: "Lattafa",
    price: 1200,
    oldPrice: null,
    category: "Arabic",
    volume: null,
    images: [
      "https://i.pinimg.com/736x/d9/bd/15/d9bd158870bf5fe39513ad5337172a05.jpg"
    ],
    description: "An intense oriental declaration — spiced oud, deep incense, and sensual musk that lingers with sovereign power.",
    isNew: true
  },
  {
    id: 16,
    name: "Yara",
    brand: "Lattafa",
    price: 1200,
    oldPrice: null,
    category: "Arabic",
    volume: null,
    images: [
      "https://i.pinimg.com/736x/6f/c6/84/6fc6843619d3011dc73ca359d9b264ff.jpg"
    ],
    description: "Fruity florals and warm vanilla musk weave a story of feminine grace — sweet, vibrant, and irresistibly close.",
    isNew: false
  },
  {
    id: 17,
    name: "Hawas",
    brand: "Rasasi",
    price: 1200,
    oldPrice: null,
    category: "Arabic",
    volume: null,
    images: [
      "https://i.pinimg.com/736x/00/36/96/0036961c0c38139f65f35cdb8271ef22.jpg"
    ],
    description: "A fresh, aquatic adventure of mint, woody amber, and musk. Desire and freedom in every breath.",
    isNew: false
  },
  {
    id: 18,
    name: "1 Million",
    brand: "Paco Rabanne",
    price: 1000,
    oldPrice: null,
    category: "French",
    volume: null,
    images: [
      "https://i.pinimg.com/736x/32/32/8f/32328f84094cf69c318f518489bdf59f.jpg"
    ],
    description: "Gold-dipped audacity — blood orange, rose, and leather compose the ultimate scent of luxury excess.",
    isNew: false
  },
  {
    id: 19,
    name: "Invictus",
    brand: "Paco Rabanne",
    price: 950,
    oldPrice: null,
    category: "French",
    volume: null,
    images: [
      "https://i.pinimg.com/1200x/a7/86/61/a78661653c5e1d2bfb034eebb2b26fe5.jpg"
    ],
    description: "Fresh grapefruit, marine accord, and guaiac wood — a victorious masculine energy that radiates unstoppable force.",
    isNew: false
  },
  {
    id: 20,
    name: "Olympea",
    brand: "Paco Rabanne",
    price: 900,
    oldPrice: null,
    category: "French",
    volume: null,
    images: [
      "https://i.pinimg.com/736x/d5/ed/46/d5ed46c7c995e8e5ccb1b15672ab9633.jpg"
    ],
    description: "White tea, vanilla, and sea salt create a divine feminine aura — goddess-like, modern, and effortlessly powerful.",
    isNew: false
  },
  {
    id: 21,
    name: "Tobacco Vanille",
    brand: "Tom Ford",
    price: 900,
    oldPrice: null,
    category: "Niche",
    volume: null,
    images: [
      "https://i.pinimg.com/736x/ef/d4/50/efd450c7af778e17f1a2dd83db85b5c6.jpg"
    ],
    description: "An intoxicating blend of tobacco flower, vanilla, and rich spice. Warm opulence that seduces from the first note.",
    isNew: false
  },
  {
    id: 22,
    name: "Ibrahim Elqurashi",
    brand: "Ibrahim Al-Qurashi",
    price: 1300,
    oldPrice: null,
    category: "Arabic",
    volume: 200,
    images: [
      "https://i.pinimg.com/736x/8e/f7/d0/8ef7d079d2e1b156fad1698ed18d9f3d.jpg"
    ],
    description: "A majestic 200ml opus of precious oud, saffron, and aged sandalwood — the crown jewel of Arabian perfumery.",
    isNew: true
  },
  {
    id: 23,
    name: "Ibraq",
    brand: "Ibraq",
    price: 950,
    oldPrice: null,
    category: "Arabic",
    volume: null,
    images: [
      "https://i.pinimg.com/1200x/60/92/17/60921788ddfb481f71a76d53d8dda748.jpg"
    ],
    description: "New! Mexican Tobacco By Ibraheem Al Qurashi Extrait De Parfum Spray New Sealed.",
    isNew: false
  },
  {
    id: 24,
    name: "Black Orchid",
    brand: "Tom Ford",
    price: 900,
    oldPrice: null,
    category: "Niche",
    volume: null,
    images: [
      "https://i.pinimg.com/736x/64/b8/43/64b843bde29e56ef792d498a73583252.jpg"
    ],
    description: "Black truffle, ylang ylang, and dark chocolate swirl into a hypnotic floral darkness. Unapologetically seductive.",
    isNew: false
  },
  {
    id: 25,
    name: "Spicebomb",
    brand: "Viktor & Rolf",
    price: 950,
    oldPrice: null,
    category: "French",
    volume: null,
    images: [
      "https://i.pinimg.com/736x/da/f2/09/daf209a9cb33562d3ce53437be774789.jpg"
    ],
    description: "An explosive blend of chili, saffron, and tobacco. Viktor & Rolf's grenade of masculine intensity.",
    isNew: false
  },
  {
    id: 26,
    name: "Red Tobacco",
    brand: "Mancera",
    price: 950,
    oldPrice: null,
    category: "Niche",
    volume: null,
    images: [
      "https://i.pinimg.com/736x/57/55/cc/5755cc89f9802875f949dd266c6aa030.jpg"
    ],
    description: "Bold tobacco, vanilla, and rose intertwine in a rich amber tapestry. Smoky glamour with a velvet heart.",
    isNew: false
  },
  {
    id: 27,
    name: "Black Afgano",
    brand: "Nasomatto",
    price: 1150,
    oldPrice: null,
    category: "Niche",
    volume: null,
    images: [
      "https://i.pinimg.com/736x/f7/f3/c5/f7f3c53fd1fcd6639ec91006b9007127.jpg"
    ],
    description: "Cannabis, oud, and resinous woods create an underground luxury — dark, raw, and devastatingly memorable.",
    isNew: false
  },
  {
    id: 28,
    name: "YSL Libre",
    brand: "Yves Saint Laurent",
    price: 1150,
    oldPrice: null,
    category: "French",
    volume: null,
    images: [
      "https://i.pinimg.com/736x/1a/23/e7/1a23e74a421e785ade8cc393b7ded7bd.jpg"
    ],
    description: "A lavender and orange blossom revolution — YSL's manifesto of freedom, femininity, and fearless individuality.",
    isNew: true
  },
  {
    id: 29,
    name: "Billie Eilish",
    brand: "Billie Eilish",
    price: 1150,
    oldPrice: null,
    category: "French",
    volume: null,
    images: [
      "https://i.pinimg.com/736x/1a/9e/33/1a9e333089c72e4661969210136175bb.jpg"
    ],
    description: "Vanilla, musk, and warm woods reflect an intimate vulnerability — soft yet deeply complex, like the artist herself.",
    isNew: true
  },
  {
    id: 30,
    name: "Mancera Cedrat",
    brand: "Mancera",
    price: 950,
    oldPrice: null,
    category: "Niche",
    volume: null,
    images: [
      "https://i.pinimg.com/736x/d8/fd/b1/d8fdb1b17fde9e583d54984046c45fd2.jpg"
    ],
    description: "Zesty Sicilian cedrat, tea, and crisp woods compose an effortlessly refined freshness. Clean luxury, elevated.",
    isNew: false
  },
  {
    id: 31,
    name: "Kayali Vanilla",
    brand: "Kayali",
    price: 950,
    oldPrice: null,
    category: "Niche",
    volume: null,
    images: [
      "https://i.pinimg.com/736x/e7/39/1a/e7391afb4f8567048e2e69a6d730f1f5.jpg"
    ],
    description: "Madagascar vanilla, musk, and sandalwood in a dessert-like embrace — warm, comforting, and utterly addictive.",
    isNew: false
  },
  {
    id: 32,
    name: "Sauvage & Versce Eros & Stronger With You Intensely Bundle",
    brand: "Gentle man bundle",
    price: 2200,
    oldPrice: null,
    category: "French",
    volume: null,
    images: [
      "https://rollcestore.com/cdn/shop/files/Untitled_1080x1080px_1500x1500px_2000x2000px_34.jpg?v=1760850007&width=533"
    ],
    description: "A powerful fragrance bundle combining fresh seduction, bold masculinity, and warm elegance — featuring Versace Eros, Sauvage, and Stronger With You for every mood and occasion.",
    isNew: false
  },
  {
    id: 33,
    name: "Kayali Vanilla & Sauvage Bundle" ,
    brand: "Duo de Sillage",
    price: 1650,
    oldPrice: null,
    category: "French",
    volume: null,
    images: [
      "https://oud-shop.com/cdn/shop/files/SauvageBYDiorForMenEDP-Phantom_b00cf17b-d6b1-44f5-b47a-3aace9a83f1b.png?v=1777297395&width=800"
    ],
    description: "A refined contrast of bold freshness and warm sweetness — combining the intense, masculine elegance of Sauvage Dior with the rich, creamy vanilla depth of Vanilla 28 for a perfectly balanced signature scent duo.",
    isNew: false
  },
  {
    id: 34,
    name: "Sauvage Dior & Khamrah Lattafa Bundle ",
    brand: "Two Souls, One Sillage",
    price: 1750,
    oldPrice: null,
    category: "null",
    volume: null,
    images: [
      "https://oud-shop.com/cdn/shop/files/Sauvage_BY_Dior_For_Men_EDP_-_Khamrah.png?v=1744914068&width=800"
    ],
    description: "A bold fusion of fresh sophistication and warm oriental sweetness — combining Sauvage with Khamrah for a powerful all-day signature scent experience.",
    isNew: false
  }
];

// ── Force Reset LocalStorage ─────────────────────────────────
// Always loads the latest default products on initialisation.
// This ensures stale or legacy data is never shown.
localStorage.setItem('sillage_products', JSON.stringify(defaultProducts));
localStorage.setItem('sillage_categories', JSON.stringify(defaultCategories));

// ── Category Service ─────────────────────────────────────────
const CategoryService = {
  getCategories() {
    return JSON.parse(localStorage.getItem('sillage_categories')) || [];
  },

  addCategory(catName) {
    if (!catName || catName.trim() === '') return;
    const cats = this.getCategories();
    if (!cats.some(c => c.toLowerCase() === catName.toLowerCase())) {
      cats.push(catName.trim());
      localStorage.setItem('sillage_categories', JSON.stringify(cats));
    }
  },

  updateCategory(oldName, newName) {
    if (!newName || newName.trim() === '') return;
    let cats = this.getCategories();
    const index = cats.findIndex(c => c.toLowerCase() === oldName.toLowerCase());
    if (index !== -1) {
      cats[index] = newName.trim();
      localStorage.setItem('sillage_categories', JSON.stringify(cats));

      // Cascade rename to all products in this category
      let products = ProductService.getProducts();
      let updated = false;
      products.forEach(p => {
        if (p.category && p.category.toLowerCase() === oldName.toLowerCase()) {
          p.category = newName.trim();
          updated = true;
        }
      });
      if (updated) {
        localStorage.setItem('sillage_products', JSON.stringify(products));
      }
    }
  },

  deleteCategory(catName) {
    let cats = this.getCategories();
    cats = cats.filter(c => c.toLowerCase() !== catName.toLowerCase());
    localStorage.setItem('sillage_categories', JSON.stringify(cats));

    // Move affected products to Uncategorized
    let products = ProductService.getProducts();
    let updated = false;
    products.forEach(p => {
      if (p.category && p.category.toLowerCase() === catName.toLowerCase()) {
        p.category = 'Uncategorized';
        updated = true;
      }
    });
    if (updated) {
      localStorage.setItem('sillage_products', JSON.stringify(products));
    }
  }
};

// ── Product Service ───────────────────────────────────────────
const ProductService = {
  getProducts() {
    return JSON.parse(localStorage.getItem('sillage_products')) || [];
  },

  getProductById(id) {
    return this.getProducts().find(p => p.id === parseInt(id)) || null;
  },

  getNewArrivals() {
    return this.getProducts().filter(p => p.isNew);
  },

  getByCategory(category) {
    if (!category) return this.getProducts();
    return this.getProducts().filter(
      p => p.category && p.category.toLowerCase() === category.toLowerCase()
    );
  },

  search(query) {
    const q = query.toLowerCase();
    return this.getProducts().filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      (p.category && p.category.toLowerCase().includes(q))
    );
  },

  addProduct(product) {
    const products = this.getProducts();
    product.id = Date.now();
    products.push(product);
    localStorage.setItem('sillage_products', JSON.stringify(products));

    if (product.category) {
      CategoryService.addCategory(product.category);
    }
    return product;
  },

  updateProduct(updatedProduct) {
    let products = this.getProducts();
    const index = products.findIndex(p => p.id === parseInt(updatedProduct.id));
    if (index !== -1) {
      products[index] = updatedProduct;
      localStorage.setItem('sillage_products', JSON.stringify(products));

      if (updatedProduct.category) {
        CategoryService.addCategory(updatedProduct.category);
      }
      return true;
    }
    return false;
  },

  deleteProduct(id) {
    let products = this.getProducts().filter(p => p.id !== parseInt(id));
    localStorage.setItem('sillage_products', JSON.stringify(products));
  }
};