import { loadEpigramsType, searchEpigramsType } from "../constants/actions";
import { filterEpigrams } from "../lib/epigrams/filter";

export const initialState = { query: { phrase: "" }, results: {} };

export default (state = initialState, action) => {
  switch (action.type) {
    case loadEpigramsType:
      return { ...state, results: action.epigrams };
    case searchEpigramsType: {
      const { query, epigrams } = action;
      return { query, results: filterEpigrams(epigrams, query) };
    }
    default:
      return state;
  }
};
