import { LoadCorporaAction, loadCorporaType } from "../actions/corpora";
import { Corpora } from "../constants/types";

export type CorporaState = Corpora;
export type CorporaAction = LoadCorporaAction;

export default function corpora(
  state: CorporaState = {},
  action: CorporaAction
) {
  switch (action.type) {
    case loadCorporaType:
      return (action as LoadCorporaAction).corpora;
    default:
      return state;
  }
}
