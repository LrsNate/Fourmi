import {
  Card,
  CardContent,
  TextField,
  Typography,
  withStyles
} from "material-ui";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";

import { loadEpigramsAction } from "../actions/epigrams";
import { epigramsLoadingStatus } from "../constants/reducers";
import { editRoute } from "../constants/routes";
import FourmiPropTypes from "../constants/types";
import { filterEpigrams } from "../lib/epigrams/filter";
import { sortEpigrams } from "../lib/epigrams/sort";
import Page from "../components/Page";
import EpigramView from "../components/epigramView/EpigramView";

const mapStateToProps = state => {
  const { epigrams: { status, epigrams } } = state;

  return {
    status,
    epigrams: sortEpigrams(Object.values(epigrams))
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
  static propTypes = {
    classes: PropTypes.object,
    epigrams: PropTypes.arrayOf(FourmiPropTypes.epigram).isRequired,
    goToEditPage: PropTypes.func.isRequired,
    loadEpigrams: PropTypes.func.isRequired,
    status: PropTypes.string.isRequired
  };

  static defaultProps = {
    classes: {}
  };

  state = {
    searchQuery: {
      phrase: ""
    }
  };

  componentWillMount() {
    const { status, loadEpigrams } = this.props;
    if (status === epigramsLoadingStatus) {
      loadEpigrams();
    }
  }

  handleSearchPhraseChange = event => {
    const { target: { value } } = event;
    this.setState({ searchQuery: { phrase: value } });
  };

  handleImitationFilterRequest = originId => {
    this.setState({ searchQuery: { phrase: "", originId } });
  };

  render() {
    const { classes, epigrams: allEpigrams, goToEditPage } = this.props;
    const { searchQuery } = this.state;
    const epigrams = filterEpigrams(allEpigrams, searchQuery);

    return (
      <Page title="Rechercher une oeuvre">
        <Card className={classes.searchCard}>
          <CardContent>
            <TextField
              placeholder="Rechercher..."
              value={searchQuery.phrase}
              onChange={this.handleSearchPhraseChange}
              fullWidth
              margin="normal"
            />
            <Typography>{epigrams.length} résultats</Typography>
          </CardContent>
        </Card>
        <hr />
        {epigrams
          .slice(0, 20)
          .map(e => (
            <EpigramView
              epigram={e}
              goToEditPage={goToEditPage}
              filterByImitations={this.handleImitationFilterRequest}
              key={e._id}
            />
          ))}
      </Page>
    );
  }
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Search)
);
