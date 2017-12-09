import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";

import { loadEpigramsAction } from "../actions/epigrams";
import { epigramsLoadingStatus } from "../constants/reducers";
import FourmiPropTypes from "../constants/types";
import { editRoute } from "../constants/routes";

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
    },
    goToEditPage(id) {
      dispatch(push(editRoute(id)));
    }
  };
};

class Search extends Component {
  componentWillMount() {
    const { status, loadEpigrams } = this.props;
    if (status === epigramsLoadingStatus) {
      loadEpigrams();
    }
  }

  render() {
    const { epigrams, goToEditPage } = this.props;
    return (
      <div>
        <ul>
          {epigrams.map(e => (
            <li key={e._id}>
              {e.title}
              <button type="button" onClick={() => goToEditPage(e._id)}>
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

Search.propTypes = {
  epigrams: PropTypes.arrayOf(FourmiPropTypes.epigram).isRequired,
  goToEditPage: PropTypes.func.isRequired,
  loadEpigrams: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);
