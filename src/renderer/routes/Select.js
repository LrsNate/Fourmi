import { Button, withStyles } from "material-ui";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { goBack } from "react-router-redux";
import { saveOriginIdAction } from "../actions/draft";
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

const mapDispatchToProps = dispatch => {
  return {
    onSubmit(originId) {
      dispatch(saveOriginIdAction(originId));
      dispatch(goBack());
    }
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
    epigrams: PropTypes.arrayOf(FourmiPropTypes.epigram).isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  static defaultProps = {
    classes: {}
  };

  state = {
    query: { phrase: "" }
  };

  handleQueryChange = query => {
    this.setState({ query });
  };

  handleFilterByImitations = originId => {
    const { query } = this.state;
    this.setState({ query: { ...query, phrase: "", originId } });
  };

  renderActions = epigram => {
    const { onSubmit } = this.props;

    return <Button onClick={() => onSubmit(epigram._id)}>Sélectionner</Button>;
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
          actions={this.renderActions}
        />
      </Page>
    );
  }
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Select)
);
