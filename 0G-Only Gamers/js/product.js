
// Sample product data
const products = {
    product1: {
        title: 'God of War 4',
        image: '/images/game1.jpg',
        reviews: [
            'Great game! - 5 stars',
            'Had a lot of fun playing it. - 4 stars',
            'Would recommend to friends! - 5 stars',
        ],
        about: 'Kratos, the God of War, has defeated the Gods of Olympus and has started his life anew...',
        genres: ["Exciting gameplay", "Stunning graphics", "Action-Adventure", "Role-Playing Game (RPG) Elements"],
        price: 2500.00
    },
    product2: {
        title: 'Grand Theft Auto 5',
        image: '/images/game2.jpeg',
        reviews: [
            "Amazing open world and story! - 5 stars",
            "Endless activities and great multiplayer. - 4 stars",
            "One of the best games I've ever played! - 5 stars"
        ],
        about: 'GTA 5 is an action-adventure game set in an expansive open world where players can switch between three protagonists to experience a thrilling crime-filled storyline. The game offers a mix of heists, missions, and chaotic free-roaming activities across Los Santos...',
        genres: ["Crime and Heist Simulation", "Multiplayer Online Mode", "Open World Exploration", "Stunning Graphics"],
        price: 4000.00
    },
    product3: {
        title: 'Red Dead Redemption 2',
        image: '/images/game3.jpeg',
        reviews: [
            "Incredible world-building and story! - 5 stars",
            "Feels like living in the Wild West. - 5 stars",
            "Stunning attention to detail, highly recommend! - 4.5 stars"
        ],
        about: 'Red Dead Redemption 2 is a gripping action-adventure game set in an expansive open-world environment during the late 1800s. Players take on the role of Arthur Morgan, an outlaw in the declining days of the Wild West, navigating a complex narrative filled with emotional depth, engaging characters, and moral dilemmas...',
        genres: ["Western Setting", "Stunning graphics", "Dynamic Storytelling", "Immersive Open World"],
        price: 3000.00
    },
    product4: {
        title: 'Call Of Duty',
        image: '/images/slides/game4.jpg',
        reviews: [
            "Intense and addictive multiplayer action! - 5 stars",
            "Great campaign with amazing graphics. - 4.5 stars",
            "Fast-paced and thrilling, especially with friends! - 5 stars"
        ],
        about: 'Call of Duty is a fast-paced first-person shooter series that immerses players in intense military warfare scenarios. Known for its gripping single-player campaigns and highly competitive multiplayer modes, the franchise delivers action-packed combat in a variety of settings, from historical conflicts to futuristic battlegrounds....',
        genres: ["Multiplayer Competitive Mode", "Military Warfare", "First-Person Shooter (FPS)", "Fast-Paced Action"],
        price: 3500.00
    },
    product5: {
        title: 'Assassins Creed',
        image: '/images/slides/game5.jpg',
        reviews: [
            'Amazing graphics! - 5 stars',
            'Could use more levels. - 3 stars',
            'Loved every moment! - 4 stars',
        ],
        about: 'Assassins Creed is an action-adventure series that blends historical settings with stealth and open-world exploration. Players take on the role of Assassins through various eras, using parkour, combat skills, and stealth tactics to take down targets and uncover hidden mysteries. Known for its detailed historical worlds...',
        genres: ["Historical Settings", "Parkour and Free-Running Mechanics", "Open World Exploration", "Role-Playing Game (RPG) Elements"],
        price: 2000.00
    },
    product6: {
        title: 'Far Cry 3',
        image: '/images/slides/game6.jpg',
        reviews: [
            "Incredible story with a thrilling open world! - 5 stars",
            "The perfect blend of exploration, combat, and survival. - 4.5 stars",
            "Vaas is one of the best villains ever! - 5 stars"
        ],
        about: 'Far Cry 3 is an open-world first-person shooter set on a dangerous tropical island, where players must survive against hostile forces and wildlife. As Jason Brody, you embark on a journey of survival, exploring the island, taking down enemy outposts, and battling the charismatic villain Vaas...',
        genres: ["Tactical Combat", "Stunning graphics", "Open World Exploration", "Role-Playing Game (RPG) Elements"],
        price: 3200.00
    },
    product7: {
        title: 'Witcher 3: Wild Hunt:',
        image: '/images/slides/game7.jpg',
        reviews: [
            "One of the best RPGs ever made! - 5 stars",
            "Stunning world and deeply engaging story. - 5 stars",
            "Amazing characters, choices, and gameplay. - 4.5 stars",
        ],
        about: 'The Witcher 3: Wild Hunt is a critically acclaimed action-RPG set in a vast, beautifully crafted open world. Players step into the boots of Geralt of Rivia, a monster hunter, as he embarks on an epic journey filled with complex quests, morally ambiguous choices, and deep character interactions....',
        genres: ["Exciting gameplay", "Mature Themes and Choices", "Monster Hunting and Crafting", "Role-Playing Game (RPG) Elements"],
        price: 4500.00
    }
};

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

