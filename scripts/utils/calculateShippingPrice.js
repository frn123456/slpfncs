import { formatCurrency } from "./formatCurrency.js";

export function calculateShippingPrice() {
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

  formatCurrency(1, shippingPriceTotal);

  return shippingPriceTotal;
}
