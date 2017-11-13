import {
  databaseFolderFoundType,
  databaseFolderNotFoundType,
  databaseFolderReadyType,
  databaseFoundType,
  databaseNotFoundType,
  databaseReadyType
} from "../constants/actions/database";
import {
  checkIfFileExists,
  checkIfFolderExists,
  createFolder,
  downloadFile,
  getDataFolderPath
} from "../lib/files";

export const ensureDatabaseFolderExistsAction = () => dispatch => {
  const dataFolderPath = getDataFolderPath();

  return checkIfFolderExists(dataFolderPath)
    .then(folderFound =>
      dispatch({
        type: folderFound ? databaseFolderFoundType : databaseFolderNotFoundType
      })
    )
    .then(() => createFolder(dataFolderPath))
    .then(() => dispatch({ type: databaseFolderReadyType }));
};

export const ensureDatabaseExistsAction = () => dispatch => {
  const databasePath = `${getDataFolderPath()}/epigrams.db`;

  return checkIfFileExists(databasePath)
    .then(fileFound =>
      dispatch({ type: fileFound ? databaseFoundType : databaseNotFoundType })
    )
    .then(({ type: status }) => downloadDatabase(status, databasePath))
    .then(() => dispatch({ type: databaseReadyType }));
};

const downloadDatabase = (status, databasePath) => {
  return new Promise(resolve => {
    if (status === databaseFoundType) {
      resolve(databaseReadyType);
    } else {
      downloadFile(
        "https://s3-eu-west-1.amazonaws.com/martial-db-versions/20170119232140000-incompressible-spoon",
        databasePath
      ).then(() => resolve(databaseReadyType));
    }
  });
};
