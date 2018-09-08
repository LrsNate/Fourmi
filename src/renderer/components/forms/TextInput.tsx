import { TextField } from "@material-ui/core";
import React from "react";
import { Field } from "react-final-form";

interface TextInputProps {
  name: string;
  label: string;
}

const TextInput = ({ name, ...props }: TextInputProps) => {
  return (
    <Field name={name}>
      {({ input }) => (
        <TextField {...input} {...props} fullWidth={true} margin="normal" />
      )}
    </Field>
  );
};

export default TextInput;