export function getDeliveryDate() {
  document
    .querySelectorAll(".cart-item-container")
    .forEach((cartItemContainer) => {
      const radios = cartItemContainer.querySelectorAll(
        ".delivery-option-input"
      );
      radios.forEach((radio) => {
        // ensure none are checked by default
        radio.checked = false;
        radio.addEventListener("change", () => {
          const deliveryDateEl = radio
            .closest(".delivery-option")
            ?.querySelector(".delivery-option-date");
          if (deliveryDateEl) {
            const dd = cartItemContainer.querySelector(".delivery-date");
            if (dd)
              dd.textContent = `Delivery Date: ${deliveryDateEl.textContent.trim()}`;
          }
        });
      });
    });
}
