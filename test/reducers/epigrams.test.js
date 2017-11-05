import epigramsReducer, { initialState } from "../../app/reducers/epigrams";

describe("The initial state", () => {
  it("has a loading status and an empty epigrams store", () => {
    expect(initialState).toEqual({ status: "LOADING", epigrams: [] });
  });
});

describe("The epigrams reducer", () => {
  it("loads epigrams", () => {
    const action = { type: "LOAD_EPIGRAMS", epigrams: ["a", "b", "c"] };

    const state = epigramsReducer(initialState, action);

    expect(state).toEqual({ status: "LOADED", epigrams: ["a", "b", "c"] });
  });

  it("initializes to the initial state", () => {
    const action = { type: "@@INIT" };

    const state = epigramsReducer(undefined, action);

    expect(state).toEqual(initialState);
  });

  it("ignores unknown actions", () => {
    const initialState = { foo: "bar" };
    const action = { type: "foo" };

    const state = epigramsReducer(initialState, action);

    expect(state).toEqual(initialState);
  });
});
