import { combineReducers } from "redux";

import application, { ApplicationState } from "./application";
import corpora, { CorporaState } from "./corpora";
import epigrams, { EpigramsState } from "./epigrams";
import search, { SearchQuery } from "./search";

export interface RootState {
  application: ApplicationState;
  epigrams: EpigramsState;
  corpora: CorporaState;
  search: SearchQuery;
}

export default combineReducers({ application, epigrams, corpora, search });
