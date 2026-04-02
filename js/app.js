// Smart Fruit Store - Application Logic

// Product Data
const products = [
    {
        id: 1,
        name: "Organic Red Fuji Apple",
        supplier: "Green Valley Farm",
        category: "organic",
        price: 2.5,
        stock: 150,
        image: "🍎",
        description: "Organic certified Red Fuji apples from Yantai, sweet and crispy"
    },
    {
        id: 2,
        name: "Imported Banana",
        supplier: "Tropical Orchard",
        category: "imported",
        price: 1.8,
        stock: 200,
        image: "🍌",
        description: "Philippine imported bananas, naturally ripened, sweet and soft"
    },
    {
        id: 3,
        name: "Fresh Strawberry",
        supplier: "Strawberry Manor",
        category: "seasonal",
        price: 5.0,
        stock: 80,
        image: "🍓",
        description: "Fresh seasonal strawberries, picked and shipped daily"
    },
    {
        id: 4,
        name: "Kyoho Grape",
        supplier: "Vineyard Direct",
        category: "seasonal",
        price: 3.5,
        stock: 120,
        image: "🍇",
        description: "Premium Kyoho grapes, plump and juicy"
    },
    {
        id: 5,
        name: "Hainan Mango",
        supplier: "Tropical Orchard",
        category: "imported",
        price: 4.2,
        stock: 95,
        image: "🥭",
        description: "Hainan Sanya mangoes, delicate flesh, rich aroma"
    },
    {
        id: 6,
        name: "Sunkist Orange",
        supplier: "Import Select",
        category: "imported",
        price: 3.0,
        stock: 180,
        image: "🍊",
        description: "US Sunkist oranges, rich in Vitamin C, balanced sweet-tart"
    },
    {
        id: 7,
        name: "Organic Kiwi",
        supplier: "Green Valley Farm",
        category: "organic",
        price: 4.5,
        stock: 60,
        image: "🥝",
        description: "New Zealand variety organic kiwi, nutrient-rich"
    },
    {
        id: 8,
        name: "Peach Gift Box",
        supplier: "Peach Garden Estate",
        category: "gift",
        price: 15.0,
        stock: 30,
        image: "🍑",
        description: "Premium selected peaches in gift box, perfect for gifting"
    },
    {
        id: 9,
        name: "Pineapple",
        supplier: "Tropical Orchard",
        category: "imported",
        price: 2.8,
        stock: 100,
        image: "🍍",
        description: "Taiwan variety pineapple, sweet and juicy, fine fibers"
    },
    {
        id: 10,
        name: "Watermelon",
        supplier: "Melon Field Direct",
        category: "seasonal",
        price: 6.0,
        stock: 50,
        image: "🍉",
        description: "Seasonal watermelon, thin skin, thick flesh, refreshing sweet"
    },
    {
        id: 11,
        name: "Cherry Gift Box",
        supplier: "Cherry Orchard",
        category: "gift",
        price: 25.0,
        stock: 25,
        image: "🍒",
        description: "Imported cherries in gift box, hand-selected"
    },
    {
        id: 12,
        name: "Lemon",
        supplier: "Green Valley Farm",
        category: "organic",
        price: 1.5,
        stock: 200,
        image: "🍋",
        description: "Organic lemons, rich aroma, high in Vitamin C"
    }
];

// Shopping Cart
let cart = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    renderProducts();
    updateCartDisplay();
    setupEventListeners();
    loadContractInfo();
    loadProducts();
});

