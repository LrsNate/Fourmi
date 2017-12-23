import { Button, Card, CardContent, Grid, Typography } from "material-ui";
import PropTypes from "prop-types";
import React from "react";
import { Form } from "react-final-form";

import FourmiPropTypes from "../../constants/types";
import TextInput from "../forms/TextInput";

const AttributesEditor = () => {
  return (
    <Card>
      <CardContent>
        <Typography type="headline">Propriétés</Typography>
        <Grid container>
          <Grid item sm={3}>
            <TextInput label="Auteur" name="author" fullWidth />
          </Grid>
          <Grid item sm={3}>
            <TextInput label="Référence" name="reference" fullWidth />
          </Grid>
          <Grid item sm={6}>
            <TextInput label="Titre" name="title" fullWidth />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const EpigramEditor = ({ className, epigram, onSave }) => {
  /**
   * Cards:
   * 1. Info
   * 2. (Latin Text?)
   * 3. French Text
   * 4. Notes
   */
  return (
    <div className={className}>
      <Form initialValues={epigram} onSubmit={values => onSave(values)}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <AttributesEditor />
            <TextInput label="Notes" name="notes" />
            <Button type="submit" raised color="primary">
              Enregistrer
            </Button>
          </form>
        )}
      </Form>
    </div>
  );
};

EpigramEditor.propTypes = {
  className: PropTypes.string,
  epigram: FourmiPropTypes.epigram.isRequired,
  onSave: PropTypes.func.isRequired
};

export default EpigramEditor;
