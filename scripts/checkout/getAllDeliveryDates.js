export function getAllDeliveryDates() {
  const deliveryDateArr = [];
  const cartItems = document.querySelectorAll(".cart-item-container");

  cartItems.forEach((cartItem) => {
    // Find the selected delivery option inside this product
    const selectedOption = cartItem.querySelector(
      ".delivery-option-input:checked"
    );

    const deliveryDate = selectedOption
      .closest(".delivery-option")
      .querySelector(".delivery-option-date");

    deliveryDateArr.push(deliveryDate.textContent.trim());
  });

  return deliveryDateArr;
}
