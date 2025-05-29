document.addEventListener('DOMContentLoaded', function() {
    // Load order data from localStorage
    const orderData = JSON.parse(localStorage.getItem('successData'));
    const orderItems = document.getElementById('order-items');
    const orderTotal = document.getElementById('total-amount');
    const orderId = document.getElementById('order-id');
    const orderDate = document.getElementById('order-date');

    if (!orderData) {
        window.location.href = 'products.html';
        return;
    }

    // Set order metadata
    orderId.textContent = Math.floor(Math.random() * 90000) + 10000;
    orderDate.textContent = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    });

    // Display order items
    orderData.items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'order-item';
        itemElement.innerHTML = `
            <span>${item.name} × ${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        `;
        orderItems.appendChild(itemElement);
    });

    // Display total
    orderTotal.textContent = `$${orderData.total}`;

    // Create confetti
    function createConfetti() {
        const colors = ['#4361ee', '#3f37c9', '#4cc9f0', '#4895ef', '#560bad'];
        const container = document.querySelector('.celebration-container');
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.width = Math.random() * 10 + 8 + 'px';
            confetti.style.height = Math.random() * 10 + 8 + 'px';
            confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
            confetti.style.animationDelay = Math.random() * 2 + 's';
            container.appendChild(confetti);
        }
    }

    createConfetti();

    // View receipt functionality
    document.getElementById('view-receipt').addEventListener('click', function() {
        // Navigate to receipt section
        window.location.href = 'receipt.html';
    });

    // Get Voucher button functionality
    const getVoucherBtn = document.getElementById('get-voucher');
    if (getVoucherBtn) {
        getVoucherBtn.addEventListener('click', function() {
            window.location.href = 'voucher.html';
        });
    }

    // Clear success data after 10 seconds
    setTimeout(() => {
        localStorage.removeItem('successData');
    }, 10000);
});
document.addEventListener('DOMContentLoaded', () => {
      const orderData = JSON.parse(localStorage.getItem('successData'));
      const orderItemsContainer = document.getElementById('order-items');
      const totalAmountEl = document.getElementById('total-amount');

      if (!orderData || !orderData.items || orderData.items.length === 0) {
        orderItemsContainer.innerHTML = '<p>No order details found.</p>';
        totalAmountEl.textContent = '';
        return;
      }

      orderData.items.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = 'order-item';
        itemEl.innerHTML = `
          <span>${item.name} × ${item.quantity}</span>
          <span>$${(item.price * item.quantity).toFixed(2)}</span>
        `;
        orderItemsContainer.appendChild(itemEl);
      });

      totalAmountEl.textContent = `Total Amount: $${orderData.total.toFixed(2)}`;
    });