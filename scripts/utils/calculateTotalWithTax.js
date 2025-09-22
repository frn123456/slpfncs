import { formatCurrency } from "./formatCurrency.js";

export function calculateTotalWithTax(params1, params2) {
  const totalWithTax = params1 + params2;

  formatCurrency(4, totalWithTax);
  return totalWithTax;
}
