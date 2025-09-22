import { formatCurrency } from "./formatCurrency.js";

export function calculateSubTotal(params1, params2) {
  const subTotal = params1 + params2;
  formatCurrency(2, subTotal);
  return subTotal;
}
