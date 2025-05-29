document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    const usernameError = document.getElementById('usernameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');

    function validateEmail(email) {
        const re = /^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$/;
        return re.test(email);
    }

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let valid = true;

        // Reset error messages
        usernameError.textContent = '';
        emailError.textContent = '';
        passwordError.textContent = '';
        confirmPasswordError.textContent = '';

        // Validate username
        if (!usernameInput.value.trim()) {
            usernameError.textContent = 'Username is required.';
            valid = false;
        }

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

        // Validate confirm password
        if (!confirmPasswordInput.value) {
            confirmPasswordError.textContent = 'Please confirm your password.';
            valid = false;
        } else if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordError.textContent = 'Passwords do not match.';
            valid = false;
        }

        if (valid) {
            alert('Sign Up successful!');
            signupForm.reset();
        }
    });
});
