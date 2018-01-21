import {
  discardDraftType,
  saveDraftType,
  saveOriginIdType
} from "../constants/actions";

export const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case discardDraftType:
      return initialState;
    case saveDraftType:
      return action.draft;
    case saveOriginIdType:
      return { ...state, originId: action.originId };
    default:
      return state;
  }
};
