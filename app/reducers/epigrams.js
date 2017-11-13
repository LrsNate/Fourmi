import { loadEpigramsType } from "../constants/actions/epigrams";
import {
  epigramsLoadedStatus,
  epigramsLoadingStatus
} from "../constants/reducers/epigrams";

export const initialState = { status: epigramsLoadingStatus, epigrams: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case loadEpigramsType:
      return { status: epigramsLoadedStatus, epigrams: action.epigrams };
    default:
      return state;
  }
};
