import { render } from "enzyme";
import React from "react";

import EpigramEditor from "./EpigramEditor";

describe("The EpigramEditor component", () => {
  describe("on an initial load", () => {
    it("matches the snapshot", () => {
      const epigram = {};
      const wrapper = render(
        <EpigramEditor
          epigram={epigram}
          onSave={() => {}}
          goToSelectPage={() => {}}
        />
      );

      expect(wrapper).toMatchSnapshot();
    });
  });
});
