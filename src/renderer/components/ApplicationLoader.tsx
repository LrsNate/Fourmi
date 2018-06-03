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
          <CircularProgress className={classes.progress} />
          <DialogContentText>
            <EpigramsLoader />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    );
  }
}

export default withStyles(styles)(ApplicationLoader);
