import padStart from "lodash/padStart";
import sortBy from "lodash/sortBy";
import traverse from "traverse";

import { ofRoman } from "./numerals";

export const sortEpigrams = epigrams =>
  sortBy(epigrams, doc => getSortKey(epigrams, doc));

export const filterEpigrams = (epigrams, query) => {
  const searchTerms = query.phrase.split(/\s+/);
  console.log(searchTerms);
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

export const getSortKey = (docs, doc) => {
  const { author } = doc;
  const originReference = resolveOrigin(docs, doc);

  if (originReference === null) {
    return ["9999", "9999", author ? author.toLowerCase() : "zzzz"];
  }

  const [book, page] = originReference.split(", ");

  const bookNumeral = book === "De Spectaculis" ? 0 : ofRoman(book);
  const pageCore = parseInt(page, 10);
  const pageSuffix = page.substr(Math.ceil(Math.log10(pageCore)));

  return [
    padStart(bookNumeral, 4, "0"),
    padStart(pageCore, 4, "0") + pageSuffix,
    author === "Martial" ? "a" : author.toLowerCase()
  ];
};

export const resolveOrigin = (docs, doc) => {
  if (doc.author === "Martial") {
    return doc.reference;
  }
  if (doc.originId) {
    const originWork = docs.find(o => doc.originId === o._id);
    if (originWork.author === "Martial") {
      return originWork.reference;
    }
  }
  return null;
};
