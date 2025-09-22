export function addTrackingInfo(cart) {
  const params = new URLSearchParams(window.location.search);
  const orderIndex = Number(params.get("order"));
  const itemIndex = Number(params.get("item"));

  console.log(orderIndex, itemIndex);

  const main = document.querySelector(".main");

  // guard
  if (
    !Number.isInteger(orderIndex) ||
    !Number.isInteger(itemIndex) ||
    !cart[orderIndex]
  ) {
    main.innerHTML = `<div class="message">Order or item not found.</div>`;
  } else {
    const order = cart[orderIndex].orders;
    const item = order.items[itemIndex];

    console.log(order, item);

    if (!item) {
      main.innerHTML = `<div class="message">Item not found in that order.</div>`;
    } else {
      main.innerHTML = `
      <div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">View all orders</a>

        <div class="delivery-date">Arriving on ${order.deliveryDate[itemIndex]}</div>

        <div class="product-info">${item.name}</div>
        <div class="product-info">Quantity: ${item.quantity}</div>

        <img class="product-image" src="${item.image}" />

        <div class="progress-labels-container">
          <div class="progress-label">Preparing</div>
          <div class="progress-label current-status">Shipped</div>
          <div class="progress-label">Delivered</div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" style="width:50%"></div>
        </div>
      </div>
    `;
    }
  }
}
