import {
  Card,
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
    // eslint-disable-next-line react/no-typos
    epigram: FourmiPropTypes.epigram.isRequired,
    goToEditPage: PropTypes.func.isRequired,
    filterByImitations: PropTypes.func.isRequired
  };

  static defaultProps = {
    classes: {}
  };

  state = {
    collapsed: true
  };

  toggleCollapse = () => {
    const { collapsed } = this.state;
    this.setState({ collapsed: !collapsed });
  };

  renderTitle() {
    const { epigram: { author, reference, title } } = this.props;
    const core = `${author} - ${reference}`;
    return title ? `${core}: ${title}` : core;
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
    const { classes, epigram, filterByImitations, goToEditPage } = this.props;
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
          action={
            <ActionsMenu
              epigram={epigram}
              filterByImitations={filterByImitations}
              goToEditPage={goToEditPage}
            />
          }
        />
        {!collapsed && this.renderEpigramContent()}
      </Card>
    );
  }
}

export default withStyles(styles)(EpigramView);
