import produce from "immer";
import {
  LoadCorporaAction,
  loadCorporaType,
  SaveCorpusAction,
  saveCorpusType
} from "../actions/corpora";
import { Corpora } from "../constants/types";

export type CorporaState = Corpora;
export type CorporaAction = LoadCorporaAction | SaveCorpusAction;

export default function corpora(
  state: CorporaState = {},
  action: CorporaAction
) {
  switch (action.type) {
    case loadCorporaType:
      return (action as LoadCorporaAction).corpora;
    case saveCorpusType:
      return produce<CorporaState>(state, draft => {
        const { corpus } = action as SaveCorpusAction;
        draft[corpus._id] = corpus;
      });
    default:
      return state;
  }
}
