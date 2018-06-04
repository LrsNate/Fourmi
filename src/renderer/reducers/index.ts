import { combineReducers } from "redux";

import application, { ApplicationState } from "./application";
import epigrams, { EpigramsState } from "./epigrams";

export interface RootState {
  application: ApplicationState;
  epigrams: EpigramsState;
}

export default combineReducers({ application, epigrams });
