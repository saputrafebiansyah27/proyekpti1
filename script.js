// Wishlist functionality with localStorage
document.querySelectorAll('.add-to-wishlist').forEach(button => {
    button.addEventListener('click', () => {
        const productName = button.getAttribute('data-product');
        let wishlist = JSON.parse(localStorage.getItem('ganeshaWishlist')) || [];

        if (!wishlist.includes(productName)) {
            wishlist.push(productName);
            localStorage.setItem('ganeshaWishlist', JSON.stringify(wishlist));
            alert(`${productName} telah ditambahkan ke wishlist!`);
        } else {
            alert(`${productName} sudah ada di wishlist!`);
        }
    });
});

// Add to cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productName = button.getAttribute('data-product');
        const productPrice = button.getAttribute('data-price');
        let cart = JSON.parse(localStorage.getItem('ganeshaCart')) || [];

        // Check if product already in cart
        const existingProduct = cart.find(item => item.name === productName);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ name: productName, price: productPrice, quantity: 1 });
        }

        localStorage.setItem('ganeshaCart', JSON.stringify(cart));
        updateCartCounter();
        alert(`${productName} telah ditambahkan ke keranjang!`);
    });
});

// Buy now functionality - redirect to payment page
document.querySelectorAll('.buy-now').forEach(button => {
    button.addEventListener('click', () => {
        const productName = button.getAttribute('data-product');
        // Store the selected product for immediate purchase
        localStorage.setItem('immediatePurchase', JSON.stringify({ name: productName }));
        window.location.href = 'payment.html';
    });
});

// Function to update cart counter in header
function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem('ganeshaCart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    let cartCounter = document.getElementById('cart-counter');
    if (!cartCounter) {
        // Create cart counter if it doesn't exist
        cartCounter = document.createElement('span');
        cartCounter.id = 'cart-counter';
        cartCounter.style.cssText = `
            background-color: var(--accent-red);
            color: white;
            border-radius: 50%;
            padding: 2px 6px;
            font-size: 0.8rem;
            margin-left: 5px;
        `;
        document.querySelector('header .logo').appendChild(cartCounter);
    }

    if (totalItems > 0) {
        cartCounter.textContent = totalItems;
        cartCounter.style.display = 'inline-block';
    } else {
        cartCounter.style.display = 'none';
    }
}

// Initialize cart counter on page load
updateCartCounter();
