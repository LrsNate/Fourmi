import * as React from "react";
import { connect } from "react-redux";
import {
  resetSearchQueryAction,
  setSearchPhraseAction
} from "../actions/search";
import { Dispatch, Epigram } from "../constants/types";
import { filterEpigrams } from "../lib/epigrams/filter";
import { sortEpigrams } from "../lib/epigrams/sort";
import { RootState } from "../reducers";
import { SearchQuery } from "../reducers/search";
import EpigramView from "./epigramView/EpigramView";
import Page from "./Page";
import SearchCard from "./searchCard/SearchCard";

function mapStateToProps(state: RootState) {
  const query = state.search;
  return {
    epigrams: filterEpigrams(sortEpigrams(state.epigrams), query),
    query
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    setSearchPhrase(phrase: string) {
      dispatch(setSearchPhraseAction(phrase));
    },
    resetSearchQuery() {
      dispatch(resetSearchQueryAction());
    }
  };
}

interface SearchProps {
  epigrams: Epigram[];
  query: SearchQuery;
  resetSearchQuery: () => void;
  setSearchPhrase: (phrase: string) => void;
}

class Search extends React.Component<SearchProps> {
  public componentDidMount() {
    this.props.resetSearchQuery();
  }
  public filterByImitations = () => {
    // Nothing
  };

  public render() {
    const { epigrams, query, resetSearchQuery, setSearchPhrase } = this.props;

    return (
      <Page title="Search">
        <SearchCard
          query={query}
          results={epigrams}
          setSearchPhrase={setSearchPhrase}
          resetSearchQuery={resetSearchQuery}
        />
        {epigrams
          .slice(0, 20)
          .map(e => (
            <EpigramView
              epigram={e}
              key={e._id}
              showEditLink={true}
              filterByImitations={this.filterByImitations}
            />
          ))}
      </Page>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
