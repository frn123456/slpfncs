import { formatCurrency } from "./formatCurrency.js";

export function calculateCartInitialPrice(cart) {
  let initialPrice = 0;
  cart.items.forEach((cartItem) => {
    initialPrice += cartItem.price * cartItem.quantity;
  });

  formatCurrency(0, initialPrice);

  return initialPrice;
}
