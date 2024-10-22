document.addEventListener("DOMContentLoaded", function() {
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    const logoutButton = document.getElementById('logoutButton');
    const productList = document.getElementById('productList');
    const userInfoFormContainer = document.getElementById('userInfoFormContainer');
    const userInfoDisplay = document.getElementById('userInfo');

    if (!loggedIn) {
        window.location.href = "login.html"; // Redirect to login if not logged in
    } else {
        logoutButton.style.display = 'block';
    }

    logoutButton.addEventListener('click', function() {
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("userName");
        localStorage.removeItem("userContact");
        window.location.href = "login.html"; // Redirect to login
    });

    document.getElementById('userInfoForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const userName = document.getElementById('userName').value;
        const userContact = document.getElementById('userContact').value;

        // Store user info in local storage
        localStorage.setItem("userName", userName);
        localStorage.setItem("userContact", userContact);

        // Display user info
        document.getElementById('displayUserName').textContent = userName;
        document.getElementById('displayUserContact').textContent = userContact;
        userInfoDisplay.style.display = 'block';
        userInfoFormContainer.style.display = 'none';
    });

    document.getElementById('productForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const productName = document.getElementById('productName').value;
        const productDescription = document.getElementById('productDescription').value;
        const productPrice = document.getElementById('productPrice').value;
        const productImage = document.getElementById('productImage').files[0];

        const reader = new FileReader();
        reader.onloadend = function() {
            const userName = localStorage.getItem("userName");
            const userContact = localStorage.getItem("userContact");

            const product = {
                name: productName,
                description: productDescription,
                price: productPrice,
                image: reader.result,
                userName: userName,
                userContact: userContact
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
            <p><strong>Seller: ${product.userName}</strong></p>
            <p>Contact: ${product.userContact}</p>
            <button class="buy-button">Buy</button>
            <button class="delete-button">Delete</button>
        `;

        productList.appendChild(productDiv);

        const buyButton = productDiv.querySelector('.buy-button');
        buyButton.addEventListener('click', function() {
            alert(`You have bought ${product.name} for $${product.price}!`);
        });

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
        
        // Check if user info is available
        const userName = localStorage.getItem("userName");
        const userContact = localStorage.getItem("userContact");
        if (userName && userContact) {
            document.getElementById('displayUserName').textContent = userName;
            document.getElementById('displayUserContact').textContent = userContact;
            userInfoDisplay.style.display = 'block';
            userInfoFormContainer.style.display = 'none';
        }
    }

    loadProductsFromLocalStorage();
});
