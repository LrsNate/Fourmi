import _ from "lodash";

import { Epigram, Epigrams } from "../../constants/types";
import { ofRoman } from "../numerals";

export const sortEpigrams = (docs: Epigrams) =>
  _.sortBy(Object.values(docs), doc => getSortKey(docs, doc));

export const getSortKey = (docs: Epigrams, doc: Epigram) => {
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
    _.padStart(bookNumeral.toString(), 4, "0"),
    _.padStart(pageCore.toString(), 4, "0") + pageSuffix,
    author === "Martial" ? "a" : author.toLowerCase()
  ];
};

export const resolveOrigin = (docs: Epigrams, doc: Epigram) => {
  if (doc.author === "Martial") {
    return doc.reference;
  }
  if (doc.originId) {
    const originWork = docs[doc.originId];
    if (originWork.author === "Martial") {
      return originWork.reference;
    }
  }
  return null;
};
