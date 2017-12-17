import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";

import { saveEpigramAction } from "../actions/epigrams";
import FourmiPropTypes from "../constants/types";
import EpigramEditor from "../components/epigramEditor/EpigramEditor";

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { epigrams: { epigrams } } = state;

  return { epigram: epigrams[id] };
};

const mapDispatchToProps = dispatch => {
  return {
    redirectToSearch() {
      return dispatch(push("/search"));
    },
    saveEpigram(epigram) {
      return dispatch(saveEpigramAction(epigram));
    }
  };
};

class Edit extends Component {
  handleSubmit = epigram => {
    console.log(epigram);
    const { saveEpigram, redirectToSearch } = this.props;
    saveEpigram(epigram);
    redirectToSearch();
  };

  render() {
    const { epigram } = this.props;
    return (
      <div>
        <EpigramEditor epigram={epigram} onSave={this.handleSubmit} />
      </div>
    );
  }
}

Edit.propTypes = {
  // eslint-disable-next-line react/no-typos
  epigram: FourmiPropTypes.epigram.isRequired,
  redirectToSearch: PropTypes.func.isRequired,
  saveEpigram: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
