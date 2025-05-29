document.addEventListener('DOMContentLoaded', () => {
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  const buyNowButtons = document.querySelectorAll('.buy-btn');

  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const name = button.getAttribute('data-name');
      const price = parseFloat(button.getAttribute('data-price'));
      const image = button.getAttribute('data-image');
      const desc = button.getAttribute('data-desc');

      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      // Check if item already in cart
      const existingItemIndex = cart.findIndex(item => item.name === name);
      if (existingItemIndex !== -1) {
        // Increase quantity
        cart[existingItemIndex].quantity = (cart[existingItemIndex].quantity || 1) + 1;
      } else {
        // Add new item
        cart.push({ name, price, image, desc, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${name} has been added to your cart.`);
    });
  });

  buyNowButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const name = button.getAttribute('data-name');
      const price = parseFloat(button.getAttribute('data-price'));
      const desc = button.getAttribute('data-desc');

      // Save selected product data to localStorage for payment page
      localStorage.setItem('selectedProduct', JSON.stringify({ name, price, desc }));

      // Navigate to payment.html
      window.location.href = 'payment.html';
    });
  });
});