// Function to open modal
function openModal(productId) {
    const product = products[productId];

    document.getElementById('modal-title').innerText = product.title;
    document.getElementById('modal-image').src = product.image;
    document.getElementById('modal-reviews').innerHTML = product.reviews.map(review => `<p>${review}</p>`).join('');
    document.getElementById('modal-about').innerText = product.about;
    document.getElementById('modal-genres').innerHTML = product.genres.map(genre => `<p>${genre}</p>`).join('');
    document.getElementById('modal-price').innerHTML = `<strong>Price: ₹${product.price ? product.price.toFixed(2) : 'N/A'}</strong>`; // Display price with fallback
    
    document.getElementById('add-to-cart').setAttribute('data-product-id', productId);

    document.getElementById('product-modal').style.display = "block";
}

// Add to cart functionality
function addToCart() {
    const productId = document.getElementById('add-to-cart').getAttribute('data-product-id');
    const product = products[productId];
    
    cart.push(product);
    alert(`${product.title} has been added to your cart!`);
    
    updateCart(); // Update cart UI
    saveCart();   // Save to local storage
}

// Update the cart display
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Clear previous cart items

    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    }

    cart.forEach((product, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        
        // Add product image
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

        // Safely handle product price
        const priceElement = document.createElement('p');
        const price = parseFloat(product.price);
        if (!isNaN(price)) {
            priceElement.innerText = `₹${price.toFixed(2)}`;
            total += price;
        } else {
            priceElement.innerText = 'Price not available';
        }
        cartItem.appendChild(priceElement);
        
        // Add remove button
        const removeBtn = document.createElement('button');
        removeBtn.innerText = 'Remove';
        removeBtn.onclick = () => removeFromCart(index);
        cartItem.appendChild(removeBtn);
        
        cartItemsContainer.appendChild(cartItem);
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
document.addEventListener('DOMContentLoaded', loadCart);

// Function to close modal
function closeModal() {
    document.getElementById('product-modal').style.display = "none";
}

// Add event listener to close modal when clicking outside of the modal content
window.onclick = function(event) {
    const modal = document.getElementById('product-modal');
    if (event.target === modal) {
        closeModal();
    }
};



let currentSlide = 0;

function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    // Remove the 'active' class from the current slide
    slides[currentSlide].classList.remove('active');
    
    // Calculate the new slide index
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    
    // Add the 'active' class to the new slide
    slides[currentSlide].classList.add('active');
}

// Initially set the first slide as active
document.querySelectorAll('.slide')[currentSlide].classList.add('active');

// Event listeners for navigation buttons
document.querySelector('.prev').addEventListener('click', function() {
    changeSlide(-1);
});

document.querySelector('.next').addEventListener('click', function() {
    changeSlide(1);
});


