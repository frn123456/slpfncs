import { formatCurrency } from "./formatCurrency.js";
export function calculateTax(params) {
  const taxCents = Math.round(params * 0.1);
  formatCurrency(3, taxCents);

  return taxCents;
}
