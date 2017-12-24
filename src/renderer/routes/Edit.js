import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  withStyles
} from "material-ui";
import { ChevronLeft } from "material-ui-icons";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";

import { saveEpigramAction } from "../actions/epigrams";
import FourmiPropTypes from "../constants/types";
import EpigramEditor from "../components/epigramEditor/EpigramEditor";
import { searchRoute } from "../constants/routes";

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { epigrams: { epigrams } } = state;

  return { epigram: epigrams[id] };
};

const mapDispatchToProps = dispatch => {
  return {
    returnToSearch() {
      return dispatch(push(searchRoute()));
    },
    saveEpigram(epigram) {
      return dispatch(saveEpigramAction(epigram));
    }
  };
};

const styles = {
  backButton: {
    marginLeft: -12,
    marginRight: 20
  },
  epigramEditor: {
    marginTop: 84
  }
};

class Edit extends Component {
  handleSubmit = epigram => {
    const { saveEpigram, returnToSearch } = this.props;
    saveEpigram(epigram);
    returnToSearch();
  };

  render() {
    const { classes, epigram, returnToSearch } = this.props;
    return (
      <div>
        <AppBar>
          <Toolbar>
            <IconButton
              className={classes.backButton}
              color="contrast"
              onClick={returnToSearch}
            >
              <ChevronLeft />
            </IconButton>
            <Typography type="title" color="inherit">
              Éditer une oeuvre
            </Typography>
          </Toolbar>
        </AppBar>
        <EpigramEditor
          className={classes.epigramEditor}
          epigram={epigram}
          onSave={this.handleSubmit}
        />
      </div>
    );
  }
}

Edit.propTypes = {
  classes: PropTypes.object.isRequired,
  // eslint-disable-next-line react/no-typos
  epigram: FourmiPropTypes.epigram.isRequired,
  returnToSearch: PropTypes.func.isRequired,
  saveEpigram: PropTypes.func.isRequired
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Edit)
);
