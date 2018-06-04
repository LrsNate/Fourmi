import { Action, Dispatch } from "redux";

import {
  checkIfFileExists,
  createFolder,
  downloadFile,
  getDataFolderPath
} from "../lib/files";

export const databaseReadyType = "database:ready";

export interface DatabaseReadyAction extends Action<string> {}

export const ensureDatabaseExistsAction = () => (dispatch: Dispatch) => {
  const dataFolderPath = getDataFolderPath();
  const databasePath = `${dataFolderPath}/epigrams.db`;

  return createFolder(dataFolderPath)
    .then(() => checkIfFileExists(databasePath))
    .then(dbExists => downloadDatabase(dbExists, databasePath))
    .then(() => dispatch({ type: databaseReadyType }));
};

const downloadDatabase = (dbExists: boolean, databasePath: string) => {
  return new Promise(resolve => {
    if (dbExists) {
      resolve();
    } else {
      downloadFile(
        "https://s3-eu-west-1.amazonaws.com/martial-db-versions/epigrams.db",
        databasePath
      ).then(() => resolve());
    }
  });
};
