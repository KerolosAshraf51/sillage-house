// Admin Dashboard Logic for Sillage House

document.addEventListener('DOMContentLoaded', () => {
  if (typeof AuthService !== 'undefined') {
    AuthService.requireAuth();
    
    // Setup Logout
    document.getElementById('logout-btn')?.addEventListener('click', (e) => {
      e.preventDefault();
      AuthService.logout();
    });
  }
  
  if (document.getElementById('admin-product-table')) {
    renderAdminProducts();
    updateStats();
    populateCategoryDatalist();
    
    // Setup form submits
    document.getElementById('product-form')?.addEventListener('submit', handleProductSubmit);
    document.getElementById('category-form')?.addEventListener('submit', handleCategorySubmit);
    
    // Setup image URL add
    document.getElementById('p-add-image-url')?.addEventListener('click', addImageUrl);
    
    // Categories tab setup
    renderCategories();
    document.getElementById('category-search')?.addEventListener('input', renderCategories);
  }
});

let editingProductId = null;
let currentImageUrls = []; // Array to hold image URLs

function populateCategoryDatalist() {
  const select = document.getElementById('p-category');
  if (select && typeof CategoryService !== 'undefined') {
    const cats = CategoryService.getCategories();
    select.innerHTML = '<option value="Uncategorized">Uncategorized</option>' + cats.map(c => `<option value="${c}">${c}</option>`).join('');
  }
}

