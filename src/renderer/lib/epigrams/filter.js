import pickBy from "lodash/pickBy";
import traverse from "traverse";

export const filterEpigrams = (epigrams, query) => {
  const filters = [filterByTerms, filterByOrigin];

  return filters.reduce(
    (epigrams, filter) => filter(epigrams, query),
    epigrams
  );
};

export const filterByTerms = (epigrams, query) => {
  const searchTerms = query.phrase.split(/\s+/);
  if (searchTerms.length === 0) {
    return epigrams;
  }

  return pickBy(epigrams, epigram => {
    return searchTerms.every(term => {
      return traverse(epigram).reduce(function(acc, value) {
        if (this.notLeaf) {
          return acc;
        }
        return acc || (typeof value === "string" && value.includes(term));
      }, false);
    });
  });
};

export const filterByOrigin = (epigrams, query) => {
  const { originId } = query;
  if (!originId) {
    return epigrams;
  }

  return pickBy(
    epigrams,
    epigram => epigram._id === originId || epigram.originId === originId
  );
};
