const { JSDOM } = require("jsdom");
const fs = require("fs");

let dom;
describe("Calculator tests", () => {
  beforeAll(() => {
    const html = fs.readFileSync("./src/index.html", "utf-8");
    dom = new JSDOM(html, {runScripts: "dangerously"});
  });

  beforeEach(async () => {
    const c = dom.window.document.querySelector("#clear");
    await c.click();
  });

  // Errors
  test("Only one dot will be allowed", async () => {
    const numberFive = dom.window.document.querySelector("[data-num='5']");
    const numberFour = dom.window.document.querySelector("[data-num='4']");
    const dot = dom.window.document.querySelector("#dot");

    await numberFive.click();
    await dot.click();
    await dot.click();
    await dot.click();
    await dot.click();
    await numberFour.click();

    const result = dom.window.document.querySelector("#viewer");

    expect(result.innerHTML).toBe("5.4");
  });

  // Operations
  test("Sum decimals", async () => {
    const numberFive = dom.window.document.querySelector("[data-num='5']");
    const numberFour = dom.window.document.querySelector("[data-num='4']");
    const dot = dom.window.document.querySelector("#dot");

    const plus = dom.window.document.querySelector("[data-ops='plus']");
    const equalSign = dom.window.document.querySelector("#equals");

    await numberFive.click();
    await dot.click();
    await numberFour.click();

    await plus.click();

    await numberFive.click();
    await equalSign.click();

    const result = dom.window.document.querySelector("#viewer");

    expect(result.innerHTML).toBe("10.4");
  });

  test("Sum problematic float number", async () => {
    const numberOne = dom.window.document.querySelector("[data-num='1']");
    const numberTwo = dom.window.document.querySelector("[data-num='2']");
    const numberZero = dom.window.document.querySelector("[data-num='0']");
    const dot = dom.window.document.querySelector("#dot");

    const plus = dom.window.document.querySelector("[data-ops='plus']");
    const equalSign = dom.window.document.querySelector("#equals");

    await numberOne.click();
    await dot.click();
    await numberZero.click();
    await numberOne.click();

    await plus.click();

    await numberTwo.click();
    await dot.click();
    await numberZero.click();
    await numberTwo.click();

    await equalSign.click();

    const result = dom.window.document.querySelector("#viewer");

    expect(result.innerHTML).toBe("3.03");
  });

  test("Subtract decimals", async () => {
    const numberFive = dom.window.document.querySelector("[data-num='5']");
    const numberFour = dom.window.document.querySelector("[data-num='4']");
    const dot = dom.window.document.querySelector("#dot");

    const minus = dom.window.document.querySelector("[data-ops='minus']");
    const equalSign = dom.window.document.querySelector("#equals");

    await numberFive.click();
    await dot.click();
    await numberFour.click();

    await minus.click();

    await numberFive.click();
    await equalSign.click();

    const result = dom.window.document.querySelector("#viewer");

    expect(result.innerHTML).toBe("0.4");
  });

  test("Multiply decimals", async () => {
    const numberFive = dom.window.document.querySelector("[data-num='5']");
    const numberFour = dom.window.document.querySelector("[data-num='4']");
    const dot = dom.window.document.querySelector("#dot");

    const multiply = dom.window.document.querySelector("[data-ops='multiply']");
    const equalSign = dom.window.document.querySelector("#equals");

    await numberFive.click();
    await dot.click();
    await numberFour.click();

    await multiply.click();

    await numberFive.click();
    await equalSign.click();

    const result = dom.window.document.querySelector("#viewer");

    expect(result.innerHTML).toBe("27");
  });

  test("Multiply problematic decimals", async () => {
    const numberTwo = dom.window.document.querySelector("[data-num='2']");
    const numberFour = dom.window.document.querySelector("[data-num='4']");
    const numberZero = dom.window.document.querySelector("[data-num='0']");
    const dot = dom.window.document.querySelector("#dot");

    const multiply = dom.window.document.querySelector("[data-ops='multiply']");
    const equalSign = dom.window.document.querySelector("#equals");

    //2.0422 * 2.02
    await numberTwo.click();
    await dot.click();
    await numberZero.click();
    await numberFour.click();
    await numberTwo.click();
    await numberTwo.click();

    await multiply.click();

    await numberTwo.click();
    await dot.click();
    await numberZero.click();
    await numberTwo.click();

    await equalSign.click();

    const result = dom.window.document.querySelector("#viewer");

    expect(result.innerHTML).toBe("4.125244");
  });

  test("Divide decimals", async () => {
    const numberFive = dom.window.document.querySelector("[data-num='5']");
    const numberFour = dom.window.document.querySelector("[data-num='4']");
    const numberTwo = dom.window.document.querySelector("[data-num='2']");
    const dot = dom.window.document.querySelector("#dot");

    const divide = dom.window.document.querySelector("[data-ops='divide']");
    const equalSign = dom.window.document.querySelector("#equals");

    await numberFive.click();
    await dot.click();
    await numberFour.click();

    await divide.click();

    await numberTwo.click();
    await equalSign.click();

    const result = dom.window.document.querySelector("#viewer");

    expect(result.innerHTML).toBe("2.7");
  });

  test("Divide problematic decimals", async () => {
    const numberThree = dom.window.document.querySelector("[data-num='3']");
    const numberSix = dom.window.document.querySelector("[data-num='6']");
    const numberZero = dom.window.document.querySelector("[data-num='0']");
    const numberNine = dom.window.document.querySelector("[data-num='9']");
    const dot = dom.window.document.querySelector("#dot");

    const divide = dom.window.document.querySelector("[data-ops='divide']");
    const equalSign = dom.window.document.querySelector("#equals");

    await numberSix.click();
    await numberZero.click();
    await numberZero.click();
    await dot.click();
    await numberNine.click();

    await divide.click();

    await numberThree.click();
    await equalSign.click();

    const result = dom.window.document.querySelector("#viewer");

    expect(result.innerHTML).toBe("200.3");
  });

  test("Divide int numbers which leads to a decimal result ", async () => {
    const numberThree = dom.window.document.querySelector("[data-num='3']");
    const numberTwo = dom.window.document.querySelector("[data-num='2']");

    const divide = dom.window.document.querySelector("[data-ops='divide']");
    const equalSign = dom.window.document.querySelector("#equals");

    await numberThree.click();

    await divide.click();

    await numberTwo.click();

    await equalSign.click();

    const result = dom.window.document.querySelector("#viewer");

    expect(result.innerHTML).toBe("1.5");
  });

  test("Divide by 0", async () => {
    const numberZero = dom.window.document.querySelector("[data-num='0']");
    const numberFour = dom.window.document.querySelector("[data-num='4']");
    const numberTwo = dom.window.document.querySelector("[data-num='2']");
    const dot = dom.window.document.querySelector("#dot");

    const divide = dom.window.document.querySelector("[data-ops='divide']");
    const equalSign = dom.window.document.querySelector("#equals");

    const calculator = dom.window.document.querySelector("#calculator");

    await numberTwo.click();
    await dot.click();
    await numberFour.click();

    await divide.click();

    await numberZero.click();
    await equalSign.click();

    const result = dom.window.document.querySelector("#viewer");

    expect(result.innerHTML).toBe("Look at what you've done");
    expect(calculator.classList).toContain("broken");
  });

  test("Clear button", async () => {
    const numberFive = dom.window.document.querySelector("[data-num='5']");
    const numberFour = dom.window.document.querySelector("[data-num='4']");
    const numberTwo = dom.window.document.querySelector("[data-num='2']");
    const dot = dom.window.document.querySelector("#dot");

    const clear = dom.window.document.querySelector("#clear");
    
    await numberTwo.click();
    await numberFive.click();
    await dot.click();
    await numberFour.click();
    await numberTwo.click();

    await clear.click();

    const result = dom.window.document.querySelector("#viewer");

    expect(result.innerHTML).toBe("0");
  });


  // Numbers
  test("Number 0", async() => {
    const numberZero = dom.window.document.querySelector("[data-num='0']");

    await numberZero.click();

    const result = dom.window.document.querySelector("#viewer");

    expect(result.innerHTML).toBe("0");
  });

  test("Number 1", async() => {
    const numberOne = dom.window.document.querySelector("[data-num='1']");

    await numberOne.click();

    const result = dom.window.document.querySelector("#viewer");

    expect(result.innerHTML).toBe("1");
  });

  test("Number 2", async() => {
    const numberTwo = dom.window.document.querySelector("[data-num='2']");

    await numberTwo.click();

    const result = dom.window.document.querySelector("#viewer");

    expect(result.innerHTML).toBe("2");
  });

  test("Number 3", async() => {
    const numberThree = dom.window.document.querySelector("[data-num='3']");

    await numberThree.click();

    const result = dom.window.document.querySelector("#viewer");

    expect(result.innerHTML).toBe("3");
  });

  test("Number 4", async() => {
    const numberFour = dom.window.document.querySelector("[data-num='4']");

    await numberFour.click();

    const result = dom.window.document.querySelector("#viewer");

    expect(result.innerHTML).toBe("4");
  });

  test("Number 5", async() => {
    const numberFive = dom.window.document.querySelector("[data-num='5']");

    await numberFive.click();

    const result = dom.window.document.querySelector("#viewer");

    expect(result.innerHTML).toBe("5");
  });

  test("Number 6", async() => {
    const numberSix = dom.window.document.querySelector("[data-num='6']");

    await numberSix.click();

    const result = dom.window.document.querySelector("#viewer");

    expect(result.innerHTML).toBe("6");
  });

  test("Number 7", async() => {
    const numberSeven = dom.window.document.querySelector("[data-num='7']");

    await numberSeven.click();

    const result = dom.window.document.querySelector("#viewer");

    expect(result.innerHTML).toBe("7");
  });

  test("Number 8", async() => {
    const numberEight = dom.window.document.querySelector("[data-num='8']");

    await numberEight.click();

    const result = dom.window.document.querySelector("#viewer");

    expect(result.innerHTML).toBe("8");
  });

  test("Number 9", async() => {
    const numberNine = dom.window.document.querySelector("[data-num='9']");

    await numberNine.click();

    const result = dom.window.document.querySelector("#viewer");

    expect(result.innerHTML).toBe("9");
  });
});