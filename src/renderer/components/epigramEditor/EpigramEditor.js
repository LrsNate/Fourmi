import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  withStyles
} from "material-ui";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Form } from "react-final-form";

import FourmiPropTypes from "../../constants/types";
import TextInput from "../forms/TextInput";
import TextEditor from "../forms/TextEditor";

const styles = theme => ({
  card: {
    marginBottom: theme.spacing.unit
  }
});

class EpigramEditor extends Component {
  static propTypes = {
    classes: PropTypes.object,
    epigram: FourmiPropTypes.epigram.isRequired,
    onSave: PropTypes.func.isRequired
  };

  static defaultProps = {
    classes: {}
  };

  renderAttributes() {
    const { classes } = this.props;

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
          </Grid>
        </CardContent>
      </Card>
    );
  }

  renderNotes() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader title="Notes" />
        <CardContent>
          <TextEditor name="notes" />
        </CardContent>
      </Card>
    );
  }

  render() {
    const { epigram, onSave } = this.props;
    return (
      <Form initialValues={epigram} onSubmit={onSave}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            {this.renderAttributes()}
            {this.renderNotes()}
            <Button type="submit" raised color="primary">
              Enregistrer
            </Button>
          </form>
        )}
      </Form>
    );
  }
}

export default withStyles(styles)(EpigramEditor);
