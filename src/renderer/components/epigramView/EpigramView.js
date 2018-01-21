import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  withStyles
} from "material-ui";
import { KeyboardArrowDown, KeyboardArrowUp } from "material-ui-icons";
import PropTypes from "prop-types";
import React, { Component } from "react";

import FourmiPropTypes from "../../constants/types";
import { getEpigramTitle } from "../../lib/epigrams/display";
import TextTypography from "../TextTypography";
import ActionsMenu from "./ActionsMenu";

const styles = theme => ({
  card: {
    marginBottom: theme.spacing.unit
  }
});

class EpigramView extends Component {
  static propTypes = {
    classes: PropTypes.object,
    actions: PropTypes.func,
    // eslint-disable-next-line react/no-typos
    epigram: FourmiPropTypes.epigram.isRequired,
    goToEditPage: PropTypes.func,
    filterByImitations: PropTypes.func.isRequired
  };

  static defaultProps = {
    classes: {},
    actions: null,
    goToEditPage: null
  };

  state = {
    collapsed: true
  };

  toggleCollapse = () => {
    const { collapsed } = this.state;
    this.setState({ collapsed: !collapsed });
  };

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
    const {
      classes,
      actions,
      epigram,
      filterByImitations,
      goToEditPage
    } = this.props;
    const { collapsed } = this.state;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <IconButton onClick={this.toggleCollapse}>
              {collapsed ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
            </IconButton>
          }
          title={getEpigramTitle(epigram)}
          subheader={collapsed && epigram.frenchText.substr(0, 50)}
          action={
            <ActionsMenu
              epigram={epigram}
              filterByImitations={filterByImitations}
              goToEditPage={goToEditPage}
            />
          }
        />
        {!collapsed && this.renderEpigramContent()}
        {actions && <CardActions>{actions(epigram)}</CardActions>}
      </Card>
    );
  }
}

export default withStyles(styles)(EpigramView);
