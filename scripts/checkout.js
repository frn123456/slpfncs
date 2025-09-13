import { cart, checkoutCart } from "../data/cart.js";
console.log(cart);

function itemCount() {
  const numberOfItems = JSON.parse(localStorage.getItem("cartItems")) || {
    totalQuantity: 0,
  };
  document.querySelector(".return-to-home-link").textContent =
    `${numberOfItems.totalQuantity} items`;

  document.querySelectorAll(
    ".payment-summary .payment-summary-row div"
  )[0].textContent = `Items (${numberOfItems.totalQuantity}):`;
}

itemCount();

function renderProducts(cart) {
  const fragment = document.createDocumentFragment();
  if (cart.items.length === 0) {
    document.querySelector(".checkout-grid .order-summary").textContent =
      "Your cart is empty.";
  }
  cart.items.forEach((cartItem, index) => {
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

  document.querySelectorAll(".delete-quantity-link").forEach((link, index) => {
    link.addEventListener("click", () => {
      const cartItemContainer = link.closest(".cart-item-container");
      const quantityLabel = cartItemContainer.querySelector(".quantity-label");
      const quantity = Number(quantityLabel.textContent);

      if (quantity > 1) {
        // Decrement
        cart.items[index].quantity--;
        cart.totalQuantity = cart.items.reduce(
          (sum, item) => sum + item.quantity,
          0
        );

        quantityLabel.textContent = cart.items[index].quantity;

        itemCount();
        cartInitialPrice();
        shippingPrice();

        localStorage.setItem("cartItems", JSON.stringify(cart));
        window.location.reload();
      } else {
        // Remove
        cart.items.splice(index, 1);

        cart.totalQuantity = cart.items.reduce(
          (sum, item) => sum + item.quantity,
          0
        );

        document.querySelector(".checkout-grid .order-summary").innerHTML = "";
        itemCount();
        cartInitialPrice();
        shippingPrice();
        renderProducts(cart);

        localStorage.setItem("cartItems", JSON.stringify(cart));
        window.location.reload();
      }
    });
  });
}

renderProducts(cart);

function cartInitialPrice() {
  let initialPrice = 0;
  cart.items.forEach((cartItem) => {
    initialPrice += cartItem.price * cartItem.quantity;
  });

  document.querySelectorAll(
    ".payment-summary-row .payment-summary-money"
  )[0].textContent = `$${(initialPrice / 100).toFixed(2)}`;

  return initialPrice;
}

cartInitialPrice();

function shippingPrice() {
  const cartItems = document.querySelectorAll(".cart-item-container");
  let shippingPriceTotal = 0;

  cartItems.forEach((cartItem) => {
    // Find the selected delivery option inside this product
    const selectedOption = cartItem.querySelector(
      ".delivery-option-input:checked"
    );

    if (selectedOption) {
      const priceElement = selectedOption
        .closest(".delivery-option")
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
  document.querySelectorAll(
    ".payment-summary-row .payment-summary-money"
  )[1].textContent = `$${(shippingPriceTotal / 100).toFixed(2)}`;

  return shippingPriceTotal;
}

// Run once
shippingPrice();

function deliveryDate() {
  const cartItems = document.querySelectorAll(".cart-item-container");
  let deliveryDateHTML = "";
  cartItems.forEach((cartItem) => {
    // Find the selected delivery option inside this product
    const selectedOption = cartItem.querySelector(
      ".delivery-option-input:checked"
    );

    const deliveryDate = selectedOption
      .closest(".delivery-option")
      .querySelector(".delivery-option-date");

    cartItem.querySelector(".delivery-date").textContent =
      `Delivery Date: ${deliveryDate.textContent}`;

    deliveryDateHTML = deliveryDate.textContent;
  });

  return deliveryDateHTML;
}

deliveryDate();

function subTotal() {
  const subTotal = shippingPrice() + cartInitialPrice();
  document.querySelectorAll(
    ".payment-summary-row .payment-summary-money"
  )[2].textContent = `$${(subTotal / 100).toFixed(2)}`;

  return subTotal;
}

subTotal();

function tax() {
  const subTotal = shippingPrice() + cartInitialPrice();
  const taxCents = Math.round(subTotal * 0.1);
  document.querySelectorAll(
    ".payment-summary-row .payment-summary-money"
  )[3].textContent = `$${(taxCents / 100).toFixed(2)}`;

  return taxCents;
}

tax();

function totalWithTax() {
  const subTotal = shippingPrice() + cartInitialPrice();
  const taxCents = Math.round(subTotal * 0.1);
  const totalWithTax = subTotal + taxCents;
  document.querySelectorAll(
    ".payment-summary-row .payment-summary-money"
  )[4].textContent = `$${(totalWithTax / 100).toFixed(2)}`;

  return totalWithTax;
}

totalWithTax();

// Also re-run whenever a shipping option changes
document.querySelectorAll(".delivery-option-input").forEach((input) => {
  input.addEventListener("change", () => {
    shippingPrice();
    deliveryDate();
    cartInitialPrice();
    subTotal();
    tax();
    totalWithTax();
  });
});

document.querySelector(".place-order-button").addEventListener("click", () => {
  const order = {
    orders: {
      items: [...cart.items],
      totalQuantity: cart.totalQuantity,
      deliveryDate: deliveryDate().trim(),
      totalWithTax: totalWithTax(),
    },
  };

  checkoutCart.push({
    ...order,
  });

  localStorage.setItem("checkoutCart", JSON.stringify(checkoutCart));

  console.log(checkoutCart);
});
