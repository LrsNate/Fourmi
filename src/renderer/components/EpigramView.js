import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  withStyles
} from "material-ui";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  ModeEdit,
  MoreVert,
  Reply
} from "material-ui-icons";
import PropTypes from "prop-types";
import React, { Component } from "react";

import FourmiPropTypes from "../constants/types";
import TextTypography from "./TextTypography";

const styles = theme => ({
  card: {
    marginBottom: theme.spacing.unit
  }
});

class EpigramView extends Component {
  static propTypes = {
    classes: PropTypes.object,
    // eslint-disable-next-line react/no-typos
    epigram: FourmiPropTypes.epigram.isRequired,
    goToEditPage: PropTypes.func.isRequired
  };

  static defaultProps = {
    classes: {}
  };

  state = {
    collapsed: true,
    menu: {
      open: false,
      anchorElement: null
    }
  };

  toggleCollapse = () => {
    const { collapsed } = this.state;
    this.setState({ collapsed: !collapsed });
  };

  handleMenuOpen = event => {
    this.setState({ menu: { open: true, anchorElement: event.currentTarget } });
  };

  handleMenuClose = () => {
    this.setState({ menu: { open: false, anchorElement: null } });
  };

  renderTitle() {
    const { epigram: { author, reference, title } } = this.props;
    const core = `${author} - ${reference}`;
    return title ? `${core}: ${title}` : core;
  }

  renderActionsMenu() {
    const { epigram, goToEditPage } = this.props;
    const { menu: { open, anchorElement } } = this.state;

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
          <MenuItem onClick={this.handleMenuClose}>
            <ListItemIcon>
              <Reply />
            </ListItemIcon>
            <ListItemText inset primary="Imitations" />
          </MenuItem>
          <MenuItem onClick={() => goToEditPage(epigram._id)}>
            <ListItemIcon>
              <ModeEdit />
            </ListItemIcon>
            <ListItemText inset primary="Éditer" />
          </MenuItem>
        </Menu>
      </div>
    );
  }

  renderEpigramContent() {
    const { epigram: { frenchText, latinText } } = this.props;

    return (
      <CardContent>
        <Grid container>
          <Grid item sm={6}>
            <TextTypography>{latinText}</TextTypography>
          </Grid>
          <Grid item sm={6}>
            <TextTypography>{frenchText}</TextTypography>
          </Grid>
        </Grid>
      </CardContent>
    );
  }

  render() {
    const { classes, epigram } = this.props;
    const { collapsed } = this.state;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <IconButton onClick={this.toggleCollapse}>
              {collapsed ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
            </IconButton>
          }
          title={this.renderTitle()}
          subheader={collapsed && epigram.frenchText.substr(0, 50)}
          action={this.renderActionsMenu()}
        />
        {!collapsed && this.renderEpigramContent()}
      </Card>
    );
  }
}

export default withStyles(styles)(EpigramView);
