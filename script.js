const productNameInput = document.getElementById('product-name');
const productPriceInput = document.getElementById('product-price');
const addProductButton = document.getElementById('add-product');
const cart = document.getElementById('cart');
const totalPriceSpan = document.getElementById('total-price');
 
let totalPrice = 0;
 
// Function to update the total price
function updateTotalPrice(amount) {
  totalPrice += amount;
  totalPriceSpan.textContent = totalPrice.toFixed(2);
}
 
// Function to remove an item
function removeItem(event) {
  const item = event.target.closest('li');
  const price = parseFloat(item.dataset.price);
  const quantity = parseInt(item.dataset.quantity);
  updateTotalPrice(-(price * quantity));
  item.remove();
}

// Function to add a product to the cart
function addProduct() {
  const productName = productNameInput.value.trim();
  const productPrice = parseFloat(productPriceInput.value);

  // Validation
  if (!productName) {
    showError('Please enter a product name.');
    return;
  }

  if (!productPrice || productPrice <= 0) {
    showError('Please enter a valid price greater than 0.');
    return;
  }

  // Check if product already exists in cart
  const existingItem = document.querySelector(`[data-name="${productName}"]`);
  if (existingItem) {
    // Update quantity of existing item
    updateQuantity(existingItem, 1);
    clearInputs();
    return;
  }

  // Create new cart item
  const cartItem = document.createElement('li');
  cartItem.className = 'cart-item';
  cartItem.dataset.name = productName;
  cartItem.dataset.price = productPrice;
  cartItem.dataset.quantity = '1';

  cartItem.innerHTML = `
    <div class="item-info">
      <span class="item-name">${productName}</span>
      <span class="item-price">$${productPrice.toFixed(2)}</span>
    </div>
    <div class="quantity-controls">
      <button class="quantity-btn decrease-btn" onclick="updateQuantity(this.closest('li'), -1)">-</button>
      <span class="quantity">1</span>
      <button class="quantity-btn increase-btn" onclick="updateQuantity(this.closest('li'), 1)">+</button>
    </div>
    <div class="item-total">$${productPrice.toFixed(2)}</div>
    <button class="remove-btn" onclick="removeItem(event)">Remove</button>
  `;

  cart.appendChild(cartItem);
  updateTotalPrice(productPrice);
  clearInputs();
}

// Function to update quantity of a cart item
function updateQuantity(item, change) {
  const currentQuantity = parseInt(item.dataset.quantity);
  const newQuantity = currentQuantity + change;
  const price = parseFloat(item.dataset.price);

  if (newQuantity <= 0) {
    removeItem({ target: item });
    return;
  }

  item.dataset.quantity = newQuantity;
  const quantitySpan = item.querySelector('.quantity');
  const itemTotalSpan = item.querySelector('.item-total');
  
  quantitySpan.textContent = newQuantity;
  itemTotalSpan.textContent = `$${(price * newQuantity).toFixed(2)}`;

  // Update total price (add the change in price)
  updateTotalPrice(price * change);
}

// Function to clear input fields
function clearInputs() {
  productNameInput.value = '';
  productPriceInput.value = '';
  clearError();
}

// Function to show error messages
function showError(message) {
  clearError();
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  
  const container = document.getElementById('product-container');
  container.appendChild(errorDiv);
  
  setTimeout(clearError, 3000); // Clear error after 3 seconds
}

// Function to clear error messages
function clearError() {
  const errorDiv = document.querySelector('.error-message');
  if (errorDiv) {
    errorDiv.remove();
  }
}

// Event listeners
addProductButton.addEventListener('click', addProduct);

// Allow adding products by pressing Enter
productNameInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    addProduct();
  }
});

productPriceInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    addProduct();
  }
});