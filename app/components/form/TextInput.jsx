import TextField from 'material-ui/TextField';
import React, { Component } from 'react';
import { FormField } from 'react-form';

type Props = {
  field: string,
  label: string
};

class TextInput extends Component<Props> {
  render() {
    const { field, label } = this.props;

    return (
      <FormField field={field}>
        {({ getValue, setValue, setTouched }) =>
          <TextField
            label={label}
            value={getValue()}
            onChange={(e: string) => setValue(e)}
            onBlur={setTouched}
            fullWidth
          />}
      </FormField>
    );
  }
}

export default TextInput;
