import traverse from "traverse";
import { Epigram } from "../../constants/types";
import { SearchQuery } from "../../reducers/search";

export const allFilters = [
  { name: "Auteur", key: "author" },
  { name: "Référence", key: "reference" },
  { name: "Titre", key: "title" },
  { name: "Mètre", key: "meter" },
  { name: "Strophe", key: "stanza" },
  { name: "Destinataire", key: "addressee" },
  { name: "Thème", key: "themes" },
  { name: "Texte latin", key: "latinText" },
  { name: "Texte français", key: "frenchText" },
  { name: "Notes", key: "notes" }
];

export function filterEpigrams(epigrams: Epigram[], query: SearchQuery) {
  return filterByTerms(epigrams, query);
}

export const filterByTerms = (epigrams: Epigram[], query: SearchQuery) => {
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