function renderAdminProducts() {
  const tbody = document.querySelector('#admin-product-table tbody');
  if (!tbody || typeof ProductService === 'undefined') return;
  
  const products = ProductService.getProducts();
  
  tbody.innerHTML = products.map(p => {
    const imgSrc = p.images && p.images.length > 0 ? p.images[0] : '';
    return `
      <tr>
        <td>${p.id}</td>
        <td>
          ${imgSrc ? `<img src="${imgSrc}" alt="${p.name}" style="width:50px; height:50px; object-fit:cover; border-radius:4px;">` : 'No Image'}
        </td>
        <td><strong>${p.name}</strong></td>
        <td>${p.brand}</td>
        <td>${p.category || 'Uncategorized'}</td>
        <td class="text-gold">$${parseFloat(p.price).toFixed(2)}</td>
        <td>
          <button class="btn btn-sm btn-outline-light me-2" onclick="editProduct(${p.id})">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn btn-sm btn-outline-danger" onclick="deleteProduct(${p.id})">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function updateStats() {
  if (typeof ProductService === 'undefined') return;
  const products = ProductService.getProducts();
  
  document.getElementById('total-products-stat').innerText = products.length;
  
  if (typeof CategoryService !== 'undefined') {
    document.getElementById('total-categories-stat').innerText = CategoryService.getCategories().length;
  }
}

function openAddModal() {
  editingProductId = null;
  currentImageUrls = [];
  document.getElementById('product-form').reset();
  document.getElementById('productModalLabel').innerText = 'Add New Product';
  document.getElementById('image-preview-container').innerHTML = '';
  populateCategoryDatalist();
  
  const modal = new bootstrap.Modal(document.getElementById('productModal'));
  modal.show();
}

function editProduct(id) {
  const product = ProductService.getProductById(id);
  if (!product) return;
  
  editingProductId = id;
  currentImageUrls = product.images ? [...product.images] : [];
  
  document.getElementById('productModalLabel').innerText = 'Edit Product';
  
  document.getElementById('p-name').value = product.name;
  document.getElementById('p-brand').value = product.brand;
  document.getElementById('p-price').value = product.price;
  document.getElementById('p-oldprice').value = product.oldPrice || '';
  document.getElementById('p-category').value = product.category || 'Uncategorized';
  document.getElementById('p-volume').value = product.volume || 100;
  document.getElementById('p-desc').value = product.description || '';
  document.getElementById('p-new').checked = product.isNew;
  document.getElementById('p-bestseller').checked = product.isBestSeller;
  
  document.getElementById('p-image-url-input').value = '';
  
  renderPreviews();
  populateCategoryDatalist();
  
  const modal = new bootstrap.Modal(document.getElementById('productModal'));
  modal.show();
}

function addImageUrl() {
  const input = document.getElementById('p-image-url-input');
  const url = input.value.trim();
  if (url) {
    currentImageUrls.push(url);
    input.value = '';
    renderPreviews();
  }
}

function renderPreviews() {
  const container = document.getElementById('image-preview-container');
  container.innerHTML = currentImageUrls.map((src, index) => `
    <div style="position:relative; display:inline-block;">
      <img src="${src}" style="width:80px; height:80px; object-fit:cover; border-radius:4px; border:1px solid var(--glass-border);">
      <button type="button" class="btn btn-danger btn-sm" style="position:absolute; top:-5px; right:-5px; border-radius:50%; padding:0 5px;" onclick="removeImage(${index})">
        &times;
      </button>
    </div>
  `).join('');
}

window.removeImage = function(index) {
  currentImageUrls.splice(index, 1);
  renderPreviews();
};

function handleProductSubmit(e) {
  e.preventDefault();
  
  if (currentImageUrls.length === 0) {
    alert("Please add at least one image URL.");
    return;
  }
  
  const categoryVal = document.getElementById('p-category').value;
  
  const productData = {
    name: document.getElementById('p-name').value,
    brand: document.getElementById('p-brand').value,
    price: parseFloat(document.getElementById('p-price').value),
    oldPrice: document.getElementById('p-oldprice').value ? parseFloat(document.getElementById('p-oldprice').value) : null,
    category: categoryVal === 'Uncategorized' ? null : categoryVal,
    volume: Number(document.getElementById('p-volume').value) || 100,
    images: currentImageUrls,
    description: document.getElementById('p-desc').value.trim() || null,
    isNew: document.getElementById('p-new').checked,
    isBestSeller: document.getElementById('p-bestseller').checked
  };
  
  if (editingProductId) {
    productData.id = editingProductId;
    ProductService.updateProduct(productData);
    showToast('Product updated successfully');
  } else {
    ProductService.addProduct(productData);
    showToast('Product added successfully');
  }
  
  const modal = bootstrap.Modal.getInstance(document.getElementById('productModal'));
  modal.hide();
  
  renderAdminProducts();
  updateStats();
}

function deleteProduct(id) {
  if (confirm('Are you sure you want to delete this product?')) {
    ProductService.deleteProduct(id);
    renderAdminProducts();
    updateStats();
    showToast('Product deleted');
  }
}

// Category Management
function renderCategories() {
  const tbody = document.querySelector('#admin-category-table tbody');
  if (!tbody || typeof CategoryService === 'undefined') return;
  
  const query = (document.getElementById('category-search')?.value || '').toLowerCase();
  let categories = CategoryService.getCategories();
  
  if (query) {
    categories = categories.filter(c => c.toLowerCase().includes(query));
  }
  
  tbody.innerHTML = categories.map(c => `
    <tr>
      <td><strong>${c}</strong></td>
      <td>
        <button class="btn btn-sm btn-outline-light me-2" onclick="editCategory('${c}')">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn btn-sm btn-outline-danger" onclick="deleteCategory('${c}')">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

window.openCategoryModal = function() {
  document.getElementById('category-form').reset();
  document.getElementById('c-old-name').value = '';
  document.getElementById('categoryModalLabel').innerText = 'Add Category';
  
  const modal = new bootstrap.Modal(document.getElementById('categoryModal'));
  modal.show();
};

window.editCategory = function(name) {
  document.getElementById('category-form').reset();
  document.getElementById('c-name').value = name;
  document.getElementById('c-old-name').value = name;
  document.getElementById('categoryModalLabel').innerText = 'Edit Category';
  
  const modal = new bootstrap.Modal(document.getElementById('categoryModal'));
  modal.show();
};

function handleCategorySubmit(e) {
  e.preventDefault();
  
  const newName = document.getElementById('c-name').value.trim();
  const oldName = document.getElementById('c-old-name').value;
  
  if (!newName) return;
  
  if (oldName) {
    CategoryService.updateCategory(oldName, newName);
    showToast('Category updated');
  } else {
    CategoryService.addCategory(newName);
    showToast('Category added');
  }
  
  const modal = bootstrap.Modal.getInstance(document.getElementById('categoryModal'));
  modal.hide();
  
  renderCategories();
  populateCategoryDatalist();
  renderAdminProducts(); // In case products were updated
  updateStats();
}

window.deleteCategory = function(name) {
  if (confirm('Are you sure you want to delete this category? Products in this category will become Uncategorized.')) {
    CategoryService.deleteCategory(name);
    renderCategories();
    populateCategoryDatalist();
    renderAdminProducts();
    updateStats();
    showToast('Category deleted');
  }
};

function showToast(message) {
  const toastContainer = document.getElementById('toast-container') || createToastContainer();
  
  const toastId = 'toast-' + Date.now();
  const toastHTML = `
    <div id="${toastId}" class="toast align-items-center text-white bg-dark border-0" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body text-gold">
          <i class="fas fa-check-circle me-2"></i> ${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  `;
  
  toastContainer.insertAdjacentHTML('beforeend', toastHTML);
  const toastEl = document.getElementById(toastId);
  const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
  toast.show();
  
  toastEl.addEventListener('hidden.bs.toast', () => {
    toastEl.remove();
  });
}

function createToastContainer() {
  const container = document.createElement('div');
  container.id = 'toast-container';
  container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
  document.body.appendChild(container);
  return container;
}
