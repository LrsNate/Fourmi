import { withStyles } from "material-ui";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";

import { loadEpigramsAction } from "../actions/epigrams";
import EpigramView from "../components/epigramView/EpigramView";
import Page from "../components/Page";
import SearchCard from "../components/SearchCard";
import { epigramsLoadingStatus } from "../constants/reducers";
import { editRoute } from "../constants/routes";
import FourmiPropTypes from "../constants/types";
import { filterEpigrams } from "../lib/epigrams/filter";
import { sortEpigrams } from "../lib/epigrams/sort";

const mapStateToProps = state => {
  const { epigrams: { status, epigrams } } = state;

  return {
    status,
    epigrams: sortEpigrams(epigrams)
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
    query: {
      phrase: "",
      originId: ""
    }
  };

  componentWillMount() {
    const { status, loadEpigrams } = this.props;
    if (status === epigramsLoadingStatus) {
      loadEpigrams();
    }
  }

  handleQueryChange = query => {
    this.setState({ query });
  };

  handleFilterByImitations = originId => {
    this.setState({ query: { originId } });
  };

  render() {
    const { classes, epigrams, goToEditPage } = this.props;
    const { query } = this.state;
    const results = filterEpigrams(epigrams, query);

    return (
      <Page title="Rechercher une oeuvre">
        <SearchCard
          className={classes.searchCard}
          query={query}
          onChange={this.handleQueryChange}
          results={results}
        />
        <hr />
        {results
          .slice(0, 20)
          .map(e => (
            <EpigramView
              epigram={e}
              goToEditPage={goToEditPage}
              filterByImitations={this.handleFilterByImitations}
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
