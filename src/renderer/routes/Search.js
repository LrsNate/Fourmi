import { Card, CardHeader, withStyles } from "material-ui";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";

import { loadEpigramsAction } from "../actions/epigrams";
import { epigramsLoadingStatus } from "../constants/reducers";
import { editRoute } from "../constants/routes";
import FourmiPropTypes from "../constants/types";
import { sortEpigrams } from "../lib/epigrams";
import Page from "../components/Page";
import EpigramView from "../components/EpigramView";

const mapStateToProps = state => {
  const { epigrams: { status, epigrams } } = state;

  return {
    status,
    epigrams: sortEpigrams(Object.values(epigrams)).slice(0, 20)
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

const styles = theme => ({
  searchCard: {
    marginBottom: theme.spacing.unit
  }
});

class Search extends Component {
  componentWillMount() {
    const { status, loadEpigrams } = this.props;
    if (status === epigramsLoadingStatus) {
      loadEpigrams();
    }
  }

  render() {
    const { classes, epigrams, goToEditPage } = this.props;
    return (
      <Page title="Rechercher une oeuvre">
        <Card className={classes.searchCard}>
          <CardHeader title="Recherche" />
        </Card>
        <hr />
        {epigrams.map(e => (
          <EpigramView epigram={e} goToEditPage={goToEditPage} key={e._id} />
        ))}
      </Page>
    );
  }
}

Search.propTypes = {
  classes: PropTypes.object,
  epigrams: PropTypes.arrayOf(FourmiPropTypes.epigram).isRequired,
  goToEditPage: PropTypes.func.isRequired,
  loadEpigrams: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired
};

Search.defaultProps = {
  classes: {}
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Search)
);
