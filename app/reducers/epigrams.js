import { loadEpigramsType } from "../actions/types/epigrams";

export const initialState = { status: "LOADING", epigrams: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case loadEpigramsType:
      return { status: "LOADED", epigrams: action.epigrams };
    default:
      return state;
  }
};
