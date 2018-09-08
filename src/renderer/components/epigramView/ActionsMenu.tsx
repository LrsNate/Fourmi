import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem
} from "@material-ui/core";
import { Edit, MoreVert, Reply } from "@material-ui/icons";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Epigram } from "../../constants/types";
import { editRoutePath } from "../../routes";

interface ActionsMenuProps extends RouteComponentProps<{}> {
  epigram: Epigram;
  showEditLink: boolean;
  filterByImitations: (id: string) => void;
}

interface ActionsMenuState {
  anchorElement?: HTMLElement;
}

class ActionsMenu extends React.Component<ActionsMenuProps, ActionsMenuState> {
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
    const { epigram, history } = this.props;
    history.push(editRoutePath(epigram._id));
  };

  public render() {
    const { showEditLink } = this.props;
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
          {showEditLink && (
            <MenuItem onClick={this.handleEditClick}>
              <ListItemIcon>
                <Edit />
              </ListItemIcon>
              <ListItemText inset={true} primary="Éditer" />
            </MenuItem>
          )}
        </Menu>
      </React.Fragment>
    );
  }
}

export default withRouter(ActionsMenu);
