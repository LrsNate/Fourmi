import { Checkbox as MUICheckbox, FormControlLabel } from "material-ui";
import React from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";

const Checkbox = ({ value, onChange, label, ...props }) => (
  <FormControlLabel
    control={<MUICheckbox checked={value} onChange={onChange} {...props} />}
    label={label}
  />
);

Checkbox.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};

const CheckboxWrapper = ({ name, ...props }) => {
  return (
    <Field name={name}>
      {({ input: { value, onChange } }) => (
        <Checkbox value={!!value} onChange={onChange} {...props} />
      )}
    </Field>
  );
};

CheckboxWrapper.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default CheckboxWrapper;
