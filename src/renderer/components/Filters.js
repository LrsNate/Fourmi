import _ from "lodash";
import {
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from "material-ui";
import { Delete } from "material-ui-icons";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { getFilterName } from "../constants/filters";
import FourmiPropTypes from "../constants/types";

const mapStateToProps = (state, ownProps) => {
  const { query: { originId } } = ownProps;

  if (originId) {
    return { origin: state.epigrams.epigrams[originId] };
  } else {
    return {};
  }
};

class Filters extends Component {
  static propTypes = {
    origin: FourmiPropTypes.epigram,
    query: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  };

  static defaultProps = {
    origin: null
  };

  deleteFilter = key => {
    const { onChange, query } = this.props;
    onChange(_.omit(query, key));
  };

  renderOriginFilter() {
    const { origin: { author, reference } } = this.props;

    return (
      <ListItem button dense>
        <ListItemText primary={`Origine: ${author} - ${reference}`} />
        <ListItemSecondaryAction>
          <IconButton onClick={() => this.deleteFilter("originId")}>
            <Delete />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }

  renderFilter = key => {
    const { query: { [key]: term } } = this.props;
    const name = getFilterName(key);

    return (
      <ListItem key={key} button dense>
        <ListItemText primary={`${name}: ${term}`} />
        <ListItemSecondaryAction>
          <IconButton onClick={() => this.deleteFilter(key)}>
            <Delete />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  };

  render() {
    const { origin, query } = this.props;
    const filters = Object.keys(_.omit(query, ["originId", "phrase"]));
    return (
      <List>
        {origin && this.renderOriginFilter()}
        {filters.map(this.renderFilter)}
      </List>
    );
  }
}

export default connect(mapStateToProps)(Filters);
