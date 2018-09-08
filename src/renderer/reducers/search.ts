import {
  AddFilterAction,
  addFilterType, DeleteFilterAction, deleteFilterType,
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

export class SearchQuery {
  public readonly phrase: string;
  public readonly filters: Filter[];

  private constructor(phrase: string, filters: Filter[]) {
    this.phrase = phrase;
    this.filters = filters;
  }

  public static empty() {
    return new SearchQuery("", []);
  }

  public withFilter(filter: Filter) {
    return new SearchQuery(this.phrase, [...this.filters, filter]);
  }

  public withoutFilter(field: string) {
    return new SearchQuery(
      this.phrase,
      this.filters.filter((f: Filter) => f.field !== field)
    );
  }

  public withSearchPhrase(phrase: string) {
    return new SearchQuery(phrase, this.filters);
  }
}

type SearchAction =
  | AddFilterAction
  | DeleteFilterAction
  | SetSearchPhraseAction
  | ResetSearchQueryAction;

export default function search(
  state: SearchQuery = SearchQuery.empty(),
  action: SearchAction
) {
  switch (action.type) {
    case addFilterType:
      return state.withFilter((action as AddFilterAction).filter);
    case deleteFilterType:
      return state.withoutFilter((action as DeleteFilterAction).field);
    case setSearchPhraseType:
      return state.withSearchPhrase((action as SetSearchPhraseAction).phrase);
    case resetSearchQueryType:
      return SearchQuery.empty();
    default:
      return state;
  }
}
