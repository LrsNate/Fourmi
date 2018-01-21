import { discardDraftType, saveDraftType } from "../constants/actions";

export const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case discardDraftType:
      return initialState;
    case saveDraftType:
      return action.draft;
    default:
      return state;
  }
};
