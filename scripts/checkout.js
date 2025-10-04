import { cart, checkoutCart } from "../data/cart.js";
import { calculateShippingPrice } from "./utils/calculateShippingPrice.js";
import { getDeliveryDate } from "./utils/getDeliveryDate.js";
import { calculateCartInitialPrice } from "./utils/calculateCartInitialPrice.js";
import { getAllDeliveryDates } from "./utils/getAllDeliveryDates.js";
import { calculateSubTotal } from "./utils/calculateSubTotal.js";
import { calculateTax } from "./utils/calculateTax.js";
import { calculateTotalWithTax } from "./utils/calculateTotalWithTax.js";
import { getItemCount } from "./utils/getItemCount.js";
import { renderAddedToCartItems } from "./utils/renderAddedToCartItems.js";

console.log(cart);

getItemCount();

renderAddedToCartItems(cart);

function recalcAll() {
  const initial = calculateCartInitialPrice(cart);
  const shipping = calculateShippingPrice();
  const subtotal = calculateSubTotal(initial, shipping);
  const taxAmount = calculateTax(subtotal);
  const total = calculateTotalWithTax(subtotal, taxAmount);
  return { initial, shipping, subtotal, taxAmount, total };
}

// initial calculation
recalcAll();

getDeliveryDate();

// Also re-run whenever a shipping option changes
document.querySelectorAll(".delivery-option-input").forEach((input) => {
  input.addEventListener("change", () => {
    recalcAll();
  });
});

document.querySelector(".place-order-button").addEventListener("click", () => {
  const vals = recalcAll();
  const order = {
    orders: {
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      items: [...cart.items],
      totalQuantity: cart.totalQuantity,
      deliveryDate: getAllDeliveryDates(),
      totalWithTax: vals.total,
    },
  };

  checkoutCart.push({
    ...order,
  });

  localStorage.setItem("checkoutCart", JSON.stringify(checkoutCart));

  console.log(checkoutCart);
});
