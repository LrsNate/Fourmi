import { Corpora, Corpus } from "../constants/types";

export function sortCorpora(corpora: Corpora): Corpus[] {
  return Object.values(corpora).sort((a, b) => a.title.localeCompare(b.title));
}
