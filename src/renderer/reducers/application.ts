import produce from "immer";
import { DatabaseReadyAction, databaseReadyType } from "../actions/database";
import { LoadEpigramsAction, loadEpigramsType } from "../actions/epigrams";

export enum LoadingStatus {
  Loading,
  Ready
}

export interface ApplicationState {
  databaseStatus: LoadingStatus;
  epigramsStatus: LoadingStatus;
}

const emptyState = {
  databaseStatus: LoadingStatus.Loading,
  epigramsStatus: LoadingStatus.Loading
};

type ApplicationAction = DatabaseReadyAction | LoadEpigramsAction;

export default function application(
  state: ApplicationState = emptyState,
  action: ApplicationAction
): ApplicationState {
  switch (action.type) {
    case databaseReadyType:
      return produce(state, draft => {
        draft.databaseStatus = LoadingStatus.Ready;
      });
    case loadEpigramsType:
      return produce(state, draft => {
        draft.epigramsStatus = LoadingStatus.Ready;
      });
    default:
      return state;
  }
}
