import { render } from "enzyme";
import React from "react";

import EpigramEditor from "../../../app/components/epigramEditor/EpigramEditor";

describe("The EpigramEditor component", () => {
  describe("on an initial load", () => {
    it("matches the snapshot", () => {
      const epigram = {};
      const wrapper = render(
        <EpigramEditor epigram={epigram} onSave={() => {}} />
      );

      expect(wrapper).toMatchSnapshot();
    });
  });
});
