export const getEpigramTitle = epigram => {
  const { author, reference, title } = epigram;
  const core = `${author} - ${reference}`;
  return title ? `${core}: ${title}` : core;
};
