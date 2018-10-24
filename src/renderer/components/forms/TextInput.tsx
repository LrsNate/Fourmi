import { TextField } from "@material-ui/core";
import React from "react";
import { Field, FieldRenderProps } from "react-final-form";

interface TextInputProps {
  name: string;
  label: string;
  required?: boolean;
}

const TextInput = ({ name, ...props }: TextInputProps) => {
  return (
    <Field name={name}>
      {({ input }: FieldRenderProps) => (
        <TextField {...input} {...props} fullWidth margin="normal" />
      )}
    </Field>
  );
};

export default TextInput;
