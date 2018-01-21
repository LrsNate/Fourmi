import { Button, withStyles } from "material-ui";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import Page from "../components/Page";
import SearchCard from "../components/SearchCard";
import SearchResults from "../components/SearchResults";
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

const styles = theme => ({
  searchCard: {
    marginBottom: theme.spacing.unit
  }
});

class Select extends Component {
  static propTypes = {
    classes: PropTypes.object,
    epigrams: PropTypes.arrayOf(FourmiPropTypes.epigram).isRequired
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

  handleQueryChange = query => {
    this.setState({ query });
  };

  handleFilterByImitations = originId => {
    this.setState({ query: { phrase: "", originId } });
  };

  render() {
    const { classes, epigrams } = this.props;
    const { query } = this.state;
    const results = filterEpigrams(epigrams, query);

    return (
      <Page title="Sélectionner une oeuvre">
        <SearchCard
          className={classes.searchCard}
          query={query}
          onChange={this.handleQueryChange}
          results={results}
        />
        <hr />
        <SearchResults
          results={results}
          onFilterByImitations={this.handleFilterByImitations}
          actions={() => <Button dense>Sélectionner</Button>}
        />
      </Page>
    );
  }
}

export default withStyles(styles)(connect(mapStateToProps)(Select));
