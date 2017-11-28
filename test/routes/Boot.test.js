import { render, shallow } from "enzyme";
import React from "react";

import {
  Boot,
  mapDispatchToProps,
  mapStateToProps
} from "../../app/routes/Boot";

jest.mock("react-router-redux", () => ({
  push(path) {
    expect(path).toBe("/search");
    return Promise.resolve("redirectToSearchPage");
  }
}));

jest.mock("../../app/actions/database", () => ({
  ensureDatabaseFolderExistsAction: jest.fn(() =>
    Promise.resolve("ensureDatabaseFolderExists")
  ),
  ensureDatabaseExistsAction: jest.fn(() =>
    Promise.resolve("ensureDatabaseExists")
  )
}));

jest.mock("../../app/lib/files", () => ({
  getDataFolderPath: jest.fn(() => "/home/foo/stuff")
}));

describe("The boot component", () => {
  const messages = [
    "DATABASE_FOLDER_NOT_FOUND",
    "DATABASE_FOLDER_FOUND",
    "DATABASE_FOLDER_READY",
    "DATABASE_NOT_FOUND",
    "DATABASE_FOUND"
  ];

  it("matches the snapshot", () => {
    const rendered = render(
      <Boot messages={messages} initializeDatabase={jest.fn()} />
    );

    expect(rendered).toMatchSnapshot();
  });

  it("triggers a database initialization", () => {
    const initializeDatabase = jest.fn();

    shallow(
      <Boot
        messages={[...messages, "DATABASE_READY"]}
        initializeDatabase={initializeDatabase}
      />
    );

    expect(initializeDatabase).toHaveBeenCalled();
  });

  it("redirects to the search page when the database is ready", () => {
    const redirectToSearchPage = jest.fn();

    const wrapper = shallow(
      <Boot
        messages={messages}
        initializeDatabase={jest.fn()}
        redirectToSearchPage={redirectToSearchPage}
      />
    );
    wrapper.setProps({ messages: [...messages] });
    expect(redirectToSearchPage).toHaveBeenCalledTimes(0);
    wrapper.setProps({ messages: [...messages, "DATABASE_READY"] });

    expect(redirectToSearchPage).toHaveBeenCalled();
  });
});

describe("The mapStateToProps function", () => {
  it("transmits status history", () => {
    const state = { database: { statusHistory: ["foo", "bar"] } };

    const { messages } = mapStateToProps(state);

    expect(messages).toEqual(["foo", "bar"]);
  });
});

describe("The mapDispatchToProps function", () => {
  it("dispatches the database folder and file checks", () => {
    const dispatch = jest.fn(i => i);

    mapDispatchToProps(dispatch)
      .initializeDatabase()
      .then(dispatched => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatched).toBe("ensureDatabaseExists");
      });
  });

  it("dispatches the redirect to the search page", () => {
    const dispatch = jest.fn(i => i);

    mapDispatchToProps(dispatch)
      .redirectToSearchPage()
      .then(dispatched => {
        expect(dispatch).toHaveBeenCalled();
        expect(dispatched).toBe("redirectToSearchPage");
      });
  });
});
