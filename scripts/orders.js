import { cart, checkoutCart } from "../data/cart.js";
console.log(checkoutCart);

function cartQuantity() {
  checkoutCart.forEach((entry) => {
    const order = entry.orders;
    document.querySelector(".cart-quantity").textContent = order.totalQuantity;
  });
}
cartQuantity();

function renderOrders(cart) {
  const fragment = document.createDocumentFragment();
  checkoutCart.forEach((entry) => {
    const order = entry.orders;
    const template = document.createElement("template");
    template.innerHTML = `
        <div class="order-container">
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>August 12</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${(order.totalWithTax / 100).toFixed(2)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>27cba69d-4c3d-4098-b42d-ac7fa62b7664</div>
            </div>
          </div>
        </div>`;

    fragment.appendChild(template.content);
  });
  document.querySelector(".orders-grid").appendChild(fragment);
}

renderOrders(checkoutCart);

function renderProducts(cart) {
  const fragment = document.createDocumentFragment();
  checkoutCart.forEach((entry) => {
    const order = entry.orders;
    order.items.forEach((item) => {
      const template = document.createElement("template");
      template.innerHTML = `
        <div class="order-details-grid">
            <div class="product-image-container">
              <img src=${item.image} />
            </div>

            <div class="product-details">
              <div class="product-name">
                ${item.name}
              </div>
              <div class="product-delivery-date">Arriving on: ${order.deliveryDate}</div>
              <div class="product-quantity">Quantity: ${item.quantity}</div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png" />
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
          </div>`;

      fragment.appendChild(template.content);
    });
  });
  document.querySelector(".orders-grid .order-container").appendChild(fragment);
}

renderProducts(checkoutCart);
