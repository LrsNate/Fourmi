import PropTypes from "prop-types";
import React from "react";
import { Form } from "react-final-form";

import FourmiPropTypes from "../../constants/types";
import TextInput from "../forms/TextInput";

const AttributesEditor = () => {
  return (
    <div>
      <TextInput name="title" />
      <TextInput name="author" />
      <TextInput name="reference" />
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
    <Form initialValues={epigram} onSubmit={onSave}>
      {({ handleSubmit, values }) => (
        <form onSubmit={handleSubmit}>
          <AttributesEditor />
          <button type="button" onClick={() => onSave(values)}>
            Go back
          </button>
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
