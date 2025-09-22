export function getItemCount() {
  const numberOfItems = JSON.parse(localStorage.getItem("cartItems")) || {
    totalQuantity: 0,
  };
  document.querySelector(".return-to-home-link").textContent =
    `${numberOfItems.totalQuantity} items`;

  document.querySelectorAll(
    ".payment-summary .payment-summary-row div"
  )[0].textContent = `Items (${numberOfItems.totalQuantity}):`;
}
