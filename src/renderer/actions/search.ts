import { Action } from "redux";
import { Filter } from "../reducers/search";

export const addFilterType = "search:addFilter";

export interface AddFilterAction extends Action<string> {
  filter: Filter;
}

export const addFilterAction = (filter: Filter) => ({
  filter,
  type: addFilterType
});

export const setSearchPhraseType = "search:setPhrase";

export interface SetSearchPhraseAction extends Action<string> {
  phrase: string;
}

export const setSearchPhraseAction = (phrase: string) => ({
  phrase,
  type: setSearchPhraseType
});

export const resetSearchQueryType = "search:reset";

export interface ResetSearchQueryAction extends Action<string> {}

export const resetSearchQueryAction = () => ({ type: resetSearchQueryType });
