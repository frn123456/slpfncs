import { products } from "../data/products.js";
import { cart } from "../data/cart.js";
import { formatCurrency } from "./utils/formatCurrency.js";

function numberOfItemsAddedToCart() {
  const numberOfItems = JSON.parse(localStorage.getItem("cartItems")) || {
    totalQuantity: 0,
  };
  document.querySelector(".cart-quantity").textContent =
    numberOfItems.totalQuantity;
}

numberOfItemsAddedToCart();

function renderProducts(products) {
  const fragment = document.createDocumentFragment();
  products.forEach((product, index) => {
    const template = document.createElement("template");
    template.innerHTML = `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src=${product.image}>
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
           </div>

          <div class="product-price">
            $${formatCurrency(-1, product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary" data-product-name="${product.name}" data-product-image="${product.image}" data-product-price="${product.priceCents}" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>`;

    fragment.appendChild(template.content);
  });
  document.querySelector(".products-grid").appendChild(fragment);
}

renderProducts(products);

document.querySelectorAll(".product-container").forEach((product) => {
  const select = product.querySelector(".product-quantity-container select");
  const button = product.querySelector(".add-to-cart-button");
  const addedToCart = product.querySelector(".added-to-cart");

  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    const productName = button.dataset.productName;
    const productImage = button.dataset.productImage;
    const productPrice = button.dataset.productPrice;
    const productQuantity = Number(select.value); // read quantity directly from THIS product's select

    const matchingItem = cart.items.find((item) => item.id === productId);

    if (matchingItem) {
      matchingItem.quantity += productQuantity;
    } else {
      cart.items.push({
        id: productId,
        name: productName,
        image: productImage,
        price: productPrice,
        quantity: productQuantity,
      });
    }

    cart.totalQuantity = cart.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    let timeoutId;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      if (addedToCart.classList.contains("added-to-cart-visible")) {
        addedToCart.classList.remove("added-to-cart-visible");
      }
    }, 2000);
    addedToCart.classList.add("added-to-cart-visible");

    // Save updated cart to localStorage
    localStorage.setItem("cartItems", JSON.stringify(cart));

    numberOfItemsAddedToCart();
  });
});
