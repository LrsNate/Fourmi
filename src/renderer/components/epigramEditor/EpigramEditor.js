import { Button } from "material-ui";
import PropTypes from "prop-types";
import React from "react";
import { Form } from "react-final-form";

import FourmiPropTypes from "../../constants/types";
import TextInput from "../forms/TextInput";

const AttributesEditor = () => {
  return (
    <div>
      <TextInput label="Titre" name="title" />
      <TextInput label="Auteur" name="author" />
      <TextInput label="Référence" name="reference" />
    </div>
  );
};

const EpigramEditor = ({ epigram, onSave }) => {
  /**
   * Cards:
   * 1. Info
   * 2. (Latin Text?)
   * 3. French Text
   * 4. Notes
   */
  return (
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
  );
};

EpigramEditor.propTypes = {
  epigram: FourmiPropTypes.epigram.isRequired,
  onSave: PropTypes.func.isRequired
};

export default EpigramEditor;
