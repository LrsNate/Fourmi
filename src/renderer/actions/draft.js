import {
  discardDraftType,
  saveDraftType,
  saveOriginIdType
} from "../constants/actions";

export const discardDraftAction = () => ({ type: discardDraftType });

export const saveDraftAction = draft => ({ type: saveDraftType, draft });

export const saveOriginIdAction = originId => ({
  type: saveOriginIdType,
  originId
});
