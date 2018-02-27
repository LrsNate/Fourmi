import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  withStyles
} from "material-ui";
import { KeyboardArrowLeft, Settings } from "material-ui-icons";
import PropTypes from "prop-types";
import React from "react";
import { goBack, push } from "react-router-redux";
import { connect } from "react-redux";
import { settingsRoute } from "../constants/routes";

export const mapStateToProps = (state, ownProps) => ownProps;

export const mapDispatchToProps = (dispatch, { onGoBack }) => {
  return {
    goBack() {
      onGoBack && onGoBack();
      dispatch(goBack());
    },
    goToSettings() {
      dispatch(push(settingsRoute()));
    }
  };
};

const styles = theme => ({
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

export const Page = ({ classes, goBack, goToSettings, title, children }) => {
  return (
    <div>
      <AppBar>
        <Toolbar>
          <IconButton
            className={classes.appBarLeftButton}
            color="inherit"
            onClick={goBack}
          >
            <KeyboardArrowLeft />
          </IconButton>
          <Typography variant="title" className={classes.title} color="inherit">
            {title}
          </Typography>
          <IconButton color="inherit" onClick={goToSettings}>
            <Settings />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.pageContent}>{children}</div>
    </div>
  );
};

Page.propTypes = {
  classes: PropTypes.object,
  goBack: PropTypes.func,
  goToSettings: PropTypes.func,
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

Page.defaultProps = {
  children: null,
  classes: {},
  goBack: () => {},
  goToSettings: () => {}
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Page)
);
