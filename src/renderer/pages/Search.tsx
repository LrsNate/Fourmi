import { Grid } from "@material-ui/core";
import * as React from "react";
import { connect } from "react-redux";
import {
  addFilterAction,
  resetSearchQueryAction,
  setSearchPhraseAction
} from "../actions/search";
import EpigramView from "../components/epigramView/EpigramView";
import Page from "../components/Page";
import SearchCard from "../components/searchCard/SearchCard";
import { Dispatch, Epigram } from "../constants/types";
import { filterEpigrams } from "../lib/epigrams/filter";
import { sortEpigrams } from "../lib/epigrams/sort";
import { RootState } from "../reducers";
import { Filter, SearchQuery } from "../reducers/search";

function mapStateToProps(state: RootState) {
  const query = state.search;
  return {
    epigrams: filterEpigrams(sortEpigrams(state.epigrams), query),
    query
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    addFilter(filter: Filter) {
      dispatch(addFilterAction(filter));
    },
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
  addFilter: (filter: Filter) => void;
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
    const {
      epigrams,
      query,
      addFilter,
      resetSearchQuery,
      setSearchPhrase
    } = this.props;

    return (
      <Page title="Search">
        <Grid container direction="column" spacing={8}>
          <Grid item>
            <SearchCard
              query={query}
              results={epigrams}
              addFilter={addFilter}
              setSearchPhrase={setSearchPhrase}
              resetSearchQuery={resetSearchQuery}
            />
          </Grid>
          {epigrams.slice(0, 20).map((e: Epigram) => (
            <Grid item key={e._id}>
              <EpigramView
                epigram={e}
                showEditLink
                filterByImitations={this.filterByImitations}
              />
            </Grid>
          ))}
        </Grid>
      </Page>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
