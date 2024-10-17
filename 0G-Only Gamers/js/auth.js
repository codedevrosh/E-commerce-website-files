// auth.js

// Register User
document.getElementById('register-form')?.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if user already exists
    if (users.find(user => user.username === username)) {
        alert('User already exists!');
        return;
    }

    // Save user to localStorage
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful! You can now log in.');
    window.location.href = 'login.html'; // Redirect to login page
});

// Login User
document.getElementById('login-form')?.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check credentials
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        alert('Login successful!');
        // You can set a session or redirect to admin page
        window.location.href = 'admin.html'; // Redirect to admin page
    } else {
        alert('Invalid username or password!');
    }
});
