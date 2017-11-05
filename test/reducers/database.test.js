import databaseReducer, { initialState } from "../../app/reducers/database";

describe("The initial state", () => {
  it("has an empty status history", () => {
    expect(initialState).toEqual({ statusHistory: [] });
  });
});

describe("The database reducer", () => {
  it("adds `DATABASE_FOLDER_FOUND` to the status history", () => {
    const initialState = {
      statusHistory: ["EXISTING_ACTION"]
    };
    const action = { type: "DATABASE_FOLDER_FOUND" };

    const state = databaseReducer(initialState, action);

    expect(state).toEqual({
      statusHistory: ["EXISTING_ACTION", "DATABASE_FOLDER_FOUND"]
    });
  });

  it("adds `DATABASE_FOLDER_NOT_FOUND` to the status history", () => {
    const initialState = {
      statusHistory: ["EXISTING_ACTION"]
    };
    const action = { type: "DATABASE_FOLDER_NOT_FOUND" };

    const state = databaseReducer(initialState, action);

    expect(state).toEqual({
      statusHistory: ["EXISTING_ACTION", "DATABASE_FOLDER_NOT_FOUND"]
    });
  });

  it("adds `DATABASE_FOLDER_READY` to the status history", () => {
    const initialState = {
      statusHistory: ["EXISTING_ACTION"]
    };
    const action = { type: "DATABASE_FOLDER_READY" };

    const state = databaseReducer(initialState, action);

    expect(state).toEqual({
      statusHistory: ["EXISTING_ACTION", "DATABASE_FOLDER_READY"]
    });
  });

  it("adds `DATABASE_FOUND` to the status history", () => {
    const initialState = {
      statusHistory: ["EXISTING_ACTION"]
    };
    const action = { type: "DATABASE_FOUND" };

    const state = databaseReducer(initialState, action);

    expect(state).toEqual({
      statusHistory: ["EXISTING_ACTION", "DATABASE_FOUND"]
    });
  });

  it("adds `DATABASE_NOT_FOUND` to the status history", () => {
    const initialState = {
      statusHistory: ["EXISTING_ACTION"]
    };
    const action = { type: "DATABASE_NOT_FOUND" };

    const state = databaseReducer(initialState, action);

    expect(state).toEqual({
      statusHistory: ["EXISTING_ACTION", "DATABASE_NOT_FOUND"]
    });
  });

  it("adds `DATABASE_READY` to the status history", () => {
    const initialState = {
      statusHistory: ["EXISTING_ACTION"]
    };
    const action = { type: "DATABASE_READY" };

    const state = databaseReducer(initialState, action);

    expect(state).toEqual({
      statusHistory: ["EXISTING_ACTION", "DATABASE_READY"]
    });
  });

  it("initializes to the initial state", () => {
    const action = { type: "@@INIT" };

    const state = databaseReducer(undefined, action);

    expect(state).toEqual(initialState);
  });

  it("ignores unknown actions", () => {
    const initialState = { foo: "bar" };
    const action = { type: "foo" };

    const state = databaseReducer(initialState, action);

    expect(state).toEqual(initialState);
  });
});