// Render Products
function renderProducts(filter = 'all') {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    
    let filteredProducts = products;
    
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    if (category && category !== 'all') {
        filteredProducts = products.filter(p => p.category === category);
    }
    
    grid.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <div class="product-image" onclick="viewProduct(${product.id})">${product.image}</div>
            <div class="product-info">
                <div class="product-category">${getCategoryName(product.category)}</div>
                <h3 class="product-name" onclick="viewProduct(${product.id})">${product.name}</h3>
                <p class="product-supplier">${product.supplier}</p>
                <div class="product-footer">
                    <span class="product-price">${product.price.toFixed(1)} FRT</span>
                    <span class="product-stock ${product.stock < 50 ? 'stock-low' : ''}">
                        ${product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
                    </span>
                </div>
                <div class="product-actions">
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                        🛒 Add to Cart
                    </button>
                    <button class="buy-now-btn" onclick="buyNow(${product.id})">
                        ⚡ Buy Now
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Get Category Name
function getCategoryName(category) {
    const names = {
        'all': 'All',
        'seasonal': 'Seasonal Fruits',
        'organic': 'Organic Fruits',
        'imported': 'Imported Fruits',
        'gift': 'Gift Boxes'
    };
    return names[category] || category;
}

// View Product Details
function viewProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    alert(`Product Details:\n\n${product.name}\n${product.description}\nPrice: ${product.price} FRT\nStock: ${product.stock} items\nSupplier: ${product.supplier}`);
}

// Search Products
function searchProducts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const grid = document.getElementById('productsGrid');
    
    if (!query) {
        renderProducts();
        return;
    }
    
    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.supplier.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );
    
    grid.innerHTML = filtered.map(product => `
        <div class="product-card">
            <div class="product-image">${product.image}</div>
            <div class="product-info">
                <div class="product-category">${getCategoryName(product.category)}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-supplier">${product.supplier}</p>
                <div class="product-footer">
                    <span class="product-price">${product.price.toFixed(1)} FRT</span>
                    <span class="product-stock ${product.stock < 50 ? 'stock-low' : ''}">
                        ${product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
                    </span>
                </div>
                <div class="product-actions">
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
                    <button class="buy-now-btn" onclick="buyNow(${product.id})">Buy Now</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Toggle Cart
function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
}

// Buy Now
function buyNow(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity
        });
    }
    
    saveCart();
    updateCartDisplay();
    
    window.location.href = 'checkout.html';
}

// Add to Cart
function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity
        });
    }
    
    saveCart();
    updateCartDisplay();
    
    showNotification(`Added ${product.name} to cart`);
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartDisplay();
}

// Update Quantity
function updateQuantity(productId, delta) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += delta;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        saveCart();
        updateCartDisplay();
    }
}

// Update Cart Display
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    const cartFee = document.getElementById('cartFee');
    const cartGrandTotal = document.getElementById('cartGrandTotal');
    
    if (!cartItems) return;
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">${item.image}</div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.price.toFixed(2)} FRT</div>
                    <div class="cart-item-quantity">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const gasFee = subtotal * 0.1;
    const grandTotal = subtotal + gasFee;
    
    if (cartTotal) {
        cartTotal.textContent = `${subtotal.toFixed(2)} FRT`;
    }
    if (cartFee) {
        cartFee.textContent = `${gasFee.toFixed(2)} FRT`;
    }
    if (cartGrandTotal) {
        cartGrandTotal.textContent = `${grandTotal.toFixed(2)} FRT`;
    }
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if (typeof executePurchase === 'function') {
        executePurchase(cart, total);
    } else {
        alert(`Order Total: ${total.toFixed(2)} FRT\n\nIn production, this will call the smart contract to complete payment.`);
    }
}

// Save Cart
function saveCart() {
    localStorage.setItem('fruitStoreCart', JSON.stringify(cart));
}

// Load Cart
function loadCart() {
    const saved = localStorage.getItem('fruitStoreCart');
    if (saved) {
        try {
            cart = JSON.parse(saved);
        } catch (e) {
            cart = [];
        }
    }
}

// Save Products
function saveProducts() {
    try {
        localStorage.setItem('fruitStoreProducts', JSON.stringify(products));
        console.log('Product data saved');
    } catch (error) {
        console.error('Failed to save product data:', error);
    }
}

// Load Products
function loadProducts() {
    try {
        const saved = localStorage.getItem('fruitStoreProducts');
        if (saved) {
            const loadedProducts = JSON.parse(saved);
            loadedProducts.forEach(loaded => {
                const existing = products.find(p => p.id === loaded.id);
                if (existing) {
                    existing.stock = loaded.stock;
                }
            });
            console.log('Product data loaded');
        }
    } catch (error) {
        console.error('Failed to load product data:', error);
    }
}

// Setup Event Listeners
function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchProducts();
            }
        });
    }
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            e.target.classList.add('active');
        });
    });
}

// Show Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Load Contract Info
function loadContractInfo() {
    const contractLink = document.getElementById('contractAddress');
    if (contractLink) {
        contractLink.href = '#';
        contractLink.textContent = '0xDC605ba6B29321F50e49966B0e9A4770FAc00058 (Testnet)';
    }
}

// Add Animation Styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
