import { render } from "enzyme";
import React from "react";
import TextTypography from "./TextTypography";

describe("The TextTypography component", () => {
  describe("on an initial load", () => {
    it("matches the snapshot", () => {
      const wrapper = render(<TextTypography>Some text</TextTypography>);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
