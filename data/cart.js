export const cart = JSON.parse(localStorage.getItem("cartItems")) || {
  items: [],
  totalQuantity: 0,
};

export const checkoutCart =
  JSON.parse(localStorage.getItem("checkoutCart")) || [];
