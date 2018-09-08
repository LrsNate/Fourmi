import {
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch, Epigram } from "../../constants/types";
import { getFilterName } from "../../lib/epigrams/filter";
import { RootState } from "../../reducers";
import { Filter, SearchQuery } from "../../reducers/search";

interface FiltersProps {
  origin?: Epigram;
  query: SearchQuery;
  deleteFilter: (field: string) => void;
}

function mapStateToProps(state: RootState) {
  // extract origin ID
  return {};
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    deleteFilter() {
      // TODO
    }
  };
}

class Filters extends React.Component<FiltersProps> {
  public handleDeleteFilter = (field: string) => {
    const { deleteFilter } = this.props;
    return () => deleteFilter(field);
  };

  public renderOriginFilter = () => {
    if (!this.props.origin) {
      return null;
    }

    const {
      origin: { author, reference }
    } = this.props;

    return (
      <ListItem button={true} dense={true} disableGutters={true}>
        <ListItemText primary={`Origine : ${author} - ${reference}`} />
        <ListItemSecondaryAction>
          <IconButton onClick={this.handleDeleteFilter("originId")}>
            <Delete />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  };

  public renderFilter = (filter: Filter) => {
    const name = getFilterName(filter);
    return (
      <ListItem key={filter.field} dense={true} disableGutters={true}>
        <ListItemText primary={`${name}: ${filter.term}`} />
        <ListItemSecondaryAction>
          <IconButton onClick={this.handleDeleteFilter(filter.field)}>
            <Delete />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  };

  public render() {
    const { origin, query } = this.props;
    const filters = query.filters;
    return (
      <List>
        {origin && this.renderOriginFilter()}
        {filters.map(this.renderFilter)}
      </List>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filters);
