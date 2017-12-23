import {
  loadEpigramsAction,
  saveEpigramAction
} from "../../src/renderer/actions/epigrams";

jest.mock("nedb");
jest.mock("os");

describe("The loadEpigrams action", () => {
  it("fetches epigrams from the database", () => {
    const dispatch = jest.fn(i => i);

    return loadEpigramsAction()(dispatch).then(({ type, epigrams }) => {
      expect(type).toBe("LOAD_EPIGRAMS");
      expect(epigrams).toEqual([{ _id: "a" }, { _id: "b" }, { _id: "c" }]);
    });
  });
});

describe("The saveEpigrams action", () => {
  it("persists an epigram to the database", () => {
    const dispatch = jest.fn(i => i);
    const doc = { a: "a", b: 2 };

    return saveEpigramAction(doc)(dispatch).then(({ type, epigram }) => {
      expect(type).toBe("SAVE_EPIGRAM");
      expect(epigram).toEqual(doc);
    });
  });
});
