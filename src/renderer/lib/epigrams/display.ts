import { JSDOM } from "jsdom";
import { Epigram } from "../../constants/types";

export const getEpigramTitle = (epigram: Epigram) => {
  const { author, reference, title } = epigram;
  const core = `${author} - ${reference}`;
  return title ? `${core}: ${title}` : core;
};

export const getEpigramIncipit = (epigram: Epigram) => {
  const text = epigram.latinText || epigram.frenchText;
  const [line] = text.split(/\n/);
  const {
    window: { document }
  } = new JSDOM(line);

  const firstLine = document.querySelector("p");
  const firstLineText = (firstLine && firstLine.textContent) || "";

  if (firstLineText.length < 50) {
    return firstLineText;
  }
  return `${firstLineText.substring(0, 50)}...`;
};
