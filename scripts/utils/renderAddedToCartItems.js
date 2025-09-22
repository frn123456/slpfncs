import { deleteProduct } from "./deleteProduct.js";
import { updateProduct } from "./updateProduct.js";

export function renderAddedToCartItems(cart) {
  const fragment = document.createDocumentFragment();
  if (cart.items.length === 0) {
    document.querySelector(".checkout-grid .order-summary").textContent =
      "Your cart is empty.";
  }
  cart.items.forEach((cartItem, index) => {
    const template = document.createElement("template");
    const deliveryOptionName = `delivery-option-${index + 1}`;
    template.innerHTML = `
      <div class="cart-item-container" data-product-id="${cartItem.id}">
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
                  <input class=quantity-input value=${cartItem.quantity} />
                  <span class="save-quantity-link link-primary">
                    Save
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

  deleteProduct(cart);
  updateProduct(cart);
}
