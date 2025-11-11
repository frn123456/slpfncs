import { formatCurrency } from "../utils/formatCurrency.js";
export function calculateTax(params) {
  const taxCents = Math.round(params * 0.1);
  formatCurrency(-1, taxCents);

  return taxCents;
}
