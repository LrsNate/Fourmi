import TextField from 'material-ui/TextField';
import { string } from 'prop-types';
import React, { Component } from 'react';
import { FormField } from 'react-form';

class TextInput extends Component {
  static propTypes = {
    field: string.isRequired,
    label: string.isRequired
  };

  render() {
    const { field, label } = this.props;

    return (
      <FormField field={field}>
        {({ getValue, setValue, setTouched }) =>
          <TextField
            floatingLabelText={label}
            value={getValue()}
            onChange={e => setValue(e)}
            onBlur={setTouched}
            fullWidth
          />}
      </FormField>
    );
  }
}

export default TextInput;
