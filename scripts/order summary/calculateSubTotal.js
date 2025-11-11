import { formatCurrency } from "../utils/formatCurrency.js";

export function calculateSubTotal(params1, params2) {
  const subTotal = params1 + params2;
  formatCurrency(-1, subTotal);
  return subTotal;
}
