import { withStyles } from "material-ui";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { discardDraftAction, saveDraftAction } from "../actions/draft";
import { saveEpigramAction } from "../actions/epigrams";
import FourmiPropTypes from "../constants/types";
import EpigramEditor from "../components/epigramEditor/EpigramEditor";
import { searchRoute, selectRoute } from "../constants/routes";
import Page from "../components/Page";

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { epigrams: { epigrams } } = state;

  // TODO: Fetch draft here
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
    discardDraft() {
      return dispatch(discardDraftAction());
    },
    saveDraft(formValues) {
      return dispatch(saveDraftAction(formValues));
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
  static propTypes = {
    classes: PropTypes.object.isRequired,
    // eslint-disable-next-line react/no-typos
    epigram: FourmiPropTypes.epigram.isRequired,
    returnToSearch: PropTypes.func.isRequired,
    goToSelectPage: PropTypes.func.isRequired,
    discardDraft: PropTypes.func.isRequired,
    saveDraft: PropTypes.func.isRequired,
    saveEpigram: PropTypes.func.isRequired
  };

  handleSubmit = epigram => {
    const { saveEpigram, discardDraft, returnToSearch } = this.props;
    saveEpigram(epigram);
    discardDraft();
    returnToSearch();
  };

  handleGoToSelectPage = formValues => {
    const { saveDraft, goToSelectPage } = this.props;
    saveDraft(formValues);
    goToSelectPage();
  };

  render() {
    const { classes, epigram, discardDraft } = this.props;
    return (
      <Page title="Éditer une oeuvre" onGoBack={discardDraft}>
        <EpigramEditor
          className={classes.epigramEditor}
          epigram={epigram}
          goToSelectPage={this.handleGoToSelectPage}
          onSave={this.handleSubmit}
        />
      </Page>
    );
  }
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Edit)
);
