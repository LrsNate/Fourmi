import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem
} from "material-ui";
import { ModeEdit, MoreVert, Reply } from "material-ui-icons";
import PropTypes from "prop-types";
import React, { Component } from "react";
import FourmiPropTypes from "../../constants/types";

export default class ActionsMenu extends Component {
  static propTypes = {
    // eslint-disable-next-line react/no-typos
    epigram: FourmiPropTypes.epigram.isRequired,
    goToEditPage: PropTypes.func.isRequired,
    filterByImitations: PropTypes.func.isRequired
  };

  state = {
    open: false,
    anchorElement: null
  };

  handleMenuOpen = event => {
    this.setState({ open: true, anchorElement: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ open: false, anchorElement: null });
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
    const { open, anchorElement } = this.state;

    return (
      <div>
        <IconButton onClick={this.handleMenuOpen}>
          <MoreVert />
        </IconButton>
        <Menu
          open={open}
          anchorEl={anchorElement}
          onClose={this.handleMenuClose}
        >
          <MenuItem onClick={this.handleImitationsClick}>
            <ListItemIcon>
              <Reply />
            </ListItemIcon>
            <ListItemText inset primary="Imitations" />
          </MenuItem>
          <MenuItem onClick={this.handleEditClick}>
            <ListItemIcon>
              <ModeEdit />
            </ListItemIcon>
            <ListItemText inset primary="Éditer" />
          </MenuItem>
        </Menu>
      </div>
    );
  }
}
