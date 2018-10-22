import {
  AppBar,
  IconButton,
  Theme,
  Toolbar,
  Typography,
  withStyles
} from "@material-ui/core";
import { Home, Settings } from "@material-ui/icons";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { dashboardRoutePath } from "../routes";

const styles = (theme: Theme) => ({
  appBarLeftButton: {
    marginLeft: -12,
    marginRight: 20
  },
  pageContent: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2
  },
  title: {
    flex: 1
  }
});

export interface PageProps extends RouteComponentProps<{}> {
  classes: {
    appBarLeftButton: string;
    title: string;
    pageContent: string;
  };
  title: string;
  leftButton?: React.ReactNode;
}

class Page extends React.Component<PageProps> {
  public render() {
    const { classes, leftButton, title, children } = this.props;
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            {leftButton || (
              <IconButton
                className={classes.appBarLeftButton}
                color="inherit"
                onClick={this.goHome}
              >
                <Home />
              </IconButton>
            )}
            <Typography variant="h6" className={classes.title} color="inherit">
              {title}
            </Typography>
            <IconButton color="inherit" onClick={this.goToSettings}>
              <Settings />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className={classes.pageContent}>{children}</div>
      </div>
    );
  }

  private goHome = () => {
    this.props.history.push(dashboardRoutePath());
  };

  private goToSettings = () => {
    this.props.history.push("/settings");
  };
}

export default withRouter(withStyles(styles)(Page));
