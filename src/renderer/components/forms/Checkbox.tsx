import { Checkbox as MUICheckbox, FormControlLabel } from "@material-ui/core";
import * as React from "react";
import { Field } from "react-final-form";

interface CheckboxProps {
  value: boolean;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
  label: string;
}

const Checkbox = ({ value, onChange, label, ...props }: CheckboxProps) => (
  <FormControlLabel
    control={<MUICheckbox checked={value} onChange={onChange} {...props} />}
    label={label}
  />
);

interface CheckboxWrapperProps {
  name: string;
  label: string;
}

const CheckboxWrapper = ({ name, ...props }: CheckboxWrapperProps) => {
  return (
    <Field name={name}>
      {({ input: { value, onChange } }) => (
        <Checkbox value={!!value} onChange={onChange} {...props} />
      )}
    </Field>
  );
};

export default CheckboxWrapper;
