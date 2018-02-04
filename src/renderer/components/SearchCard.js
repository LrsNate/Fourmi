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
import { connect } from "react-redux";
import { transformEpigramsAction } from "../actions/epigrams";
import FourmiPropTypes from "../constants/types";

const mapStateToProps = (state, ownProps) => {
  const { query: { originId } } = ownProps;

  if (originId) {
    return { ...ownProps, originWork: state.epigrams.epigrams[originId] };
  } else {
    return ownProps;
  }
};

const mapDispatchToProps = dispatch => {
  return {
    transformEpigrams() {
      dispatch(transformEpigramsAction());
    }
  };
};

class SearchCard extends Component {
  static propTypes = {
    className: PropTypes.string,
    query: PropTypes.shape({
      phrase: PropTypes.string,
      originId: PropTypes.string
    }).isRequired,
    originWork: FourmiPropTypes.epigram,
    onChange: PropTypes.func.isRequired,
    transformEpigrams: PropTypes.func.isRequired,
    results: PropTypes.arrayOf(FourmiPropTypes.epigram).isRequired
  };

  static defaultProps = {
    className: "",
    originWork: null
  };

  handleSearchPhraseChange = event => {
    const { query, onChange } = this.props;
    onChange({ ...query, phrase: event.target.value });
  };

  handleReset = () => {
    const { onChange } = this.props;
    onChange({ phrase: "", originId: "" });
  };

  render() {
    const {
      className,
      originWork,
      query,
      results,
      transformEpigrams
    } = this.props;
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
          {originWork && (
            <Typography>
              Origine: {originWork.author} - {originWork.reference}
            </Typography>
          )}
          <Typography>{results.length} résultats</Typography>
        </CardContent>
        <CardActions>
          <Button dense onClick={this.handleReset}>
            Réinitialiser
          </Button>
          <Button dense color="primary">
            Ajouter un filtre
          </Button>
          <Button dense color="primary" onClick={transformEpigrams}>
            Transformer
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchCard);
