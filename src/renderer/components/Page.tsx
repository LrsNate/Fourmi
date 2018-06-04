import {
  AppBar,
  IconButton,
  Theme,
  Toolbar,
  Typography, withStyles
} from "@material-ui/core";
import { KeyboardArrowLeft, Settings } from "@material-ui/icons";
import * as React from "react";

const styles = (theme: Theme) => ({
  appBarLeftButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    flex: 1
  },
  pageContent: {
    marginTop: 84,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

export interface PageProps {
  classes: {
    appBarLeftButton: string;
    title: string;
    pageContent: string;
  };
  title: string;
  onGoBack?: () => void;
}

class Page extends React.Component<PageProps> {
  private goBack() {}

  private goToSettings() {}

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
}

export default withStyles(styles)(Page);
