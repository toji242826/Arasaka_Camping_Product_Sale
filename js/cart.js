document.addEventListener('DOMContentLoaded', () => {
  const cartTableBody = document.querySelector('#cart-table tbody');
  const cartTotalElem = document.getElementById('cart-total');
  const emptyCartMessage = document.getElementById('empty-cart-message');
  const checkoutBtn = document.getElementById('checkout-btn');
  const clearCartBtn = document.getElementById('clear-cart-btn');
  const cartTable = document.getElementById('cart-table');
  const cartTotalSection = document.getElementById('cart-total-section');

  function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartTableBody.innerHTML = '';

    if (cart.length === 0) {
      emptyCartMessage.style.display = 'block';
      checkoutBtn.style.display = 'none';
      clearCartBtn.style.display = 'none';
      cartTable.style.display = 'none';
      cartTotalSection.style.display = 'none';
      return;
    } else {
      emptyCartMessage.style.display = 'none';
      checkoutBtn.style.display = 'inline-block';
      clearCartBtn.style.display = 'inline-block';
      cartTable.style.display = 'table';
      cartTotalSection.style.display = 'block';
    }

    let total = 0;

    cart.forEach((item, index) => {
      const subtotal = item.price * (item.quantity || 1);
      total += subtotal;

      const tr = document.createElement('tr');

      tr.innerHTML = `
        <td>${item.name}</td>
        <td>${item.desc || ''}</td>
        <td class="text-end">$${item.price.toFixed(2)}</td>
        <td class="text-center">
          <input type="number" min="1" value="${item.quantity || 1}" class="quantity-input" data-index="${index}" />
        </td>
        <td class="text-end">$${subtotal.toFixed(2)}</td>
        <td class="text-center">
          <button class="remove-btn" data-index="${index}" title="Remove item">&times;</button>
        </td>
      `;

      cartTableBody.appendChild(tr);
    });

    cartTotalElem.textContent = total.toFixed(2);
  }

  function updateQuantity(index, quantity) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart[index]) {
      cart[index].quantity = quantity;
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    }
  }

  function removeItem(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart[index]) {
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    }
  }

  function clearCart() {
    localStorage.removeItem('cart');
    renderCart();
  }

  cartTableBody.addEventListener('input', (e) => {
    if (e.target.classList.contains('quantity-input')) {
      const index = e.target.getAttribute('data-index');
      let quantity = parseInt(e.target.value);
      if (isNaN(quantity) || quantity < 1) {
        quantity = 1;
        e.target.value = 1;
      }
      updateQuantity(index, quantity);
    }
  });

  cartTableBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
      const index = e.target.getAttribute('data-index');
      removeItem(index);
    }
  });

  clearCartBtn.addEventListener('click', () => {
    clearCart();
  });

  renderCart();

  // Add event listener for checkout button to navigate to payment.html
  checkoutBtn.addEventListener('click', () => {
    // Navigate to payment.html
    window.location.href = 'payment.html';
  });
});
