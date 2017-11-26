import React, { Component } from "react";
import { connect } from "react-redux";
import { loadEpigramsAction } from "../actions/epigrams";
import { epigramsLoadingStatus } from "../constants/reducers/epigrams";

class Search extends Component {
  componentWillMount() {
    const { status, loadEpigrams } = this.props;
    if (status === epigramsLoadingStatus) {
      loadEpigrams();
    }
  }

  render() {
    const { status, epigrams } = this.props;
    return (
      <div>
        <p>{status}</p>
        <ul>{epigrams.map(e => <li key={e._id}>{e.title}</li>)}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { epigrams: { status, epigrams } } = state;

  return {
    status,
    epigrams: epigrams.slice(0, 20)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadEpigrams() {
      dispatch(loadEpigramsAction());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
