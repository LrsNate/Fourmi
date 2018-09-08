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
      return { ...state, databaseStatus: LoadingStatus.Ready };
    case loadEpigramsType:
      return { ...state, epigramsStatus: LoadingStatus.Ready };
    default:
      return state;
  }
}
