import produce from "immer";
import {
  DeleteCorpusAction,
  deleteCorpusType,
  LoadCorporaAction,
  loadCorporaType,
  SaveCorpusAction,
  saveCorpusType
} from "../actions/corpora";
import { Corpora } from "../constants/types";

export type CorporaState = Corpora;

export type CorporaAction =
  | LoadCorporaAction
  | SaveCorpusAction
  | DeleteCorpusAction;

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
    case deleteCorpusType:
      return produce<CorporaState>(state, draft => {
        const { id } = action as DeleteCorpusAction;
        delete draft[id];
      });
    default:
      return state;
  }
}
