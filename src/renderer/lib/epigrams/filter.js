import _ from "lodash";
import traverse from "traverse";

export const filterEpigrams = (epigrams, query) => {
  const filters = [filterByTerms, filterByOrigin, filterByField];

  return filters.reduce(
    (epigrams, filter) => filter(epigrams, query),
    epigrams
  );
};

export const filterByTerms = (epigrams, query) => {
  const { phrase } = query;

  if (!phrase) {
    return epigrams;
  }

  const searchTerms = phrase.split(/\s+/);
  if (searchTerms.length === 0) {
    return epigrams;
  }

  return epigrams.filter(epigram => {
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

  return epigrams.filter(
    epigram => epigram._id === originId || epigram.originId === originId
  );
};

export const filterByField = (epigrams, query) => {
  const filters = Object.entries(_.omit(query, ["originId", "phrase"]));

  return epigrams.filter(epigram => {
    return filters.every(([key, term]) => {
      return (
        epigram[key] === term ||
        (_.isString(epigram[key]) && epigram[key].includes(term)) ||
        (_.isArray(epigram[key]) && epigram[key].some(t => t.includes(term)))
      );
    });
  });
};
