import { loadEpigramsAction } from "../../app/actions/epigrams";

jest.mock("nedb");
jest.mock("os");

describe("The loadEpigrams action", () => {
  it("fetches epigrams from the database", () => {
    const dispatch = jest.fn(i => i);

    return loadEpigramsAction()(dispatch).then(({ type, epigrams }) => {
      expect(type).toBe("LOAD_EPIGRAMS");
      expect(epigrams).toEqual(["a", "b", "c"]);
    });
  });
});
