// Payment Success Component
document.addEventListener('DOMContentLoaded', function() {
    // Create success section element
    const successSection = document.createElement('div');
    successSection.className = 'payment-success-section';
    successSection.innerHTML = `
        <div class="payment-success-content">
            <div class="payment-success-icon">
                <i class="bi bi-check-circle-fill"></i>
            </div>
            <h3 class="payment-success-title">Payment Successful!</h3>
            <p class="payment-success-message">
                Your order has been processed successfully.
            </p>
            <div class="payment-success-loader spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p class="payment-success-redirect">Redirecting to order confirmation...</p>
        </div>
    `;
    document.body.appendChild(successSection);

    // Add to window object
    window.paymentSuccess = {
        show: function(redirectUrl = 'success.html', delay = 2000) {
            // Store order data
            const checkoutData = JSON.parse(localStorage.getItem('checkoutData'));
            const successData = {
                items: checkoutData.items,
                total: checkoutData.total,
                timestamp: Date.now()
            };
            localStorage.setItem('successData', JSON.stringify(successData));
            localStorage.removeItem('cart');

            // Show section
            successSection.classList.add('active');
            
            // Redirect after delay
            setTimeout(() => {
                window.location.href = `${redirectUrl}?payment=success&t=${Date.now()}`;
            }, delay);
        }
    };
});
