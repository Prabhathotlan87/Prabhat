document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    // Capture input values
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Simple check for demo purposes (you can replace this with actual login logic)
    if (username === "Prabha" && password === "password") {
        // Redirect to dashboard page
        window.location.href = "dashboard.html";  // Ensure the file name and path are correct
    } else {
        alert("Invalid username or password!");
    }
});
