import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  withStyles
} from "material-ui";
import { KeyboardArrowLeft } from "material-ui-icons";
import PropTypes from "prop-types";
import React from "react";
import { goBack } from "react-router-redux";
import { connect } from "react-redux";

export const mapStateToProps = (state, ownProps) => ownProps;

export const mapDispatchToProps = dispatch => {
  return {
    goBack() {
      dispatch(goBack());
    }
  };
};

const styles = theme => ({
  appBarLeftButton: {
    marginLeft: -12,
    marginRight: 20
  },
  pageContent: {
    marginTop: 84,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

export const Page = ({ classes, goBack, title, children }) => {
  return (
    <div>
      <AppBar>
        <Toolbar>
          <IconButton
            className={classes.appBarLeftButton}
            color="contrast"
            onClick={goBack}
          >
            <KeyboardArrowLeft />
          </IconButton>
          <Typography type="title" color="inherit">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.pageContent}>{children}</div>
    </div>
  );
};

Page.propTypes = {
  classes: PropTypes.object,
  goBack: PropTypes.func,
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

Page.defaultProps = {
  children: null,
  classes: {},
  goBack: () => {}
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Page)
);
