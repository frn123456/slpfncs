export function renderOrderProducts(cart) {
  const fragment = document.createDocumentFragment();
  cart.forEach((entry, index) => {
    const order = entry.orders;
    order.items.forEach((item, i) => {
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
              <div class="product-delivery-date">Arriving on: ${order.deliveryDate[i]}</div>
              <div class="product-quantity">Quantity: ${item.quantity}</div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png" />
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?order=${index}&item=${i}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
          </div>`;

      fragment.appendChild(template.content);
    });

    // append this order's items into the matching .order-container
    const containers = document.querySelectorAll(
      ".orders-grid .order-container"
    );
    if (containers[index]) {
      containers[index].appendChild(fragment);
    }
  });
}
