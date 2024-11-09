document.addEventListener('DOMContentLoaded', function () {
    const productList = document.getElementById('productList');
    const logoutButton = document.getElementById('logoutButton');
    const userInfoFormContainer = document.getElementById('userInfoFormContainer');
    const userInfoDisplay = document.getElementById('userInfo');
    const buyModal = document.getElementById('buyModal');
    
    // Check if user is logged in
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    if (!loggedIn) {
        window.location.href = "login.html"; // Redirect to login if not logged in
    } else {
        logoutButton.style.display = 'block';
    }

    logoutButton.addEventListener('click', function () {
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("userName");
        localStorage.removeItem("userContact");
        window.location.href = "login.html"; // Redirect to login
    });

    // User Info Form submission
    document.getElementById('userInfoForm').addEventListener('submit', function (event) {
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

    // Product Form submission
    document.getElementById('productForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const productName = document.getElementById('productName').value;
        const productDescription = document.getElementById('productDescription').value;
        const productPrice = document.getElementById('productPrice').value;
        const productImage = document.getElementById('productImage').files[0];
        const sellerName = document.getElementById('sellerName').value;
        const sellerAddress = document.getElementById('sellerAddress').value;
        const sellerContact = document.getElementById('sellerContact').value;

        const reader = new FileReader();
        reader.onloadend = function () {
            const product = {
                name: productName,
                description: productDescription,
                price: productPrice,
                image: reader.result,
                sellerName: sellerName,
                sellerAddress: sellerAddress,
                sellerContact: sellerContact,
                soldOut: false,
                buyerName: null
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
            <p><strong>Seller: ${product.sellerName}</strong></p>
            <p>Contact: ${product.sellerContact}</p>
            <p>Address: ${product.sellerAddress}</p>
            <button class="buy-button" ${product.soldOut ? 'style="display:none;"' : ''}>Buy</button>
            <button class="delete-button">Delete</button>
            <button class="sold-out-button" ${product.soldOut ? 'style="display:block;"' : 'style="display:none;"'}>
                ${product.soldOut ? 'This product is sold out' : ''}
            </button>
        `;

        productList.appendChild(productDiv);

        const buyButton = productDiv.querySelector('.buy-button');
        buyButton.addEventListener('click', function () {
            if (!product.soldOut) {
                // Show modal for buyer details
                buyModal.style.display = 'flex';
                product.soldOut = true;
                
                // Capture buyer details after form submission
                const buyerName = document.getElementById('buyerName').value;
                product.buyerName = buyerName; // Store buyer name in the product
                saveProductToLocalStorage(product); // Save updated product in localStorage

                // Hide the Buy button and show the Sold Out button
                productDiv.querySelector('.buy-button').style.display = 'none';
                productDiv.querySelector('.sold-out-button').style.display = 'block';
                productDiv.querySelector('.sold-out-button').textContent = 'This product is sold out'; // Set the "Sold Out" text
            }
        });

        const deleteButton = productDiv.querySelector('.delete-button');
        deleteButton.addEventListener('click', function () {
            productDiv.remove();
            deleteProductFromLocalStorage(product);
        });
    }

    // Handle form submission for buyer details
    document.getElementById('buyerDetailsForm').addEventListener('submit', function (event) {
        event.preventDefault();
        
        const buyerName = document.getElementById('buyerName').value;
        const buyerContact = document.getElementById('buyerContact').value;
        const buyerAddress = document.getElementById('buyerAddress').value;

        // Save buyer information and close modal
        alert(`Thank you for your purchase!\n\nBuyer Name: ${buyerName}\nContact: ${buyerContact}\nAddress: ${buyerAddress}`);

        // Close the modal after submitting
        buyModal.style.display = 'none';
    });

    // Close modal when user clicks on the close button
    document.getElementById('closeModal').addEventListener('click', function () {
        buyModal.style.display = 'none';
    });

    function saveProductToLocalStorage(product) {
        let products = JSON.parse(localStorage.getItem("products")) || [];
        // Update the product in localStorage
        products = products.filter(p => p.name !== product.name); // Remove any previous instance
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
