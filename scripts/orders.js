import { checkoutCart } from "../data/cart.js";
import { cartOrderQuantity } from "./utils/cartOrderQuantity.js";
import { renderOrderContainer } from "./utils/renderOrderContainer.js";
import { renderOrderProducts } from "./utils/renderOrderProducts.js";
console.log(checkoutCart);

cartOrderQuantity(checkoutCart);

renderOrderContainer(checkoutCart);

renderOrderProducts(checkoutCart);
