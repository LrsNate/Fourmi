import {
  AppBar,
  IconButton,
  Theme,
  Toolbar,
  Typography,
  withStyles
} from "@material-ui/core";
import { KeyboardArrowLeft, Settings } from "@material-ui/icons";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";

const styles = (theme: Theme) => ({
  appBarLeftButton: {
    marginLeft: -12,
    marginRight: 20
  },
  pageContent: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: 84
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
  onGoBack?: () => void;
}

class Page extends React.Component<PageProps> {
  public render() {
    const { classes, title, children } = this.props;
    return (
      <div>
        <AppBar>
          <Toolbar>
            <IconButton
              className={classes.appBarLeftButton}
              color="inherit"
              onClick={this.goBack}
            >
              <KeyboardArrowLeft />
            </IconButton>
            <Typography
              variant="title"
              className={classes.title}
              color="inherit"
            >
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

  private goBack = () => {
    this.props.history.goBack();
  };

  private goToSettings() {}
}

export default withRouter(withStyles(styles)(Page));
