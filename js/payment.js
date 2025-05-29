const paymentForm = document.getElementById('payment-form');
    const creditCardInfo = document.getElementById('credit-card-info');
    const paymentMethods = document.getElementsByName('payment-method');

    function togglePaymentFields() {
      if (document.querySelector('input[name="payment-method"]:checked').value === 'credit-card') {
        creditCardInfo.style.display = 'block';
      } else {
        creditCardInfo.style.display = 'none';
      }
    }

    paymentMethods.forEach(method => {
      method.addEventListener('change', togglePaymentFields);
    });

    togglePaymentFields();

    // Render product details from localStorage cart
    function renderProductDetails() {
      const productList = document.getElementById('product-list');
      const selectedProductDiv = document.getElementById('selected-product');
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));

      if (selectedProduct) {
        selectedProductDiv.innerHTML = `
          Selected Product:<br />
          <strong>${selectedProduct.name}</strong><br />
          ${selectedProduct.desc || ''}<br />
          Price: $${selectedProduct.price.toFixed(2)}
        `;
      } else if (cart.length === 0) {
        productList.innerHTML = '<p>Your cart is empty.</p>';
        return;
      }

      let html = '<ul style="list-style: none; padding-left: 0;">';
      cart.forEach(item => {
        html += `
          <li style="margin-bottom: 12px; border-bottom: 1px solid #ddd; padding-bottom: 8px;">
            <strong>${item.name}</strong><br />
            <em>${item.desc || ''}</em><br />
            Price: $${item.price.toFixed(2)}<br />
            Quantity: ${item.quantity || 1}<br />
            Subtotal: $${((item.price) * (item.quantity || 1)).toFixed(2)}
          </li>
        `;
      });
      html += '</ul>';
      productList.innerHTML = html;
    }

    renderProductDetails();

    // Simple form submission handler (for demo purposes)
    paymentForm.addEventListener('submit', function(event) {
      event.preventDefault();

      // Gather product data
      const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
      const cart = JSON.parse(localStorage.getItem('cart')) || [];

      let items = [];
      let total = 0;

      if (selectedProduct) {
        items.push({ name: selectedProduct.name, price: selectedProduct.price, quantity: 1 });
        total = selectedProduct.price;
      } else if (cart.length > 0) {
        items = cart.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity || 1
        }));
        total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      }

      // Save order data to localStorage for success page
      localStorage.setItem('successData', JSON.stringify({ items, total }));

      // Redirect to success page
      window.location.href = 'success.html';
    });