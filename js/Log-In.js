document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    function validateEmail(email) {
        // Simple email regex for validation
        const re = /^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$/;
        return re.test(email);
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let valid = true;

        // Reset error messages
        emailError.textContent = '';
        passwordError.textContent = '';

        // Validate email
        if (!emailInput.value) {
            emailError.textContent = 'Email is required.';
            valid = false;
        } else if (!validateEmail(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address.';
            valid = false;
        }

        // Validate password
        if (!passwordInput.value) {
            passwordError.textContent = 'Password is required.';
            valid = false;
        } else if (passwordInput.value.length < 6) {
            passwordError.textContent = 'Password must be at least 6 characters.';
            valid = false;
        }

        if (valid) {
            // For demonstration, just alert success
            alert('Login successful!');
            loginForm.reset();
        }
    });
});
