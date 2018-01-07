import size from "lodash/size";
import { Card, CardContent, TextField, Typography } from "material-ui";
import PropTypes from "prop-types";
import React, { Component } from "react";

export default class SearchCard extends Component {
  static propTypes = {
    className: PropTypes.string,
    query: PropTypes.shape({
      phrase: PropTypes.string
    }).isRequired,
    onChange: PropTypes.func.isRequired,
    results: PropTypes.object.isRequired
  };

  static defaultProps = {
    className: ""
  };

  handleSearchPhraseChange = event => {
    const { query, onChange } = this.props;
    onChange({ ...query, phrase: event.target.value });
  };

  render() {
    const { className, query, results } = this.props;
    return (
      <Card className={className}>
        <CardContent>
          <TextField
            placeholder="Rechercher..."
            value={query.phrase}
            onChange={this.handleSearchPhraseChange}
            fullWidth
            margin="normal"
          />
          <Typography>{size(results)} résultats</Typography>
        </CardContent>
      </Card>
    );
  }
}
