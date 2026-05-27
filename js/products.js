// Mock Data for Sillage House
const defaultProducts = [
  {
    id: 1,
    name: "Oud Royale",
    brand: "Arabian Oud",
    price: 350.00,
    oldPrice: 400.00,
    category: "Arabic",
    images: ["https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600&auto=format&fit=crop"],
    volume: 100,
    description: "A majestic blend of aged oud, spicy saffron, and rich amber. Designed for those who leave a powerful trail.",
    isNew: false,
    isBestSeller: true
  },
  {
    id: 2,
    name: "Rose de Paris",
    brand: "Dior",
    price: 280.00,
    oldPrice: null,
    category: "French",
    images: ["https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600&auto=format&fit=crop"],
    volume: 50,
    description: "A delicate yet profound infusion of Grasse rose, jasmine, and a hint of white musk. The epitome of French elegance.",
    isNew: true,
    isBestSeller: false
  },
  {
    id: 3,
    name: "Noir Extreme",
    brand: "Tom Ford",
    price: 420.00,
    oldPrice: 450.00,
    category: "Niche",
    images: ["https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=600&auto=format&fit=crop"],
    volume: 100,
    description: "An amber woody fragrance with a heart of kulfi, vanilla, and cardamom. Dark, mysterious, and undeniably luxurious.",
    isNew: false,
    isBestSeller: true
  },
  {
    id: 4,
    name: "Bleu Mystique",
    brand: "Chanel",
    price: 210.00,
    oldPrice: null,
    category: "French",
    images: ["https://images.unsplash.com/photo-1615634260167-c8cd6f5a0846?q=80&w=600&auto=format&fit=crop"],
    volume: 100,
    description: "Crisp citrus notes layered over deep cedar and sandalwood. Perfect for evening wear.",
    isNew: true,
    isBestSeller: false
  },
  {
    id: 5,
    name: "Saffron Velvet",
    brand: "Sillage House",
    price: 550.00,
    oldPrice: 600.00,
    category: "Signature",
    images: ["https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=600&auto=format&fit=crop"],
    volume: 200,
    description: "Our signature blend featuring the rarest saffron, madagascar vanilla, and pure oud oil. Exclusivity in a bottle.",
    isNew: true,
    isBestSeller: true
  },
  {
    id: 6,
    name: "Desert Gold",
    brand: "Amouage",
    price: 380.00,
    oldPrice: null,
    category: "Arabic",
    images: ["https://images.unsplash.com/photo-1590736969955-71cc94801759?q=80&w=600&auto=format&fit=crop"],
    volume: 100,
    description: "Warm spices, frankincense, and myrrh create a sensory journey across the golden dunes.",
    isNew: false,
    isBestSeller: false
  },
  {
    id: 7,
    name: "Velvet Orchid",
    brand: "Tom Ford",
    price: 310.00,
    oldPrice: 350.00,
    category: "Niche",
    images: ["https://images.unsplash.com/photo-1629198725800-4b55364859a8?q=80&w=600&auto=format&fit=crop"],
    volume: 50,
    description: "An oriental floral that evolves with notes of rum, honey, and black orchid.",
    isNew: false,
    isBestSeller: true
  },
  {
    id: 8,
    name: "L'Etoile",
    brand: "Chanel",
    price: 260.00,
    oldPrice: null,
    category: "French",
    images: ["https://images.unsplash.com/photo-1555529733-0e67056058ab?q=80&w=600&auto=format&fit=crop"],
    volume: 100,
    description: "A brilliant, sparkling floral composition that radiates light and luxury.",
    isNew: true,
    isBestSeller: false
  }
];

const defaultCategories = ["Arabic", "French", "Niche", "Signature"];

