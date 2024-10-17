// Cart Array
let cart = [];

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

// Update the cart display
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Clear previous cart items

    let total = 0;

    if (cart.length === 0) {
        // Show a message if the cart is empty
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    }

    cart.forEach((product, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        
        // Add product image (check if image exists)
        if (product.image) {
            const img = document.createElement('img');
            img.src = product.image;
            img.alt = product.title;
            img.style.width = '50px';
            cartItem.appendChild(img);
        }

        // Add product title
        const title = document.createElement('p');
        title.innerText = product.title;
        cartItem.appendChild(title);

        // Add product price (check if price exists)
        if (product.price) {
            const price = document.createElement('p');
            price.innerText = `$${product.price.toFixed(2)}`;
            cartItem.appendChild(price);
        }

        // Add remove button
        const removeBtn = document.createElement('button');
        removeBtn.innerText = 'Remove';
        removeBtn.onclick = () => removeFromCart(index);
        cartItem.appendChild(removeBtn);

        cartItemsContainer.appendChild(cartItem);

        // Update total price
        total += product.price || 0; // Ensure price exists before adding
    });

    // Update total price display
    document.getElementById('cart-total').innerText = `Total: ₹${total.toFixed(2)}`;
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1); // Remove item from the cart
    updateCart(); // Update the cart display after removal
    saveCart();   // Update localStorage
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load the cart when the page loads
window.onload = loadCart;

