document.addEventListener('DOMContentLoaded', () => {
  const quantityInput = document.getElementById('quantity');
  const minusBtn = document.querySelector('.qty-btn.minus');
  const plusBtn = document.querySelector('.qty-btn.plus');

  minusBtn.addEventListener('click', () => {
    let currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
      quantityInput.value = currentValue - 1;
    }
  });

  plusBtn.addEventListener('click', () => {
    let currentValue = parseInt(quantityInput.value);
    if (currentValue < 10) {
      quantityInput.value = currentValue + 1;
    }
  });
});

function redirectToPayment() {
  // Navigate to payment.html when clicking "Proceed to Payment"
  window.location.href = 'payment.html';
}
