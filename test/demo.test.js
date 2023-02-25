const demo = require("../dist/index.js")

describe("Demo Test", () => {
  it("Test if it returns half of input", () => {
    const num = demo.returnHalf(10)
    expect(num).toBe(5)
  })
})
