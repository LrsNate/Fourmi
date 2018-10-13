import { Paper, Theme, withStyles } from "@material-ui/core";
import * as React from "react";

const styles = (theme: Theme) => ({
  root: {
    ...theme.mixins.gutters(),
    backgroundColor: "#FAFAFA",
    color: "#212121",
    fontFamily: "Libre Baskerville",
    fontSize: 16,
    lineHeight: "26px",
    paddingBottom: 16,
    paddingTop: 16
  }
});

interface TextViewProps {
  classes: {
    root: string;
  };
  text: string;
}

const TextView: React.SFC<TextViewProps> = ({ classes, text }) => (
  <Paper className={classes.root}>
    <span
      dangerouslySetInnerHTML={{
        __html: text.replace(/ {2}/g, "\u00a0\u00a0")
      }}
    />
  </Paper>
);

export default withStyles(styles)(TextView);
