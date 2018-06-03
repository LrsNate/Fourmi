import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  StyleRulesCallback,
  Theme,
  withStyles
} from "@material-ui/core";
import * as React from "react";
import { ApplicationState, LoadingStatus } from "../reducers/application";
import DatabaseLoader from "./loaders/DatabaseLoader";
import EpigramsLoader from "./loaders/EpigramsLoader";

const styles: StyleRulesCallback<string> = (theme: Theme) => ({
  dialog: {
    textAlign: "center"
  },
  progress: {
    marginBottom: theme.spacing.unit * 6,
    marginTop: theme.spacing.unit * 6
  }
});

interface ApplicationLoaderProps {
  application: ApplicationState;
  classes: {
    dialog: string;
    progress: string;
  };
}

class ApplicationLoader extends React.Component<ApplicationLoaderProps> {
  public render() {
    const { classes } = this.props;

    return (
      <Dialog open={true}>
        <DialogContent className={classes.dialog}>
          <CircularProgress size={50} className={classes.progress} />
          <DialogContentText>
            {this.renderSubLoader()}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    );
  }

  private renderSubLoader() {
    const {
      application: { databaseStatus, epigramsStatus }
    } = this.props;

    if (databaseStatus === LoadingStatus.Loading) {
      return <DatabaseLoader />;
    } else if (epigramsStatus === LoadingStatus.Loading) {
      return <EpigramsLoader />;
    } else {
      return null;
    }
  }
}

export default withStyles(styles)(ApplicationLoader);
