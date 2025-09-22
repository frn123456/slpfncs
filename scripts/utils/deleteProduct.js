import { getItemCount } from "./getItemCount.js";
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

      if (quantity > 1) {
        // Decrement
        params.items[cartIndex].quantity--;
        params.totalQuantity = params.items.reduce(
          (sum, item) => sum + item.quantity,
          0
        );

        quantityLabel.textContent = params.items[cartIndex].quantity;

        localStorage.setItem("cartItems", JSON.stringify(params));

        getItemCount();
        calculateCartInitialPrice(params);
        calculateShippingPrice();
        calculateSubTotal(
          calculateCartInitialPrice(params),
          calculateShippingPrice()
        );
        calculateTax(
          calculateSubTotal(
            calculateCartInitialPrice(params),
            calculateShippingPrice()
          )
        );
        calculateTotalWithTax(
          calculateSubTotal(
            calculateCartInitialPrice(params),
            calculateShippingPrice()
          ),
          calculateTax(
            calculateSubTotal(
              calculateCartInitialPrice(params),
              calculateShippingPrice()
            )
          )
        );
      } else {
        // Remove
        params.items.splice(cartIndex, 1);

        params.totalQuantity = params.items.reduce(
          (sum, item) => sum + item.quantity,
          0
        );

        closestCartItemContainer.remove();

        localStorage.setItem("cartItems", JSON.stringify(params));

        getItemCount();
        calculateCartInitialPrice(params);
        calculateShippingPrice();
        calculateSubTotal(
          calculateCartInitialPrice(params),
          calculateShippingPrice()
        );
        calculateTax(
          calculateSubTotal(
            calculateCartInitialPrice(params),
            calculateShippingPrice()
          )
        );
        calculateTotalWithTax(
          calculateSubTotal(
            calculateCartInitialPrice(params),
            calculateShippingPrice()
          ),
          calculateTax(
            calculateSubTotal(
              calculateCartInitialPrice(params),
              calculateShippingPrice()
            )
          )
        );
      }
    });
  });
}
