import { TextField } from "material-ui";
import PropTypes from "prop-types";
import React from "react";
import { Field } from "react-final-form";

const TextInput = ({ name, ...props }) => {
  return (
    <Field name={name}>
      {({ input }) => (
        <TextField {...input} {...props} color="accent" margin="normal" />
      )}
    </Field>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired
};

export default TextInput;
