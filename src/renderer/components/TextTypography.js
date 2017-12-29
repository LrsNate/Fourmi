import { withStyles } from "material-ui";
import PropTypes from "prop-types";
import React from "react";

const styles = {
  textTypography: {
    fontFamily: "EB Garamond",
    fontSize: "14pt"
  }
};

const TextTypography = ({ classes, children }) => {
  return <div className={classes.textTypography}>{children}</div>;
};

TextTypography.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired
};

TextTypography.defaultProps = {
  classes: {}
};

export default withStyles(styles)(TextTypography);
