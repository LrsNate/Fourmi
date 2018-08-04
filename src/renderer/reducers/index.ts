import { combineReducers } from "redux";

import application, { ApplicationState } from "./application";
import epigrams, { EpigramsState } from "./epigrams";
import search, { SearchQuery } from "./search";

export interface RootState {
  application: ApplicationState;
  epigrams: EpigramsState;
  search: SearchQuery;
}

export default combineReducers({ application, epigrams, search });
