document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Dummy authentication
    if (username === "user" && password === "password") {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "index.html"; // Redirect to index
    } else {
        // Display error message
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.textContent = "Invalid username or password.";
    }
});
