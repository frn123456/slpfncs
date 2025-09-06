import { products } from "../data/products.js";
import { cart } from "../data/cart.js";

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
            $${(product.priceCents / 100).toFixed(2)}
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

function cartQuantity() {
  const cartLength = JSON.parse(localStorage.getItem("cartLength")) || "0";
  document.querySelector(".cart-quantity").textContent = cartLength;
}

cartQuantity();

document.querySelectorAll(".product-container").forEach((product) => {
  const select = product.querySelector(".product-quantity-container select");
  const button = product.querySelector(".add-to-cart-button");

  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    const productName = button.dataset.productName;
    const productImage = button.dataset.productImage;
    const productPrice = button.dataset.productPrice;
    const quantity = Number(select.value); // read quantity directly from THIS product's select
    const cartLength = cart.length;


    let mactchingItem;

    cart.forEach((item) => {
      if (item.id === productId) {
        mactchingItem = item;
      }
    });

    if (mactchingItem) {
      mactchingItem.quantity += 1;
    }else {
      cart.push({ 
      id: productId,
      name: productName,
      image: productImage,
      price: productPrice,
      quantity: quantity,
    });
    }

   // Save updated cart to localStorage
    localStorage.setItem("cartItems", JSON.stringify(cart));

    // Update cart quantity
    localStorage.setItem("cartLength", JSON.stringify(cartLength + 1));

    cartQuantity();

    console.log(cart);
  });
});
