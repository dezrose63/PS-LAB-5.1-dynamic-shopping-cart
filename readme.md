# Reflection Questions

## How did you dynamically create and append new elements to the DOM?

I used document.createElement('li') to create new cart item elements, then built the HTML structure using innerHTML with product data. Each item includes name, price, quantity controls, and remove button. Finally, I appended it to the cart using cart.appendChild(cartItem).

## What steps did you take to ensure accurate updates to the total price?

I implemented a centralized updateTotalPrice(amount) function that:
Maintains a running totalPrice variable
Adds/subtracts amounts when items are added/removed/quantity changed
Updates the display with toFixed(2) for proper currency formatting
Calculates total based on price × quantity for each operation

## How did you handle invalid input for product name or price?

I added validation in the addProduct() function:
Check for empty product names with trim()
Validate price is a number > 0 using parseFloat() and comparison
Display error messages using showError() function that creates a styled error div

## What challenges did you face when implementing the remove functionality?

The main challenges were:
Properly calculating the total price reduction (price × quantity, not just price)
Using event.target.closest('li') to find the correct cart item from the button click
