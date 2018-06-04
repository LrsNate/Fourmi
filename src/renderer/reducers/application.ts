import { DatabaseReadyAction, databaseReadyType } from "../actions/database";
import { LoadEpigramsAction, loadEpigramsType } from "../actions/epigrams";

export enum LoadingStatus {
  Loading,
  Ready
}

export class ApplicationState {
  readonly databaseStatus: LoadingStatus;
  readonly epigramsStatus: LoadingStatus;

  private constructor(
    databaseStatus: LoadingStatus,
    epigramsStatus: LoadingStatus
  ) {
    this.databaseStatus = databaseStatus;
    this.epigramsStatus = epigramsStatus;
  }

  public static empty() {
    return new ApplicationState(LoadingStatus.Loading, LoadingStatus.Loading);
  }

  public withDatabaseReady() {
    return new ApplicationState(LoadingStatus.Ready, this.epigramsStatus);
  }

  public withEpigramsReady() {
    return new ApplicationState(this.databaseStatus, LoadingStatus.Ready);
  }
}

type ApplicationAction = DatabaseReadyAction | LoadEpigramsAction;

export default function application(
  state: ApplicationState = ApplicationState.empty(),
  action: ApplicationAction
) {
  switch (action.type) {
    case databaseReadyType:
      return state.withDatabaseReady();
    case loadEpigramsType:
      return state.withEpigramsReady();
    default:
      return state;
  }
}
