const { JSDOM } = require("jsdom");
const fs = require("fs");

let dom;
describe("Calculator tests", () => {
  beforeAll(() => {
    const html = fs.readFileSync("./src/index.html", "utf-8");
    dom = new JSDOM(html, {runScripts: "dangerously"})
  });

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
});