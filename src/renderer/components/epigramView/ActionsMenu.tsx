import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem
} from "@material-ui/core";
import { ModeEdit, MoreVert, Reply } from "@material-ui/icons";
import * as React from "react";
import { Epigram } from "../../constants/types";

interface ActionsMenuProps {
  epigram: Epigram;
  goToEditPage?: (id: string) => void;
  filterByImitations: (id: string) => void;
}

interface ActionsMenuState {
  anchorElement?: HTMLElement;
}

export default class ActionsMenu extends React.Component<
  ActionsMenuProps,
  ActionsMenuState
> {
  public state = {
    anchorElement: undefined
  };

  public handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ anchorElement: event.currentTarget });
  };

  public handleMenuClose = () => {
    this.setState({ anchorElement: undefined });
  };

  public handleImitationsClick = () => {
    const {
      epigram: { _id },
      filterByImitations
    } = this.props;
    filterByImitations(_id);
    this.handleMenuClose();
  };

  public handleEditClick = () => {
    const { epigram, goToEditPage } = this.props;
    if (goToEditPage) {
      goToEditPage(epigram._id);
    }
    this.handleMenuClose();
  };

  public render() {
    const { goToEditPage } = this.props;
    const { anchorElement } = this.state;

    return (
      <React.Fragment>
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
            <ListItemText inset={true} primary="Imitations" />
          </MenuItem>
          {goToEditPage && (
            <MenuItem onClick={this.handleEditClick}>
              <ListItemIcon>
                <ModeEdit />
              </ListItemIcon>
              <ListItemText inset={true} primary="Éditer" />
            </MenuItem>
          )}
        </Menu>
      </React.Fragment>
    );
  }
}
