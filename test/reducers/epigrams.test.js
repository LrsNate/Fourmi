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
});
