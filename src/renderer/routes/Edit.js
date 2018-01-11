import { withStyles } from "material-ui";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";

import { saveEpigramAction } from "../actions/epigrams";
import FourmiPropTypes from "../constants/types";
import EpigramEditor from "../components/epigramEditor/EpigramEditor";
import { searchRoute, selectRoute } from "../constants/routes";
import Page from "../components/Page";

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { epigrams: { epigrams } } = state;

  return { epigram: epigrams[id] };
};

const mapDispatchToProps = dispatch => {
  return {
    returnToSearch() {
      return dispatch(push(searchRoute()));
    },
    goToSelectPage() {
      return dispatch(push(selectRoute()));
    },
    saveEpigram(epigram) {
      return dispatch(saveEpigramAction(epigram));
    }
  };
};

const styles = {
  backButton: {
    marginLeft: -12,
    marginRight: 20
  },
  epigramEditor: {
    marginTop: 84
  }
};

class Edit extends Component {
  handleSubmit = epigram => {
    const { saveEpigram, returnToSearch } = this.props;
    saveEpigram(epigram);
    returnToSearch();
  };

  render() {
    const { classes, epigram, goToSelectPage } = this.props;
    return (
      <Page title="Éditer une oeuvre">
        <EpigramEditor
          className={classes.epigramEditor}
          epigram={epigram}
          goToSelectPage={goToSelectPage}
          onSave={this.handleSubmit}
        />
      </Page>
    );
  }
}

Edit.propTypes = {
  classes: PropTypes.object.isRequired,
  // eslint-disable-next-line react/no-typos
  epigram: FourmiPropTypes.epigram.isRequired,
  returnToSearch: PropTypes.func.isRequired,
  goToSelectPage: PropTypes.func.isRequired,
  saveEpigram: PropTypes.func.isRequired
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Edit)
);
