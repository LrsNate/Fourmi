import { combineReducers } from "redux";
import epigrams, { EpigramsState } from "./epigrams";

export interface RootState {
  epigrams: EpigramsState;
}

export default combineReducers({ epigrams })
