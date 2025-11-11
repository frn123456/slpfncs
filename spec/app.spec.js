import { formatCurrency } from "../scripts/utils/formatCurrency.js";
import { calculateTax } from "../scripts/utils/calculateTax.js";

describe("test suite: random", () => {
  it("returns formatted currency when index is negative", () => {
    const result = formatCurrency(-1, 45210); //
    expect(result).toBe("452.10");
  });

  it("it works with zero", () => {
    const result = formatCurrency(-1, 0);
    expect(result).toBe("0.00");
  });

  it("calculates tax correctly", () => {
    const result = calculateTax(4193);
    expect(result).toBe(419);
  });
});

/* import { cart } from "../data/cart.js";
import { addToCart } from "../scripts/amazon.js";
import { renderCheckout } from "../scripts/checkout.js";
import { recalcAll } from "../scripts/checkout.js";

describe("addToCart", () => {
  beforeEach(() => {
    // Mock localStorage
    spyOn(localStorage, "setItem");
    spyOn(localStorage, "getItem").and.returnValue(null);

    // Set up DOM structure
    const testContainer = document.createElement("div");
    testContainer.classList.add("test-container");
    testContainer.innerHTML = `
    <div class="product-container">
      <div class="product-quantity-container">
        <select>
          <option value="1" selected>1</option>
        </select>
      </div>
      <button class="add-to-cart-button"
        data-product-id="p1"
        data-product-name="Product 1"
        data-product-image="img.jpg"
        data-product-price="10">
        Add to Cart
      </button>
      <div class="added-to-cart"></div>
    </div>
  `;
    // Instead of wiping out <body>, append to it
    console.log(document.body.appendChild(testContainer));
  });

  it("should update localStorage when product is added", () => {
    addToCart(); // attach event listener

    const button = document.querySelector(".add-to-cart-button");
    button.click(); // simulate click

    // ✅ spyOn checks if setItem was called
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cartItems",
      jasmine.any(String) // expect it to store a stringified cart
    );
  });
});

describe("renderCheckout", () => {
  beforeEach(() => {
    // Mock localStorage
    spyOn(localStorage, "setItem");

    // Set up DOM structure
    const testContainer = document.createElement("div");
    testContainer.classList.add("test-container");
    testContainer.innerHTML = `

      <button class="place-order-button">Place Order</button>

   
  `;
    // Instead of wiping out <body>, append to it
    console.log(document.body.appendChild(testContainer));
  });

  it("should update localStorage when order is placed", () => {
    renderCheckout(); // attach event listener

    const button = document.querySelector(".place-order-button");
    button.click(); // simulate click

    // ✅ spyOn checks if setItem was called
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "checkoutCart",
      jasmine.any(String) // expect it to store a stringified cart
    );
  });
}); */
