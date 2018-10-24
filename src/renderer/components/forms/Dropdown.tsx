import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import * as React from "react";
import { Field } from "react-final-form";

export interface DropdownOption {
  name: string;
  key: string;
}

interface DropdownProps {
  name: string;
  id: string;
  label: string;
  required?: boolean;
  options: DropdownOption[];
  value: string;
  onChange: (
    event: React.ChangeEvent<HTMLSelectElement>,
    child: React.ReactNode
  ) => void;
}

const Dropdown = ({
  name,
  id,
  label,
  required,
  options,
  value,
  onChange
}: DropdownProps) => {
  return (
    <FormControl fullWidth>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Select
        value={value}
        onChange={onChange}
        required={required}
        inputProps={{ name, id }}
      >
        {options.map(({ name: fieldName, key }) => (
          <MenuItem value={key} key={key}>
            {fieldName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

interface DropdownWrapperProps {
  name: string;
  id: string;
  label: string;
  required?: boolean;
  options: DropdownOption[];
}

const DropdownWrapper = ({ name, ...props }: DropdownWrapperProps) => {
  return (
    <Field name={name}>
      {({ input: { value, onChange } }) => (
        <Dropdown name={name} value={value} onChange={onChange} {...props} />
      )}
    </Field>
  );
};

export default DropdownWrapper;
