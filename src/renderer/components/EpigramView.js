import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  withStyles
} from "material-ui";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreVert
} from "material-ui-icons";
import PropTypes from "prop-types";
import React, { Component } from "react";

import FourmiPropTypes from "../constants/types";

const styles = theme => ({
  card: {
    marginBottom: theme.spacing.unit
  },
  content: {
    transitionDuration: 0.5
  }
});

class EpigramView extends Component {
  state = { collapsed: true };

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
    const { classes, epigram: { latinText } } = this.props;
    return (
      <CardContent className={classes.content}>
        <Typography>{latinText}</Typography>
      </CardContent>
    );
  }

  render() {
    const { classes, epigram, goToEditPage } = this.props;
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
            <IconButton onClick={() => goToEditPage(epigram._id)}>
              <MoreVert />
            </IconButton>
          }
        />
        {collapsed || this.renderEpigramContent()}
      </Card>
    );
  }
}

EpigramView.propTypes = {
  classes: PropTypes.object,
  // eslint-disable-next-line react/no-typos
  epigram: FourmiPropTypes.epigram.isRequired,
  goToEditPage: PropTypes.func.isRequired
};

EpigramView.defaultProps = {
  classes: {}
};

export default withStyles(styles)(EpigramView);
