const restaurantMenus = {
    restaurant1: [
        { id: 1, name: "Plain dosa", price: 10, img: "images/plaindosa.jpg" },
        { id: 2, name: "Egg dosa", price: 15, img: "images/eggdosa.jpg" },
        { id: 3, name: "Masala dosa", price: 10, img: "images/masaladosa.jpg" },
        { id: 4, name: "Uthappam", price: 10, img: "images/uthappam.jpg" },
        { id: 5, name: "Rava dosa", price: 10, img: "images/ravadosa.jpg" },
    ],
    restaurant2: [
        { id: 6, name: "Idly", price: 20, img: "images/idly.jpg" },
        { id: 7, name: "Podi idly", price: 12, img: "images/podiidly.jpg" },
        { id: 8, name: "Sambar idly", price: 10, img: "images/sambaridly.jpg" },
    ],
    restaurant3: [
        { id: 9, name: "Veg meal", price: 12, img: "images/vegmeal.jpg" },
        { id: 10, name: "Nonveg Meal", price: 8, img: "images/nonvegmeal.jpg" },
    ],
};

// Function to display menu items for the selected restaurant
function displayMenu(restaurant) {
    const menuContainer = document.getElementById('menu-items');
    menuContainer.innerHTML = ''; // Clear previous items
    const menuItems = restaurantMenus[restaurant];

    menuItems.forEach(item => {
        const div = document.createElement('div');
        div.className = 'menu-item';
        div.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div>
                <h3>${item.name}</h3>
                <p>Price: $${item.price}</p>
                <button id="add-to-cart-${item.id}" onclick="addToOrder(${item.id})">Add to Cart</button>
                <div class="feedback-section">
                    <label for="rating-${item.id}">Rating:</label>
                    <select id="rating-${item.id}">
                        <option value="0">Select Rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <input type="text" id="feedback-${item.id}" placeholder="Leave a comment">
                    <button onclick="submitFeedback(${item.id})">Submit Feedback</button>
                    <div id="feedback-list-${item.id}"></div>
                </div>
            </div>
        `;
        menuContainer.appendChild(div);
    });
}

// Initialize user info and check login
function initUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    const userInfoDiv = document.getElementById('user-info');

    if (user) {
        userInfoDiv.innerHTML = `Welcome, ${user.name} (${user.phone})`;
        enableAddToCartButtons();
        displayMenu(document.getElementById('restaurant-select').value); // Load default restaurant
    } else {
        window.location.href = 'login.html';
    }
}

// Function to enable "Add to Cart" buttons
function enableAddToCartButtons() {
    const buttons = document.querySelectorAll('button[id^="add-to-cart-"]');
    buttons.forEach(button => {
        button.disabled = false;
    });
}

// Order array
let order = [];

// Function to add item to order
function addToOrder(id) {
    const restaurant = document.getElementById('restaurant-select').value;
    const item = restaurantMenus[restaurant].find(item => item.id === id);
    order.push(item);
    updateOrderSummary();
}

// Function to update order summary
function updateOrderSummary() {
    const orderContainer = document.getElementById('order-summary');
    orderContainer.innerHTML = ''; // Clear current order
    let total = 0;

    order.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = `${item.name} - $${item.price}`;
        orderContainer.appendChild(div);
        total += item.price;
    });

    const totalDiv = document.createElement('div');
    totalDiv.innerHTML = `<strong>Total: $${total}</strong>`;
    orderContainer.appendChild(totalDiv);

    // Enable the place order button if there are items in the order
    document.getElementById('place-order').disabled = order.length === 0;
}

// Function to handle order placement
document.getElementById('place-order').onclick = function() {
    const address = document.getElementById('delivery-address').value;
    const discountCode = document.getElementById('discount-code').value;
    
    if (order.length > 0) {
        if (address) {
            let total = order.reduce((sum, item) => sum + item.price, 0);
            if (discountCode === "DISCOUNT10") {
                total *= 0.9; // Apply a 10% discount
                alert('Discount applied: 10% off!');
            }

            alert(`Order placed successfully!\nDelivery Address: ${address}\nTotal Amount: $${total.toFixed(2)}`);
            order = []; // Reset order
            document.getElementById('delivery-address').value = ''; // Clear address field
            document.getElementById('discount-code').value = ''; // Clear discount field
            updateOrderSummary();

            // Show the feedback section
            document.getElementById('feedback-section').style.display = 'block';
        } else {
            alert('Please enter a delivery address.');
        }
    } else {
        alert('Your order is empty!');
    }
};

// Function to submit feedback
function submitFeedback(itemId) {
    const rating = document.getElementById(`rating-${itemId}`).value;
    const feedback = document.getElementById(`feedback-${itemId}`).value;
    const feedbackList = document.getElementById(`feedback-list-${itemId}`);

    if (rating === "0") {
        alert('Please select a rating.');
        return;
    }

    const feedbackItem = document.createElement('div');
    feedbackItem.innerHTML = `<strong>Rating: ${rating}</strong> - ${feedback}`;
    feedbackList.appendChild(feedbackItem);

    // Clear input fields
    document.getElementById(`rating-${itemId}`).value = "0";
    document.getElementById(`feedback-${itemId}`).value = '';
}

// Event listener for restaurant selection
document.getElementById('restaurant-select').addEventListener('change', function() {
    displayMenu(this.value);
});

// Initial call to check user and load menu
initUser();
