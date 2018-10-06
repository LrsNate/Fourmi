import { Typography, withStyles } from "@material-ui/core";
import * as React from "react";

const styles = {
  sectionTitle: { paddingLeft: 22 }
};

interface SectionTitleProps {
  children: React.ReactNode;
  classes: { sectionTitle: string };
}

const SectionTitle: React.SFC<SectionTitleProps> = ({ children, classes }) => (
  <Typography variant="display1" className={classes.sectionTitle}>
    {children}
  </Typography>
);

export default withStyles(styles)(SectionTitle);
