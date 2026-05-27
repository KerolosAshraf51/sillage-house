// App UI Logic for Sillage House

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initNavbar();
  renderProducts();
  
  // Check auth state for UI updates
  updateAuthUI();
});

function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in-section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // observer.unobserve(entry.target); // keep it dynamic or uncomment to animate once
      } else {
        entry.target.classList.remove('is-visible'); // repeatable animation
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
}

function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(5, 5, 5, 0.95)';
      navbar.style.boxShadow = 'var(--box-shadow)';
    } else {
      navbar.style.background = 'rgba(10, 10, 10, 0.8)';
      navbar.style.boxShadow = 'none';
    }
  });
}

function generateProductCardHTML(product) {
  const priceHTML = product.oldPrice 
    ? `<span class="old-price">$${parseFloat(product.oldPrice).toFixed(2)}</span>$${parseFloat(product.price).toFixed(2)}`
    : `$${parseFloat(product.price).toFixed(2)}`;
    
  const badgeHTML = product.isNew ? '<div class="discount-badge">New</div>' : 
                    (product.oldPrice ? '<div class="discount-badge">Sale</div>' : '');

  return `
    <div class="col-lg-3 col-md-6 mb-4 fade-in-section">
      <div class="product-card">
        ${badgeHTML}
        <div class="product-image-wrapper">
          <img src="${product.images && product.images.length > 0 ? product.images[0] : 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600&auto=format&fit=crop'}" alt="${product.name}" class="product-image" loading="lazy">
        </div>
        <div class="product-brand">${product.brand}</div>
        <h3 class="product-title">${product.name}</h3>
        <p class="text-secondary mb-2" style="font-size: 0.9rem;">${product.volume ? product.volume + 'ml' : '100ml'}</p>
        <div class="product-price text-gold">
          ${priceHTML}
        </div>
        <button class="quick-view-btn" onclick="openQuickView(${product.id})">Quick View</button>
      </div>
    </div>
  `;
}

function renderProducts() {
  
  // Shop page all products
  const shopContainer = document.getElementById('shop-products');
  if (shopContainer && typeof ProductService !== 'undefined') {
    const all = ProductService.getProducts();
    shopContainer.innerHTML = all.map(generateProductCardHTML).join('');
  }
}

// Quick View Modal
function openQuickView(id) {
  if (typeof ProductService === 'undefined') return;
  const product = ProductService.getProductById(id);
  if (!product) return;
  
  // Check if modal exists, if not create it
  let modalEl = document.getElementById('quickViewModal');
  if (!modalEl) {
    const modalHTML = `
      <div class="modal fade" id="quickViewModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title text-gold" style="text-transform:uppercase;letter-spacing:2px;">Quick View</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-0">
              <div class="row g-0">
                <div class="col-md-6">
                  <div style="height:100%; min-height:400px; background:url('') center/cover" id="qv-image"></div>
                </div>
                <div class="col-md-6 p-4">
                  <div class="product-brand" id="qv-brand"></div>
                  <h2 class="mb-3" id="qv-name"></h2>
                  <div class="product-price text-gold mb-3 fs-4" id="qv-price"></div>
                  <p class="text-secondary mb-4" id="qv-desc"></p>
                  <p><strong>Volume:</strong> <span id="qv-volume"></span></p>
                  <p><strong>Category:</strong> <span id="qv-cat"></span></p>
                  <a href="product.html?id=${id}" class="btn btn-gold w-100 mt-3" id="qv-link">View Full Details</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    modalEl = document.getElementById('quickViewModal');
  }
  
  // Update data
  const imgSrc = product.images && product.images.length > 0 ? product.images[0] : 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600&auto=format&fit=crop';
  document.getElementById('qv-image').style.backgroundImage = `url('${imgSrc}')`;
  document.getElementById('qv-brand').innerText = product.brand;
  document.getElementById('qv-name').innerText = product.name;
  
  const priceHTML = product.oldPrice 
    ? `<span class="old-price" style="font-size:16px;">$${parseFloat(product.oldPrice).toFixed(2)}</span> $${parseFloat(product.price).toFixed(2)}`
    : `$${parseFloat(product.price).toFixed(2)}`;
    
  document.getElementById('qv-price').innerHTML = priceHTML;
  document.getElementById('qv-desc').innerText = product.description || '';
  document.getElementById('qv-volume').innerText = product.volume ? product.volume + 'ml' : '100ml';
  document.getElementById('qv-cat').innerText = product.category || 'Uncategorized';
  document.getElementById('qv-link').href = `product.html?id=${id}`;
  
  // Show modal
  const modal = new bootstrap.Modal(modalEl);
  modal.show();
}

function updateAuthUI() {
  const loginBtn = document.getElementById('login-nav-item');
  if (loginBtn && typeof AuthService !== 'undefined') {
    if (AuthService.isAuthenticated()) {
      loginBtn.innerHTML = '<a class="nav-link" href="admin.html"><i class="fas fa-user-shield"></i> Admin</a>';
    } else {
      loginBtn.innerHTML = '<a class="nav-link" href="login.html"><i class="fas fa-user"></i> Login</a>';
    }
  }
}
