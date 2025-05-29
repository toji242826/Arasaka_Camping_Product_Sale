document.addEventListener('DOMContentLoaded', () => {
    // Extract product name and price from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get('name');
    const productPrice = urlParams.get('price');

    // Display the product name and price
    document.getElementById('product-name').textContent = productName || "No product selected";
    document.getElementById('product-price').textContent = productPrice ? `$${productPrice}` : "Price not available";

    // Event listeners for buttons
    const buyButtons = document.querySelectorAll('.add-to-cart');
    const clearButton = document.querySelector('.clear-history');

    buyButtons.forEach(button => {
        button.addEventListener('click', () => {
            addToCart(productName, parseFloat(productPrice), "image_url"); // Use dynamic product details

            window.location.href = 'cart.html'; // Navigate to cart after adding
            alert('Item added to cart!');
        });
    });

    // Clear History functionality
    if (clearButton) {
        clearButton.addEventListener('click', () => {
            localStorage.removeItem("cart"); // Clear the cart from localStorage
            alert('Cart has been cleared!');
            window.location.reload(); // Reload the page to reflect changes
        });
    }
});

function addToCart(productName, price, image) {
    const cart = JSON.parse(localStorage.getItem("cart")) || []; // Declare cart only once
    cart.push({ name: productName, price: price, image: image });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(productName + " has been added to your cart!");
}
