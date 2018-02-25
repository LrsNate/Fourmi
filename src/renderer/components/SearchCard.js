import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography
} from "material-ui";
import PropTypes from "prop-types";
import React, { Component } from "react";
import FourmiPropTypes from "../constants/types";
import AddFilter from "./AddFilter";
import Filters from "./Filters";

export default class SearchCard extends Component {
  static propTypes = {
    className: PropTypes.string,
    query: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    results: PropTypes.arrayOf(FourmiPropTypes.epigram).isRequired
  };

  static defaultProps = {
    className: ""
  };

  handleSearchPhraseChange = event => {
    const { query, onChange } = this.props;
    onChange({ ...query, phrase: event.target.value });
  };

  handleQueryChange = query => {
    const { onChange } = this.props;
    onChange(query);
  };

  handleAddFilter = ({ field, term }) => {
    const { query, onChange } = this.props;
    onChange({ ...query, [field]: term });
  };

  handleReset = () => {
    const { onChange } = this.props;
    onChange({ phrase: "" });
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
          <Filters query={query} onChange={this.handleQueryChange} />
          <Typography>
            {results.length} résultat{results.length > 1 && "s"}
          </Typography>
        </CardContent>
        <CardActions>
          <Button dense onClick={this.handleReset}>
            Réinitialiser
          </Button>
          <AddFilter query={query} onSubmit={this.handleAddFilter} />
        </CardActions>
      </Card>
    );
  }
}
