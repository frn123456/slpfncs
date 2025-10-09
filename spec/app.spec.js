import { formatCurrency } from "../scripts/utils/formatCurrency.js";

describe("test suite: random", () => {
  it("returns formatted currency when index is negative", () => {
    const result = formatCurrency(-1, 45210); //
    expect(result).toBe("452.10");
  });

  it("it works with zero", () => {
    const result = formatCurrency(-1, 0);
    expect(result).toBe("0.00");
  });
});
