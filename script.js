// Shopping Cart Data
let cart = [];

// Update Cart Count
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

// Add to Cart
function addToCart(productId, productName, productPrice) {
    const existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
    }
    updateCartCount();
    saveCart();
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    saveCart();
}

// Update Cart
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    if (!cartItems) return;

    cartItems.innerHTML = '';
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <h3>${item.name}</h3>
            <p>Unit Price: $${item.price}</p>
            <p>Total: $${item.price * item.quantity}</p>
            <p>Quantity: ${item.quantity}</p>
            <button onclick="removeFromCart(${item.id})">Delete</button>
        `;
        cartItems.appendChild(cartItem);
    });
}

// Save Cart to Local Storage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load Cart from Local Storage
function loadCart() {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
        cart = savedCart;
        updateCart();
        updateCartCount();
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function () {
    loadCart();

    // Add to Cart Event Listeners
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const productCard = this.parentElement;
            const productId = parseInt(productCard.getAttribute('data-id'));
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = parseInt(productCard.querySelector('p').textContent.slice(1));
            addToCart(productId, productName, productPrice);
        });
    });
});
