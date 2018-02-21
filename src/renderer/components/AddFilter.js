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
import Dropdown from "./forms/Dropdown";
import TextInput from "./forms/TextInput";

const styles = theme => ({
  dialog: {
    width: theme.spacing.unit * 40
  }
});

class AddFilter extends Component {
  static propTypes = {
    query: PropTypes.object.isRequired,
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
    const allFields = [
      { name: "Auteur", value: "author" },
      { name: "Référence", value: "reference" },
      { name: "Titre", value: "titre" },
      { name: "Mètre", value: "meter" },
      { name: "Strophe", value: "stanza" },
      { name: "Destinataire", value: "addressee" },
      { name: "Thème", value: "themes" },
      { name: "Texte latin", value: "latinText" },
      { name: "Texte français", value: "frenchText" },
      { name: "Notes", value: "notes" }
    ];
    const existingFilters = Object.keys(query);

    return allFields.filter(({ name }) => !existingFilters.includes(name));
  }

  handleClickAddFilter = () => this.setState({ openModal: true });

  handleCloseModal = () => this.setState({ openModal: false });

  renderForm() {
    return (
      <Form onSubmit={() => {}}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Dropdown
              label="Champ"
              options={this.availableFilters}
              name="field"
              id="field"
            />
            <TextInput label="Terme" name="term" />
          </form>
        )}
      </Form>
    );
  }

  render() {
    const { classes } = this.props;
    const { openModal } = this.state;
    return (
      <React.Fragment>
        <Button dense color="primary" onClick={this.handleClickAddFilter}>
          Ajouter un filtre
        </Button>
        <Dialog open={openModal} onClose={this.handleCloseModal}>
          <DialogTitle>Ajouter un filtre</DialogTitle>
          <DialogContent className={classes.dialog}>
            {this.renderForm()}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseModal}>Annuler</Button>
            <Button color="primary">Ajouter</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(AddFilter);
