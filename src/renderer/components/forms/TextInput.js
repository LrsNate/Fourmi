import PropTypes from "prop-types";
import React from "react";
import { Field } from "react-final-form";
import { TextField } from "material-ui";

const TextInput = ({ name, label }) => {
  return (
    <Field name={name}>
      {({ input }) => (
        <TextField {...input} label={label} fullWidth margin="normal" />
      )}
    </Field>
  );
};

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default TextInput;
