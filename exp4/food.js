const restaurantMenus = {
    restaurant1: [
        { id: 1, name: "Plain dosa", price: 10, img: "images/plaindosa.jpg" },
        { id: 2, name: "Egg dosa", price: 15, img: "images/eggdosa.jpg" },
        { id: 3, name: "Masala dosa", price: 10, img: "images/masaladosa.jpg" },
        { id: 4, name: "Uthappam", price: 10, img: "images/uthappam.jpg" },
        { id: 5, name: "Rava dosa", price: 10, img: "images/ravadosa.jpg" },
        { id: 6, name: "Pongal", price: 12, img: "images/pongal.jpg" },
    ],
    restaurant2: [
        { id: 7, name: "Idly", price: 20, img: "images/idly.jpg" },
        { id: 8, name: "Podi idly", price: 12, img: "images/podiidly.jpg" },
        { id: 9, name: "Sambar idly", price: 10, img: "images/sambaridly.jpg" },
        { id: 10, name: "Rava Idly", price: 15, img: "images/ravaidly.jpg" },
    ],
    restaurant3: [
        { id: 11, name: "Veg meal", price: 12, img: "images/vegmeal.jpg" },
        { id: 12, name: "Nonveg Meal", price: 8, img: "images/nonvegmeal.jpg" },
        { id: 13, name: "Chicken Biriyani", price: 20, img: "images/chickenbiriyani.jpg" },
        { id: 14, name: "Mutton Biryani", price: 25, img: "images/muttonbiriyani.jpg" },
        { id: 15, name: "Egg Biriyani", price: 25, img: "images/eggbiriyani.jpg" },
    ],
    restaurant4: [
        { id: 16, name: "Veg Fried Rice", price: 20, img: "images/vegrice.jpg" },
        { id: 17, name: "Egg Fried Rice", price: 22, img: "images/eggrice.jpg" },
        { id: 18, name: "Chicken Fried Rice", price: 25, img: "images/chickenrice.jpg" },
        { id: 19, name: "Paneer Fried Rice", price: 35, img: "images/paneerrice.jpg" },
    ],
};

// Function to display menu items for the selected restaurant
function displayMenu(restaurant) {
    const menuContainer = document.getElementById('menu-items');
    menuContainer.innerHTML = ''; // Clear previous items
    const menuItems = restaurantMenus[restaurant];

    if (menuItems) {
        menuItems.forEach(item => {
            const div = document.createElement('div');
            div.className = 'menu-item';
            div.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <div>
                    <h3>${item.name}</h3>
                    <p>Price: ₹${item.price}</p> <!-- Changed $ to ₹ -->
                    <button id="add-to-cart-${item.id}" onclick="addToOrder(${item.id})">Add to Cart</button>
                </div>
            `;
            menuContainer.appendChild(div);
        });
    } else {
        menuContainer.innerHTML = '<p>No menu items available.</p>';
    }
}

// Function to update order summary
function updateOrderSummary() {
    const orderContainer = document.getElementById('order-summary');
    orderContainer.innerHTML = ''; // Clear current order
    let total = 0;

    order.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = `${item.name} - ₹${item.price}`; // Changed $ to ₹
        orderContainer.appendChild(div);
        total += item.price;
    });

    const totalDiv = document.createElement('div');
    totalDiv.innerHTML = `<strong>Total: ₹${total}</strong>`; // Changed $ to ₹
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

            alert(`Order placed successfully!\nDelivery Address: ${address}\nTotal Amount: ₹${total.toFixed(2)}`); // Changed $ to ₹
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

// Event listener for restaurant selection
document.getElementById('restaurant-select').addEventListener('change', function() {
    displayMenu(this.value);
});

// Initial call to check user and load menu
initUser();
