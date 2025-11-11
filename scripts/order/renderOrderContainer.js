export function renderOrderContainer(cart) {
  const fragment = document.createDocumentFragment();
  cart.forEach((entry) => {
    const order = entry.orders;
    const template = document.createElement("template");
    template.innerHTML = `
        <div class="order-container">
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${order.date}</div>
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
