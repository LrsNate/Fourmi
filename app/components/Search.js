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
    const { status } = this.props;
    return <p>{status}</p>;
  }
}

const mapStateToProps = state => {
  const { epigrams: { status, epigrams } } = state;

  return {
    status,
    epigrams
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
