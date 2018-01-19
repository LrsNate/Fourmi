import { discardDraftType, saveDraftType } from "../constants/actions";

export const discardDraftAction = () => ({ type: discardDraftType });

export const saveDraftAction = draft => ({ type: saveDraftType, draft });
