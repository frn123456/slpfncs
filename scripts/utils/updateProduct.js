import { getItemCount } from "./getItemCount.js";
import { calculateCartInitialPrice } from "./calculateCartInitialPrice.js";
import { calculateShippingPrice } from "./calculateShippingPrice.js";
import { calculateSubTotal } from "./calculateSubTotal.js";
import { calculateTax } from "./calculateTax.js";
import { calculateTotalWithTax } from "./calculateTotalWithTax.js";

export function updateProduct(params) {
  document.querySelectorAll(".cart-item-container").forEach((container) => {
    const productId = container.dataset.productId;
    const quantityLabel = container.querySelector(".quantity-label");

    const updateLink = container.querySelector(".update-quantity-link");
    const saveLink = container.querySelector(".save-quantity-link");
    const quantityInput = container.querySelector(".quantity-input");

    function persistAndUpdateUI() {
      params.totalQuantity = params.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
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

    updateLink.addEventListener("click", () => {
      if (
        !quantityLabel.classList.contains("quantity-label-hidden") &&
        !quantityInput.classList.contains("quantity-input-visible") &&
        !updateLink.classList.contains("update-quantity-link-hidden") &&
        !saveLink.classList.contains("save-quantity-link-visible")
      ) {
        quantityLabel.classList.add("quantity-label-hidden");
        quantityInput.classList.add("quantity-input-visible");
        updateLink.classList.add("update-quantity-link-hidden");
        saveLink.classList.add("save-quantity-link-visible");
      }
    });
    saveLink.addEventListener("click", () => {
      if (
        quantityInput.classList.contains("quantity-input-visible") &&
        saveLink.classList.contains("save-quantity-link-visible") &&
        updateLink.classList.contains("update-quantity-link-hidden") &&
        quantityLabel.classList.contains("quantity-label-hidden")
      ) {
        quantityInput.classList.remove("quantity-input-visible");
        saveLink.classList.remove("save-quantity-link-visible");
        updateLink.classList.remove("update-quantity-link-hidden");
        quantityLabel.classList.remove("quantity-label-hidden");
      }
      const newQuantity = Number(quantityInput.value);

      const cartIndex = params.items.findIndex((item) => item.id === productId);

      params.items[cartIndex].quantity = newQuantity;

      quantityLabel.textContent = params.items[cartIndex].quantity;

      persistAndUpdateUI();
    });
  });
}

/* link.addEventListener("click", () => {
      const closestCartItemContainer = link.closest(".cart-item-container");
      const productId = closestCartItemContainer.dataset.productId;

      const quantityLabel =
        closestCartItemContainer.querySelector(".quantity-label");

      if (!quantityLabel.classList.contains("quantity-label-hidden")) {
        quantityLabel.classList.add("quantity-label-hidden");
      } */

/* const cartIndex = params.items.findIndex((item) => item.id === productId);
      console.log(cartIndex);

      params.items[cartIndex].quantity++;
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
      ); */
