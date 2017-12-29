import { ofRoman } from "./numerals";

describe("The ofRoman function", () => {
  it("translates the empty string to 0", () => {
    expect(ofRoman("")).toBe(0);
  });

  it("translates XVII to 17", () => {
    expect(ofRoman("XVII")).toBe(17);
  });

  it("translates CMXXXIV to 934", () => {
    expect(ofRoman("CMXXXIV")).toBe(934);
  });
});
