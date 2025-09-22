export function formatCurrency(index, number) {
  if (index >= 0) {
    document.querySelectorAll(".payment-summary-row .payment-summary-money")[
      index
    ].textContent = `$${(number / 100).toFixed(2)}`;
  } else {
    return (number / 100).toFixed(2);
  }
}
