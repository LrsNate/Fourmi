import { loadEpigramsType } from "./types/epigrams";

// eslint-disable-next-line import/prefer-default-export
export const loadEpigramsAction = () => ({
  type: loadEpigramsType,
  epigrams: []
});
