document.addEventListener("DOMContentLoaded", function() {
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    const logoutButton = document.getElementById('logoutButton');
    const productList = document.getElementById('productList');

    if (!loggedIn) {
        window.location.href = "login.html"; // Redirect to login if not logged in
    } else {
        logoutButton.style.display = 'block';
    }

    logoutButton.addEventListener('click', function() {
        localStorage.removeItem("loggedIn");
        window.location.href = "login.html"; // Redirect to login
    });

    document.getElementById('productForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const productName = document.getElementById('productName').value;
        const productDescription = document.getElementById('productDescription').value;
        const productPrice = document.getElementById('productPrice').value;
        const productImage = document.getElementById('productImage').files[0];

        const reader = new FileReader();
        reader.onloadend = function() {
            const product = {
                name: productName,
                description: productDescription,
                price: productPrice,
                image: reader.result,
            };

            addProduct(product);
            saveProductToLocalStorage(product);
            this.reset(); // Reset form fields
        };

        if (productImage) {
            reader.readAsDataURL(productImage);
        }
    });

    function addProduct(product) {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <img src="${product.image}" alt="${product.name}">
            <p>${product.description}</p>
            <p><strong>Price: $${product.price}</strong></p>
            <button class="buy-button">Buy</button>
            <button class="delete-button">Delete</button>
        `;

        productList.appendChild(productDiv);

        // Add event listener for the Buy button
        const buyButton = productDiv.querySelector('.buy-button');
        buyButton.addEventListener('click', function() {
            alert(`You have bought ${product.name} for $${product.price}!`);
        });

        // Add event listener for the Delete button
        const deleteButton = productDiv.querySelector('.delete-button');
        deleteButton.addEventListener('click', function() {
            productDiv.remove();
            deleteProductFromLocalStorage(product);
        });
    }

    function saveProductToLocalStorage(product) {
        let products = JSON.parse(localStorage.getItem("products")) || [];
        products.push(product);
        localStorage.setItem("products", JSON.stringify(products));
    }

    function deleteProductFromLocalStorage(productToDelete) {
        let products = JSON.parse(localStorage.getItem("products")) || [];
        products = products.filter(product => product.name !== productToDelete.name || product.price !== productToDelete.price);
        localStorage.setItem("products", JSON.stringify(products));
    }

    function loadProductsFromLocalStorage() {
        const products = JSON.parse(localStorage.getItem("products")) || [];
        products.forEach(addProduct);
    }

    loadProductsFromLocalStorage();
});
