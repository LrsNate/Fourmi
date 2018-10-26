import produce from "immer";
import {
  LoadEpigramsAction,
  loadEpigramsType,
  SaveEpigramAction, saveEpigramType
} from "../actions/epigrams";
import { Epigram } from "../constants/types";

export type EpigramsState = { [key: string]: Epigram };

type EpigramsAction = LoadEpigramsAction | SaveEpigramAction;

export default function epigrams(state = {}, action: EpigramsAction) {
  switch (action.type) {
    case loadEpigramsType:
      return (action as LoadEpigramsAction).epigrams;
    case saveEpigramType:
      return produce(state, (draft: EpigramsState) => {
        const { epigram } = action as SaveEpigramAction;
        draft[epigram._id] = epigram;
      });
    default:
      return state;
  }
}
