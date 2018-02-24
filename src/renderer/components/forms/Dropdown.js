import { FormControl, InputLabel, MenuItem, Select } from "material-ui";
import PropTypes from "prop-types";
import React from "react";
import { Field } from "react-final-form";

const Dropdown = ({ name, id, label, options, value, onChange }) => {
  return (
    <FormControl fullWidth>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Select value={value} onChange={onChange} inputProps={{ name, id }}>
        {options.map(({ name, key }) => (
          <MenuItem value={key} key={key}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

Dropdown.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired
    })
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

const DropdownWrapper = ({ name, ...props }) => {
  return (
    <Field name={name}>
      {({ input: { value, onChange } }) => (
        <Dropdown name={name} value={value} onChange={onChange} {...props} />
      )}
    </Field>
  );
};

DropdownWrapper.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired
    })
  ).isRequired
};

export default DropdownWrapper;
