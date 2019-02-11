import produce from "immer";
import { LoadCorporaAction, loadCorporaType } from "../actions/corpora";
import { DatabaseReadyAction, databaseReadyType } from "../actions/database";
import { LoadEpigramsAction, loadEpigramsType } from "../actions/epigrams";

export enum LoadingStatus {
  Loading,
  Ready
}

export interface ApplicationState {
  databaseStatus: LoadingStatus;
  epigramsStatus: LoadingStatus;
  corporaStatus: LoadingStatus;
}

const emptyState = {
  databaseStatus: LoadingStatus.Loading,
  epigramsStatus: LoadingStatus.Loading,
  corporaStatus: LoadingStatus.Loading
};

type ApplicationAction =
  | DatabaseReadyAction
  | LoadEpigramsAction
  | LoadCorporaAction;

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
    case loadCorporaType:
      return produce(state, draft => {
        draft.corporaStatus = LoadingStatus.Ready;
      });
    default:
      return state;
  }
}
