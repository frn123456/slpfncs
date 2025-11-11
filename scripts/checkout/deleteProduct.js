import { getItemCount } from "../utils/getItemCount.js";
import { calculateCartInitialPrice } from "./calculateCartInitialPrice.js";
import { calculateShippingPrice } from "./calculateShippingPrice.js";
import { calculateSubTotal } from "./calculateSubTotal.js";
import { calculateTax } from "./calculateTax.js";
import { calculateTotalWithTax } from "./calculateTotalWithTax.js";

export function deleteProduct(params) {
  document.querySelectorAll(".delete-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      const closestCartItemContainer = link.closest(".cart-item-container");
      const productId = closestCartItemContainer.dataset.productId;

      const quantityLabel =
        closestCartItemContainer.querySelector(".quantity-label");
      const quantity = Number(quantityLabel.textContent);

      const cartIndex = params.items.findIndex((item) => item.id === productId);
      console.log(cartIndex);

      // Remove
      params.items.splice(cartIndex, 1);

      params.totalQuantity = params.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      closestCartItemContainer.remove();

      localStorage.setItem("cartItems", JSON.stringify(params));

      getItemCount();

      const initial = calculateCartInitialPrice(params);
      const shipping = calculateShippingPrice();
      const subtotal = calculateSubTotal(initial, shipping);
      const taxAmount = calculateTax(subtotal);
      const total = calculateTotalWithTax(subtotal, taxAmount);
      console.log(initial, shipping, subtotal, taxAmount, total);
    });
  });
}
