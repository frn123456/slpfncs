import { cart } from "../data/cart.js";

function itemCount() {
  document.querySelector(".return-to-home-link").textContent = cart.length;
}
itemCount();

function nmumberOfItems() {
  document.querySelectorAll(".payment-summary .payment-summary-row div")[0].textContent = `Items (${cart.length}):`;
}
nmumberOfItems();
function renderProducts(cartItems) {
  const fragment = document.createDocumentFragment();
  cartItems.forEach((cartItem, index) => {
    const template = document.createElement("template");
    const deliveryOptionName = `delivery-option-${index + 1}`;
    template.innerHTML = `
      <div class="cart-item-container">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src=${cartItem.image}>

              <div class="cart-item-details">
                <div class="product-name">
                  ${cartItem.name}
                </div>
                <div class="product-price">
                  $${(cartItem.price / 100).toFixed(2)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name=${deliveryOptionName}>
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name=${deliveryOptionName}>
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name=${deliveryOptionName}>
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;

    fragment.appendChild(template.content);

    
  });
  
  
  document.querySelector(".checkout-grid .order-summary").appendChild(fragment);
}

renderProducts(cart);

function cartTotalPrice() {
  let total = 0;
  cart.forEach((cartItem) => {
    total += cartItem.price * cartItem.quantity;
    console.log(total);
  });

  document.querySelector(".payment-summary-money").textContent =
    `$${(total / 100).toFixed(2)}`;
}

cartTotalPrice();

function shippingPrice() {
  const cartItems = document.querySelectorAll(".cart-item-container");
  let shippingPriceTotal = 0;

  cartItems.forEach((cartItem) => {
    // Find the selected delivery option inside this product
    const selectedOption = cartItem.querySelector(".delivery-option-input:checked");
    console.log(selectedOption);
    
    if (selectedOption) {
      const priceElement = selectedOption.closest(".delivery-option")
        .querySelector(".delivery-option-price");

      let priceValue = 0;

      if (priceElement.textContent.includes("FREE")) {
        priceValue = 0;
      } else {
        // Extract number from something like "$4.99 - Shipping"
        const match = priceElement.textContent.match(/\d+(\.\d+)?/);
        if (match) {
          priceValue = parseFloat(match[0]) * 100; // dollars → cents
        }
      }

      shippingPriceTotal += priceValue;
    }
  });

  // Update summary
  document.querySelectorAll(".payment-summary-row .payment-summary-money")[1].textContent =
    `$${(shippingPriceTotal / 100).toFixed(2)}`;
}

// Run once
shippingPrice();

// Also re-run whenever a shipping option changes
document.querySelectorAll(".delivery-option-input").forEach((input) => {
  input.addEventListener("change", shippingPrice);
});

