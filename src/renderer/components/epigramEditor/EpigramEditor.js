import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  withStyles
} from "material-ui";
import { Save } from "material-ui-icons";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Form } from "react-final-form";

import FourmiPropTypes from "../../constants/types";
import TextEditor from "../forms/TextEditor";
import TextInput from "../forms/TextInput";

const styles = theme => ({
  card: {
    marginBottom: theme.spacing.unit
  },
  saveButton: {
    position: "fixed",
    right: theme.spacing.unit * 2,
    bottom: theme.spacing.unit * 2,
    zIndex: 1
  }
});

class EpigramEditor extends Component {
  static propTypes = {
    classes: PropTypes.object,
    epigram: FourmiPropTypes.epigram.isRequired,
    goToSelectPage: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
  };

  static defaultProps = {
    classes: {}
  };

  renderAttributes(values) {
    const { classes, goToSelectPage } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader title="Propriétés" />
        <CardContent>
          <Grid container>
            <Grid item sm={3}>
              <TextInput label="Auteur" name="author" />
            </Grid>
            <Grid item sm={3}>
              <TextInput label="Référence" name="reference" />
            </Grid>
            <Grid item sm={6}>
              <TextInput label="Titre" name="title" />
            </Grid>
            <Grid item sm={3}>
              <TextInput label="Mètre" name="meter" />
            </Grid>
            <Grid item sm={3}>
              <TextInput label="Strophe" name="stanza" />
            </Grid>
            <Grid item sm={3}>
              <TextInput label="Destinataire" name="addressee" />
            </Grid>
            <Grid item sm={3}>
              <TextInput label="Date" name="date" />
            </Grid>
            <Grid item sm={12}>
              <TextInput label="Vices" name="vices" />
            </Grid>
          </Grid>
          <Grid item sm={12}>
            <Button onClick={() => goToSelectPage(values)}>Origine</Button>
          </Grid>
        </CardContent>
      </Card>
    );
  }

  renderTextEditor(label, name) {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader title={label} />
        <CardContent>
          <TextEditor name={name} />
        </CardContent>
      </Card>
    );
  }

  render() {
    const { classes, epigram, onSave } = this.props;
    return (
      <Form initialValues={epigram} onSubmit={onSave}>
        {({ handleSubmit, values }) => (
          <form onSubmit={handleSubmit}>
            {this.renderAttributes(values)}
            {this.renderTextEditor("Texte latin", "latinText")}
            {this.renderTextEditor("Texte français", "frenchText")}
            {this.renderTextEditor("Notes", "notes")}
            <Button
              className={classes.saveButton}
              type="submit"
              fab
              color="accent"
            >
              <Save />
            </Button>
          </form>
        )}
      </Form>
    );
  }
}

export default withStyles(styles)(EpigramEditor);
