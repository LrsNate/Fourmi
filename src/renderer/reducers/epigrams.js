import keyBy from "lodash/keyBy";

import { loadEpigramsType, saveEpigramType } from "../constants/actions";
import {
  epigramsLoadedStatus,
  epigramsLoadingStatus
} from "../constants/reducers";

export const initialState = { status: epigramsLoadingStatus, epigrams: {} };

export default (state = initialState, action) => {
  switch (action.type) {
    case loadEpigramsType:
      return {
        status: epigramsLoadedStatus,
        epigrams: keyBy(action.epigrams, "_id")
      };
    case saveEpigramType:
      return {
        ...state,
        epigrams: {
          ...state.epigrams,
          [action.epigram._id]: action.epigram
        }
      };
    default:
      return state;
  }
};
