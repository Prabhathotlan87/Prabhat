const restaurantMenus = {
    restaurant1: [
        { id: 1, name: "Plain dosa", price: 45, img: "images/plaindosa.jpg" },
        { id: 2, name: "Egg dosa", price: 50, img: "images/eggdosa.jpg" },
        { id: 3, name: "Masala dosa", price: 50, img: "images/masaladosa.jpg" },
        { id: 4, name: "Uthappam", price: 55, img: "images/uthappam.jpg" },
        { id: 5, name: "Rava dosa", price: 60, img: "images/ravadosa.jpg" },
        { id: 6, name: "Pongal", price: 40, img: "images/pongal.jpg" },
    ],
    restaurant2: [
        { id: 7, name: "Idly", price: 30, img: "images/idly.jpg" },
        { id: 8, name: "Podi idly", price: 40, img: "images/podiidly.jpg" },
        { id: 9, name: "Sambar idly", price: 40, img: "images/sambaridly.jpg" },
        { id: 10, name: "Rava Idly", price: 50, img: "images/ravaidly.jpg" },
    ],
    restaurant3: [
        { id: 11, name: "Veg meal", price: 80, img: "images/vegmeal.jpg" },
        { id: 12, name: "Nonveg Meal", price: 500, img: "images/nonvegmeal.jpg" },
        { id: 13, name: "Chicken Biriyani", price: 200, img: "images/chickenbiriyani.jpg" },
        { id: 14, name: "Mutton Biryani", price: 250, img: "images/muttonbiriyani.jpg" },
        { id: 15, name: "Egg Biriyani", price: 200, img: "images/eggbiriyani.jpg" },
    ],
    restaurant4: [
        { id: 16, name: "Veg Fried Rice", price: 90, img: "images/vegrice.jpg" },
        { id: 17, name: "Egg Fried Rice", price: 80, img: "images/eggrice.jpg" },
        { id: 18, name: "Chicken Fried Rice", price: 90, img: "images/chickenrice.jpg" },
        { id: 19, name: "Paneer Fried Rice", price: 200, img: "images/paneerrice.jpg" },
    ],
};

// Array to hold cart items
let order = [];

// Function to display menu items
function displayMenu(restaurant) {
    const menuContainer = document.getElementById("menu-items");
    menuContainer.innerHTML = ""; // Clear previous items

    const menuItems = restaurantMenus[restaurant];
    if (menuItems) {
        menuItems.forEach(item => {
            const div = document.createElement("div");
            div.className = "menu-item";
            div.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <div>
                    <h3>${item.name}</h3>
                    <p>Price: ₹${item.price}</p>
                    <button onclick="addToOrder(${item.id}, '${restaurant}')">Add to Cart</button>
                </div>
            `;
            menuContainer.appendChild(div);
        });
    } else {
        menuContainer.innerHTML = "<p>No menu items available.</p>";
    }
}

// Function to add item to cart
function addToOrder(itemId, restaurant) {
    const menuItems = restaurantMenus[restaurant];
    const item = menuItems.find(item => item.id === itemId);

    if (item) {
        order.push(item);
        updateOrderSummary();
        alert(`${item.name} has been added to your cart.`);
    } else {
        alert("Item not found!");
    }
}

// Function to update the order summary
function updateOrderSummary() {
    const orderContainer = document.getElementById("order-summary");
    orderContainer.innerHTML = ""; // Clear existing items
    let total = 0;

    order.forEach(item => {
        const div = document.createElement("div");
        div.textContent = `${item.name} - ₹${item.price}`;
        orderContainer.appendChild(div);
        total += item.price;
    });

    const totalDiv = document.createElement("div");
    totalDiv.innerHTML = `<strong>Total: ₹${total}</strong>`;
    orderContainer.appendChild(totalDiv);

    // Enable the "Place Order" button if cart is not empty
    document.getElementById("place-order").disabled = order.length === 0;
}

// Handle order placement
document.getElementById("place-order").onclick = function () {
    const address = document.getElementById("delivery-address").value;
    const discountCode = document.getElementById("discount-code").value;

    if (order.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    if (!address) {
        alert("Please enter a delivery address.");
        return;
    }

    let total = order.reduce((sum, item) => sum + item.price, 0);
    if (discountCode === "DISCOUNT10") {
        total *= 0.9; // Apply a 10% discount
        alert("Discount applied: 10% off!");
    }

    alert(`Order placed successfully!\nDelivery Address: ${address}\nTotal Amount: ₹${total.toFixed(2)}`);
    order = []; // Reset the cart
    document.getElementById("delivery-address").value = ""; // Clear address input
    document.getElementById("discount-code").value = ""; // Clear discount code input
    updateOrderSummary();
    document.getElementById("feedback-section").style.display = "block"; // Show feedback section
};

// Initialize the app
document.getElementById("restaurant-select").addEventListener("change", function () {
    displayMenu(this.value);
});
function initUser() {
    displayMenu("restaurant1"); // Load default restaurant menu
}
initUser();
