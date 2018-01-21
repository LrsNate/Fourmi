import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem
} from "material-ui";
import { ModeEdit, MoreVert, Reply } from "material-ui-icons";
import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import FourmiPropTypes from "../../constants/types";

export default class ActionsMenu extends Component {
  static propTypes = {
    // eslint-disable-next-line react/no-typos
    epigram: FourmiPropTypes.epigram.isRequired,
    goToEditPage: PropTypes.func,
    filterByImitations: PropTypes.func.isRequired
  };

  static defaultProps = {
    goToEditPage: null
  };

  state = {
    anchorElement: null
  };

  handleMenuOpen = event => {
    this.setState({ anchorElement: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorElement: null });
  };

  handleImitationsClick = () => {
    const { epigram: { _id }, filterByImitations } = this.props;
    filterByImitations(_id);
    this.handleMenuClose();
  };

  handleEditClick = () => {
    const { epigram: { _id }, goToEditPage } = this.props;
    goToEditPage(_id);
    this.handleMenuClose();
  };

  render() {
    const { goToEditPage } = this.props;
    const { anchorElement } = this.state;

    return (
      <Fragment>
        <IconButton onClick={this.handleMenuOpen}>
          <MoreVert />
        </IconButton>
        <Menu
          open={!!anchorElement}
          anchorEl={anchorElement}
          onClose={this.handleMenuClose}
        >
          <MenuItem onClick={this.handleImitationsClick}>
            <ListItemIcon>
              <Reply />
            </ListItemIcon>
            <ListItemText inset primary="Imitations" />
          </MenuItem>
          {goToEditPage && (
            <MenuItem onClick={this.handleEditClick}>
              <ListItemIcon>
                <ModeEdit />
              </ListItemIcon>
              <ListItemText inset primary="Éditer" />
            </MenuItem>
          )}
        </Menu>
      </Fragment>
    );
  }
}
