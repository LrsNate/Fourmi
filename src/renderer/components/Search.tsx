import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Epigram } from "../constants/types";
import { sortEpigrams } from "../lib/epigrams/sort";
import { RootState } from "../reducers";
import { editRoutePath } from "../routes";
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
  public render() {
    const { epigrams } = this.props;

    return (
      <Page title="Search">
        <p>Search</p>
        {epigrams.slice(0, 20).map(e => (
          <p key={e._id}>
            <Link to={editRoutePath(e._id)}>{e._id}</Link>
          </p>
        ))}
      </Page>
    );
  }
}

export default connect(mapStateToProps)(Search);
