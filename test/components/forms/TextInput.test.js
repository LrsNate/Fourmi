import { render } from "enzyme";
import React from "react";
import { Form } from "react-final-form";

import TextInput from "../../../src/renderer/components/forms/TextInput";

describe("The TextInput component", () => {
  describe("On an initial load", () => {
    it("matches the snapshot", () => {
      const wrapper = render(
        <Form onSubmit={() => {}}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <TextInput label="Some label" name="someName" />
            </form>
          )}
        </Form>
      );

      expect(wrapper).toMatchSnapshot();
    });
  });
});
