import { checkoutCart } from "../data/cart.js";
import { cartTrackingQuantity } from "./utils/cartTrackingQuantity.js";
import { addTrackingInfo } from "./utils/addTrackingInfo.js";

cartTrackingQuantity(checkoutCart);

addTrackingInfo(checkoutCart);
