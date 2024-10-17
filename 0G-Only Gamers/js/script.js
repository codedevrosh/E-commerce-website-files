// Array to hold cart items
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count in the navbar
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cart.length;
    }
}

// Add product to the cart
function addToCart(productId) {
    const productElement = document.querySelector(`.product[data-id="${productId}"]`);
    const productName = productElement.getAttribute('data-name');
    const productPrice = parseFloat(productElement.getAttribute('data-price'));
    const productImage = productElement.getAttribute('data-image');

    // Create a product object
    const product = {
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage // Include image URL
    };

    // Add product to cart array
    cart.push(product);

    // Save cart to local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart count in navbar
    updateCartCount();

    alert(`${productName} has been added to your cart!`);
}

// Display cart items on the cart page
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Clear previous items

    let totalPrice = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        document.getElementById('total-price').textContent = totalPrice.toFixed(2);
        return;
    }

    // Loop through cart items and create HTML
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h3>${item.name}</h3>
                <p>$${item.price.toFixed(2)}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;

        cartItemsContainer.appendChild(cartItem);
        totalPrice += item.price;
    });

    // Update total price
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);

    // Update local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart count and refresh cart display
    updateCartCount();
    displayCartItems();
}

// Initialize the cart page
if (window.location.pathname.includes('cart.html')) {
    displayCartItems();
}

// Update cart count on all pages
updateCartCount();


// Wait for 3 seconds and then show the main content
window.onload = function() {
    setTimeout(function() {
        // Hide the loading screen
        document.getElementById('loading-screen').style.display = 'none';
        // Show the main content
        document.getElementById('main-content').style.display = 'block';
    }, 3000); // 3000 milliseconds = 3 seconds
};

window.onload = function() {
    setTimeout(function() {
        // Add a fade-out animation to the loading screen
        document.getElementById('loading-screen').style.animation = 'fadeOut 1s forwards';

        // Hide the loading screen completely after the fade-out animation ends
        setTimeout(function() {
            document.getElementById('loading-screen').style.display = 'none';
            // Show the main content
            document.getElementById('main-content').style.display = 'block';
        }, 1000); // 1 second to match the animation duration
    }, 3000); // 3 seconds delay before starting the fade-out
};

