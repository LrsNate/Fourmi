import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  withStyles
} from "material-ui";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Form } from "react-final-form";
import { allFilters } from "../constants/filters";
import Checkbox from "./forms/Checkbox";
import Dropdown from "./forms/Dropdown";
import TextInput from "./forms/TextInput";

const styles = theme => ({
  dialog: {
    width: theme.spacing.unit * 40,
    paddingBottom: 0
  }
});

class AddFilter extends Component {
  static propTypes = {
    query: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    classes: PropTypes.object
  };

  static defaultProps = {
    classes: {}
  };

  state = {
    openModal: false
  };

  get availableFilters() {
    const { query } = this.props;
    const existingFilters = Object.keys(query);

    return allFilters.filter(({ value }) => !existingFilters.includes(value));
  }

  handleClickAddFilter = () => this.setState({ openModal: true });
  handleCloseModal = () => this.setState({ openModal: false });

  handleSubmit = values => {
    this.setState({ openModal: false });
    this.props.onSubmit(values);
  };

  render() {
    const { classes } = this.props;
    const { openModal } = this.state;
    return (
      <React.Fragment>
        <Button color="primary" onClick={this.handleClickAddFilter}>
          Ajouter un filtre
        </Button>
        <Dialog open={openModal} onClose={this.handleCloseModal}>
          <Form onSubmit={this.handleSubmit}>
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <DialogTitle>Ajouter un filtre</DialogTitle>
                <DialogContent className={classes.dialog}>
                  <Dropdown
                    label="Champ"
                    options={this.availableFilters}
                    name="field"
                    id="field"
                  />
                  <TextInput label="Terme" name="term" />
                  <Checkbox
                    label="Insensible à la casse"
                    name="caseInsensitive"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleCloseModal}>Annuler</Button>
                  <Button type="submit" color="primary">
                    Ajouter
                  </Button>
                </DialogActions>
              </form>
            )}
          </Form>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(AddFilter);
