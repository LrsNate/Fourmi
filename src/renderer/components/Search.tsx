import * as React from "react";
import { connect } from "react-redux";
import { Epigram } from "../constants/types";
import { sortEpigrams } from "../lib/epigrams/sort";
import { RootState } from "../reducers";
import EpigramView from "./epigramView/EpigramView";
import Page from "./Page";

function mapStateToProps(state: RootState) {
  return {
    epigrams: sortEpigrams(state.epigrams)
  };
}

interface SearchProps {
  epigrams: Epigram[];
}

class Search extends React.Component<SearchProps> {
  public filterByImitations = () => {
    // Nothing
  };

  public render() {
    const { epigrams } = this.props;

    return (
      <Page title="Search">
        <p>Search</p>
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

export default connect(mapStateToProps)(Search);
