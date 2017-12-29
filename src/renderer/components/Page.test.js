import { mount, render } from "enzyme";
import React from "react";

import {
  mapDispatchToProps,
  mapStateToProps,
  Page
} from "./Page";

jest.mock("react-router-redux", () => ({
  goBack() {
    return { type: "GO_BACK" };
  }
}));

const props = {
  classes: {
    appBarLeftButton: "appBarLeftButton",
    pageContent: "pageContent"
  },
  title: "Some page"
};

describe("The Page component", () => {
  describe("on an initial load", () => {
    it("matches the snapshot", () => {
      expect(
        render(
          <Page {...props}>
            <p>Some content</p>
          </Page>
        )
      ).toMatchSnapshot();
    });
  });

  describe("with the default goBack handler", () => {
    it("does nothing when clicking the back button", () => {
      const wrapper = mount(<Page {...props} />);
      wrapper.find("button.appBarLeftButton").simulate("click");
    });
  });

  describe("with a provided goBack handler", () => {
    it("calls the handler when clicking the back button", () => {
      const goBack = jest.fn(() => {});
      const wrapper = mount(<Page {...props} goBack={goBack} />);
      wrapper.find("button.appBarLeftButton").simulate("click");

      expect(goBack).toHaveBeenCalledTimes(1);
    });
  });
});

describe("The mapStateToProps function", () => {
  it("returns the original props", () => {
    expect(mapStateToProps({ a: "a" }, { b: "b" })).toEqual({ b: "b" });
  });
});

describe("The mapDispatchToProps function", () => {
  it("dispatches the goBack function", () => {
    const dispatch = jest.fn(i => i);
    const { goBack } = mapDispatchToProps(dispatch);

    goBack();

    expect(dispatch).toHaveBeenCalledWith({ type: "GO_BACK" });
  });
});
