export function cartOrderQuantity(cart) {
  let totalQuantity = 0;
  cart.forEach((entry) => {
    const order = entry.orders;
    totalQuantity += order.totalQuantity;
  });
  document.querySelector(".cart-quantity").textContent = totalQuantity;
}
