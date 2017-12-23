import {
  databaseFolderFoundType,
  databaseFolderNotFoundType,
  databaseFolderReadyType,
  databaseFoundType,
  databaseNotFoundType,
  databaseReadyType
} from "../constants/actions";

export const initialState = {
  statusHistory: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case databaseFolderFoundType:
    case databaseFolderNotFoundType:
    case databaseFolderReadyType:
    case databaseFoundType:
    case databaseNotFoundType:
    case databaseReadyType:
      return {
        ...state,
        statusHistory: [...state.statusHistory, action.type]
      };
    default:
      return state;
  }
};
