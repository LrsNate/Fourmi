import { getSortKey, resolveOrigin, sortEpigrams } from "./sort";

describe("The sortEpigrams function", () => {
  it("sorts epigrams", () => {
    const epigrams = {
      id_1: {
        _id: "id_1",
        originId: "id_2",
        author: "aaa"
      },
      id_3: {
        _id: "id_3",
        reference: "III, 0",
        author: "Martial"
      },
      id_2: {
        _id: "id_2",
        reference: "De Spectaculis, 2",
        author: "Martial"
      },
      id_4: {
        _id: "id_4",
        originId: "id_3",
        author: "aaa"
      }
    };

    expect(sortEpigrams(epigrams).map(e => e._id)).toEqual([
      "id_2",
      "id_1",
      "id_3",
      "id_4"
    ]);
  });
});

describe("The getSortKey function", () => {
  describe("when the epigram has no origin", () => {
    describe("when the epigram has no author", () => {
      it("returns the last sort key", () => {
        expect(getSortKey([], {})).toEqual(["9999", "9999", "zzzz"]);
      });
    });

    describe("when the epigram has an author", () => {
      it("returns the last sort key with the author", () => {
        expect(getSortKey([], { author: "Knuth" })).toEqual([
          "9999",
          "9999",
          "knuth"
        ]);
      });
    });
  });

  describe("when the epigram has a Martial origin", () => {
    const epigram = { originId: "id_a" };

    it("returns a sort key with converted references and the author", () => {
      expect(
        getSortKey(
          { id_a: { _id: "id_a", reference: "I, 5", author: "Martial" } },
          {
            ...epigram,
            author: "Knuth"
          }
        )
      ).toEqual(["0001", "0005", "knuth"]);
    });

    it("treats `De Spectaculis` as book 0", () => {
      expect(
        getSortKey(
          {
            id_a: {
              _id: "id_a",
              reference: "De Spectaculis, 24",
              author: "Martial"
            }
          },
          {
            ...epigram,
            author: "Knuth"
          }
        )
      ).toEqual(["0000", "0024", "knuth"]);
    });

    it("treats `Martial` as author 0", () => {
      expect(
        getSortKey(
          {},
          {
            reference: "De Spectaculis, 24",
            author: "Martial"
          }
        )
      ).toEqual(["0000", "0024", "a"]);
    });
  });
});

describe("The resolveOrigin function", () => {
  describe("when the author is Martial", () => {
    it("returns the epigram's own reference", () => {
      const epigram = { reference: "a", author: "Martial" };

      expect(resolveOrigin({}, epigram)).toBe("a");
    });
  });

  describe("when the epigram has no origin", () => {
    it("returns null", () => {
      expect(resolveOrigin({}, {})).toBeNull();
    });
  });

  describe("when the epigram has a Martial origin", () => {
    it("returns the Martial origin reference", () => {
      const epigrams = {
        id_a: {
          _id: "id_a",
          reference: "ref_a",
          author: "Martial"
        }
      };

      expect(
        resolveOrigin(epigrams, {
          originId: "id_a"
        })
      ).toEqual("ref_a");
    });
  });

  describe("when the epigram has a non-Martial origin", () => {
    it("returns null", () => {
      const epigrams = {
        id_a: { _id: "id_a", reference: "ref_a" }
      };

      expect(resolveOrigin(epigrams, { originId: "id_a" })).toBeNull();
    });
  });
});
