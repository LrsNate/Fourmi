import produce from "immer";
import {
  AddFilterAction,
  addFilterType,
  DeleteFilterAction,
  deleteFilterType,
  ResetSearchQueryAction,
  resetSearchQueryType,
  SetSearchPhraseAction,
  setSearchPhraseType
} from "../actions/search";

export interface Filter {
  field: string;
  caseSensitive: boolean;
  term: string;
}

export interface SearchQuery {
  phrase: string;
  filters: Filter[];
}

const emptyQuery = { phrase: "", filters: [] };

type SearchAction =
  | AddFilterAction
  | DeleteFilterAction
  | SetSearchPhraseAction
  | ResetSearchQueryAction;

export default function search(
  state: SearchQuery = emptyQuery,
  action: SearchAction
): SearchQuery {
  switch (action.type) {
    case addFilterType:
      return produce(state, draft => {
        draft.filters.push((action as AddFilterAction).filter);
      });
    case deleteFilterType:
      return produce(state, draft => {
        draft.filters = draft.filters.filter(
          filter => filter.field === (action as DeleteFilterAction).field
        );
      });
    case setSearchPhraseType:
      return { ...state, phrase: (action as SetSearchPhraseAction).phrase };
    case resetSearchQueryType:
      return emptyQuery;
    default:
      return state;
  }
}
