import { JSDOM } from "jsdom";

export const getEpigramTitle = epigram => {
  const { author, reference, title } = epigram;
  const core = `${author} - ${reference}`;
  return title ? `${core}: ${title}` : core;
};

export const getEpigramIncipit = epigram => {
  const text = epigram.latinText || epigram.frenchText;
  const [line] = text.split(/\n/);
  const { window: { document } } = new JSDOM(line);

  return document.querySelector("p").textContent;
};
