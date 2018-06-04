import { LoadEpigramsAction, loadEpigramsType } from "../actions/epigrams";
import { Epigram } from "../constants/types";

export type EpigramsState = { [key: string]: Epigram };

type EpigramsAction = LoadEpigramsAction;

export default function epigrams(state = {}, action: EpigramsAction) {
  switch (action.type) {
    case loadEpigramsType:
      return action.epigrams;
    default:
      return state;
  }
}
