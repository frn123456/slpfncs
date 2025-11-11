import { formatCurrency } from "../utils/formatCurrency.js";

export function calculateTotalWithTax(params1, params2) {
  const totalWithTax = params1 + params2;

  formatCurrency(-1, totalWithTax);
  return totalWithTax;
}