// Initialize DB if empty
if (!localStorage.getItem('sillage_products')) {
  // Migrate old 'image' to 'images' for existing users if any, or just set fresh
  localStorage.setItem('sillage_products', JSON.stringify(defaultProducts));
} else {
  // Migration code: update any product that still uses 'image' string instead of 'images' array
  let existingProducts = JSON.parse(localStorage.getItem('sillage_products'));
  let migrated = false;
  existingProducts.forEach(p => {
    if (p.image && !p.images) {
      p.images = [p.image];
      delete p.image;
      migrated = true;
    }
  });
  if (migrated) {
    localStorage.setItem('sillage_products', JSON.stringify(existingProducts));
  }
}

if (!localStorage.getItem('sillage_categories')) {
  localStorage.setItem('sillage_categories', JSON.stringify(defaultCategories));
}

// Category Service
const CategoryService = {
  getCategories: function() {
    return JSON.parse(localStorage.getItem('sillage_categories')) || [];
  },
  
  addCategory: function(catName) {
    if (!catName || catName.trim() === '') return;
    const cats = this.getCategories();
    // check if it already exists (case insensitive)
    if (!cats.some(c => c.toLowerCase() === catName.toLowerCase())) {
      cats.push(catName);
      localStorage.setItem('sillage_categories', JSON.stringify(cats));
    }
  },
  
  updateCategory: function(oldName, newName) {
    if (!newName || newName.trim() === '') return;
    let cats = this.getCategories();
    const index = cats.findIndex(c => c.toLowerCase() === oldName.toLowerCase());
    if (index !== -1) {
      cats[index] = newName;
      localStorage.setItem('sillage_categories', JSON.stringify(cats));
      
      // Update products category
      let products = ProductService.getProducts();
      let updated = false;
      products.forEach(p => {
        if (p.category && p.category.toLowerCase() === oldName.toLowerCase()) {
          p.category = newName;
          updated = true;
        }
      });
      if (updated) {
        localStorage.setItem('sillage_products', JSON.stringify(products));
      }
    }
  },
  
  deleteCategory: function(catName) {
    let cats = this.getCategories();
    cats = cats.filter(c => c.toLowerCase() !== catName.toLowerCase());
    localStorage.setItem('sillage_categories', JSON.stringify(cats));
    
    // Set affected products to Uncategorized
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

// Product Service
const ProductService = {
  getProducts: function() {
    return JSON.parse(localStorage.getItem('sillage_products')) || [];
  },
  
  getProductById: function(id) {
    const products = this.getProducts();
    return products.find(p => p.id === parseInt(id));
  },
  
  getBestSellers: function() {
    return this.getProducts().filter(p => p.isBestSeller);
  },
  
  getNewArrivals: function() {
    return this.getProducts().filter(p => p.isNew);
  },
  
  getByCategory: function(category) {
    if (!category) return this.getProducts();
    return this.getProducts().filter(p => p.category && p.category.toLowerCase() === category.toLowerCase());
  },
  
  search: function(query) {
    const products = this.getProducts();
    const q = query.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.brand.toLowerCase().includes(q) ||
      (p.category && p.category.toLowerCase().includes(q))
    );
  },
  
  addProduct: function(product) {
    const products = this.getProducts();
    product.id = Date.now();
    products.push(product);
    localStorage.setItem('sillage_products', JSON.stringify(products));
    
    // Auto-save new category if provided
    if (product.category) {
      CategoryService.addCategory(product.category);
    }
    return product;
  },
  
  updateProduct: function(updatedProduct) {
    let products = this.getProducts();
    const index = products.findIndex(p => p.id === parseInt(updatedProduct.id));
    if (index !== -1) {
      products[index] = updatedProduct;
      localStorage.setItem('sillage_products', JSON.stringify(products));
      
      // Auto-save new category if provided
      if (updatedProduct.category) {
        CategoryService.addCategory(updatedProduct.category);
      }
      return true;
    }
    return false;
  },
  
  deleteProduct: function(id) {
    let products = this.getProducts();
    products = products.filter(p => p.id !== parseInt(id));
    localStorage.setItem('sillage_products', JSON.stringify(products));
  }
};
