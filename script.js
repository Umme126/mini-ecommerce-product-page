const products = [
    { id: 1, name: "Wireless Headphones", price: 99.99, rating: 4.5, category: "audio", description: "High-quality wireless headphones with premium active noise cancellation and an exceptional 30-hour battery cycle runtime.", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500" },
    { id: 2, name: "Smart Watch Series 5", price: 199.99, rating: 4.7, category: "wearables", description: "Stay connected smoothly with metrics tracking, continuous optical heart monitoring, and an ambient AMOLED array.", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500" },
    { id: 3, name: "Mechanical Gaming Keyboard", price: 79.99, rating: 4.3, category: "electronics", description: "RGB customizable mechanical dynamic deck built for long-term precision key response cycles.", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500" },
    { id: 4, name: "Ergonomic Wireless Mouse", price: 45.50, rating: 4.6, category: "electronics", description: "Precision physical mapping contour profile paired with dynamic tracking speeds.", image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500" },
    { id: 5, name: "Portable Bluetooth Speaker", price: 59.99, rating: 4.4, category: "audio", description: "Waterproof outer shell layer delivering sound clarity across room landscapes.", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500" },
    { id: 6, name: "4K Ultra-Wide Monitor", price: 349.99, rating: 4.8, category: "electronics", description: "Immersive panoramic display giving rich color profiles and expanded window real estate workspace.", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500" },
    { id: 7, name: "Fitness Tracker Band", price: 29.99, rating: 4.1, category: "wearables", description: "Lightweight tracking device evaluating structural calorie burn metrics and sleep timelines.", image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500" },
    { id: 8, name: "Studio Microphone", price: 125.00, rating: 4.6, category: "audio", description: "USB cardioid focus capturing clean digital inputs for podcasts, streams, and tracking voices.", image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500" },
    { id: 9, name: "HD Web Camera Pro", price: 69.99, rating: 4.2, category: "electronics", description: "1080p stream capture engine complete with built-in mic sound tracking sensors.", image: "https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?w=500" },
    { id: 10, name: "Wireless Charging Pad", price: 24.99, rating: 4.0, category: "electronics", description: "High-density energy inductive plate optimized safely for Qi-enabled terminal targets.", image: "https://plus.unsplash.com/premium_photo-1725867721975-bea9a26a20f7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8V2lyZWxlc3MlMjBDaGFyZ2luZyUyMFBhZHxlbnwwfHwwfHx8MA%3D%3D" },
    { id: 11, name: "Noise Isolating Earbuds", price: 49.99, rating: 4.3, category: "audio", description: "Compact micro audio shells providing sound isolate seals for immersive environments.", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500" },
    { id: 12, name: "Premium Leather Watch Band", price: 35.00, rating: 4.5, category: "wearables", description: "Genuine top-grain hide leather tailored cleanly to transition accessories gracefully.", image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=500" }
];

let cart = JSON.parse(localStorage.getItem('techmart_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('techmart_wishlist')) || [];
let searchTerm = '';

window.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartUI();
    updateWishlistUI();
});

function handleSearch() {
    searchTerm = document.getElementById('search-box').value.toLowerCase();
    renderProducts();
}

function showListingView() {
    document.getElementById('listing-view').classList.remove('view-hidden');
    document.getElementById('detail-view').classList.add('view-hidden');
    document.getElementById('wishlist-view').classList.add('view-hidden');
    document.getElementById('cart-view').classList.add('view-hidden');
    window.scrollTo(0,0);
}

function showWishlistView() {
    document.getElementById('listing-view').classList.add('view-hidden');
    document.getElementById('detail-view').classList.add('view-hidden');
    document.getElementById('wishlist-view').classList.remove('view-hidden');
    document.getElementById('cart-view').classList.add('view-hidden');
    renderWishlist();
    window.scrollTo(0,0);
}

function addToWishlist(productId) {
    const product = products.find(p => p.id === productId);
    const exists = wishlist.find(p => p.id === productId);
    
    if (!exists) {
        wishlist.push(product);
        saveWishlist();
        alert('✅ Added to Wishlist!');
    } else {
        alert('⚠️ Already in Wishlist!');
    }
}

function removeFromWishlist(productId) {
    wishlist = wishlist.filter(item => item.id !== productId);
    saveWishlist();
    renderWishlist();
}

function clearWishlist() {
    if (confirm('Clear all wishlist items?')) {
        wishlist = [];
        saveWishlist();
        renderWishlist();
    }
}

function renderWishlist() {
    const container = document.getElementById('wishlist-items-container');
    
    if (wishlist.length === 0) {
        container.innerHTML = `<p style="padding: 3rem 0; text-align:center; color: var(--text-muted); font-size:1.1rem;">Your wishlist is empty. ❤️</p>`;
        return;
    }

    container.innerHTML = '';
    wishlist.forEach(item => {
        const row = document.createElement('div');
        row.className = 'wishlist-item';
        row.innerHTML = `
            <div class="wishlist-item-details">
                <img src="${item.image}" class="wishlist-item-img" alt="${item.name}">
                <div>
                    <h4 style="font-size:1.15rem; margin-bottom:0.25rem; cursor:pointer;" onclick="showDetailView(${item.id})">${item.name}</h4>
                    <p style="color: var(--text-muted); font-size:0.95rem;">$${item.price.toFixed(2)}</p>
                    <div class="product-rating">★ ${item.rating} / 5.0</div>
                </div>
            </div>
            <div class="wishlist-actions">
                <button class="btn" onclick="addToCart(${item.id}, 1)">Add to Cart</button>
                <button class="btn btn-danger" onclick="removeFromWishlist(${item.id})">Remove</button>
            </div>
        `;
        container.appendChild(row);
    });
}

function saveWishlist() {
    localStorage.setItem('techmart_wishlist', JSON.stringify(wishlist));
    updateWishlistUI();
}

function updateWishlistUI() {
    document.getElementById('nav-wishlist-count').innerText = wishlist.length;
}

function showDetailView(productId) {
    document.getElementById('listing-view').classList.add('view-hidden');
    document.getElementById('detail-view').classList.remove('view-hidden');
    document.getElementById('wishlist-view').classList.add('view-hidden');
    document.getElementById('cart-view').classList.add('view-hidden');

    const product = products.find(p => p.id === productId);
    const detailContainer = document.getElementById('detail-page-content');
    window.scrollTo(0,0);
    
    const isInWishlist = wishlist.find(p => p.id === productId);
    
    const relatedProducts = products
        .filter(p => p.id !== productId)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 4);
    
    let relatedHTML = '';
    if (relatedProducts.length > 0) {
        relatedHTML = `
            <div class="related-products">
                <h3>Top Rated Products ⭐</h3>
                <div class="related-grid">
                    ${relatedProducts.map(p => `
                        <div class="related-card" onclick="showDetailView(${p.id})">
                            <img src="${p.image}" alt="${p.name}">
                            <div class="related-card-info">
                                <div class="related-card-name">${p.name}</div>
                                <div class="product-rating">★ ${p.rating}</div>
                                <div class="related-card-price">$${p.price.toFixed(2)}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    detailContainer.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="detail-img">
        <div class="detail-info">
            <h2>${product.name}</h2>
            <div class="product-rating">★ ${product.rating} / 5.0 Rating</div>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <p class="detail-desc">${product.description}</p>
            
            <div class="quantity-selector">
                <label style="font-weight:600;">Select Quantity:</label>
                <button class="qty-btn" onclick="adjustDetailQty(-1)">-</button>
                <input type="number" id="detail-qty" value="1" min="1" class="qty-input" readonly>
                <button class="qty-btn" onclick="adjustDetailQty(1)">+</button>
            </div>

            <div style="display: flex; gap: 0.8rem; flex-wrap: wrap;">
                <button class="btn" style="width: calc(50% - 0.4rem); padding: 1rem; font-size:1rem;" onclick="addDetailToCart(${product.id})">🛒 Add To Cart</button>
                <button class="btn ${isInWishlist ? 'btn-danger' : 'btn-heart'}" style="width: calc(50% - 0.4rem); padding: 1rem; font-size:1rem;" onclick="${isInWishlist ? `removeFromWishlist(${product.id})` : `addToWishlist(${product.id})`}">
                    ${isInWishlist ? '💔 Remove' : '❤️ Wishlist'}
                </button>
            </div>
        </div>
    `;
    
    detailContainer.innerHTML += relatedHTML;
}

function showCartView() {
    document.getElementById('listing-view').classList.add('view-hidden');
    document.getElementById('detail-view').classList.add('view-hidden');
    document.getElementById('wishlist-view').classList.add('view-hidden');
    document.getElementById('cart-view').classList.remove('view-hidden');
    renderCartPage();
    window.scrollTo(0,0);
}

function renderProducts() {
    const grid = document.getElementById('product-grid');
    const category = document.getElementById('category-filter').value;
    const sortOrder = document.getElementById('price-sort').value;

    let filtered = products.filter(p => 
        (category === 'all' || p.category === category) &&
        (p.name.toLowerCase().includes(searchTerm) || p.description.toLowerCase().includes(searchTerm))
    );

    if (sortOrder === 'low-high') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'high-low') {
        filtered.sort((a, b) => b.price - a.price);
    }

    grid.innerHTML = '';
    if (filtered.length === 0) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 3rem;">No products found. 🔍</p>`;
        return;
    }

    filtered.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        const isInWishlist = wishlist.find(p => p.id === product.id);
        
        card.onclick = (e) => {
            if(!e.target.classList.contains('btn')) showDetailView(product.id);
        };
        
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-rating">★ ${product.rating}</div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                    <button class="btn" style="flex: 1; padding: 0.6rem;" onclick="addToCart(${product.id}, 1)">🛒 Add</button>
                    <button class="btn ${isInWishlist ? 'btn-danger' : 'btn-heart'}" style="flex: 0.6;" onclick="event.stopPropagation(); ${isInWishlist ? `removeFromWishlist(${product.id})` : `addToWishlist(${product.id})`}" title="Wishlist">❤️</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function addToCart(productId, quantity) {
    const parsedQty = parseInt(quantity);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += parsedQty;
    } else {
        const product = products.find(p => p.id === productId);
        cart.push({ ...product, quantity: parsedQty });
    }
    saveCart();
}

function adjustDetailQty(amount) {
    const qtyInput = document.getElementById('detail-qty');
    let current = parseInt(qtyInput.value);
    if (current + amount >= 1) qtyInput.value = current + amount;
}

function addDetailToCart(productId) {
    const qty = document.getElementById('detail-qty').value;
    addToCart(productId, qty);
    showCartView();
}

function updateQuantity(productId, newQty) {
    const qty = parseInt(newQty);
    if (qty <= 0 || isNaN(qty)) {
        removeFromCart(productId);
        return;
    }
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = qty;
        saveCart();
        renderCartPage();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    renderCartPage();
}

function clearCart() {
    cart = [];
    saveCart();
    renderCartPage();
}

function saveCart() {
    localStorage.setItem('techmart_cart', JSON.stringify(cart));
    updateCartUI();
}

function updateCartUI() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    document.getElementById('nav-cart-count').innerText = totalCount;
    document.getElementById('nav-cart-total').innerText = totalPrice.toFixed(2);
}

function renderCartPage() {
    const container = document.getElementById('cart-items-container');
    const totalSpan = document.getElementById('cart-page-total');
    
    if (cart.length === 0) {
        container.innerHTML = `<p style="padding: 3rem 0; text-align:center; color: var(--text-muted); font-size:1.1rem;">Your shopping cart is empty.</p>`;
        totalSpan.innerText = "0.00";
        return;
    }

    container.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        const row = document.createElement('div');
        row.className = 'cart-item';
        row.innerHTML = `
            <div class="cart-item-details">
                <img src="${item.image}" class="cart-item-img" alt="${item.name}">
                <div>
                    <h4 style="font-size:1.15rem; margin-bottom:0.25rem;">${item.name}</h4>
                    <p style="color: var(--text-muted); font-size:0.95rem;">$${item.price.toFixed(2)} each</p>
                </div>
            </div>
            <div style="display: flex; align-items: center; gap: 1.5rem;">
                <input type="number" class="qty-input" value="${item.quantity}" min="1" 
                    onchange="updateQuantity(${item.id}, this.value)">
                <button class="btn btn-danger" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
        container.appendChild(row);
    });

    totalSpan.innerText = total.toFixed(2);
}