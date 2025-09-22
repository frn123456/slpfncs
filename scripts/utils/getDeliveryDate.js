export function getDeliveryDate() {
  const cartItems = document.querySelectorAll(".cart-item-container");

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
  });
}
