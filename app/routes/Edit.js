import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";

import { saveEpigramAction } from "../actions/epigrams";
import { epigram } from "../constants/types";

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { epigrams: { epigrams } } = state;
  const epigram = epigrams.find(epigram => epigram._id === id);

  return { epigram: epigram };
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
  handleSubmit = () => {
    const { epigram, saveEpigram, redirectToSearch } = this.props;
    saveEpigram(epigram);
    redirectToSearch();
  };

  render() {
    const { epigram } = this.props;
    return (
      <div>
        <p>Title: {epigram.title}</p>

        <button type="button" onClick={this.handleSubmit}>
          Go back
        </button>
      </div>
    );
  }
}
Edit.propTypes = {
  epigram: epigram.isRequired,
  redirectToSearch: PropTypes.func.isRequired,
  saveEpigram: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
