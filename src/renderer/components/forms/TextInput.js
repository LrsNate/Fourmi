import PropTypes from "prop-types";
import React from "react";
import { Field } from "react-final-form";

const TextInput = ({ name }) => {
  return <Field name={name}>{({ input }) => <input {...input} />}</Field>;
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired
};

export default TextInput;
