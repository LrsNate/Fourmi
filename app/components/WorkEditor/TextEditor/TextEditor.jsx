/* @flow */
import TextField from 'material-ui/TextField';
import React, { Component } from 'react';

type Props = {
  label: string,
  onChange: string => void,
  rows: number,
  value: string
};

class TextEditor extends Component<Props> {
  static defaultProps = {
    rows: 1,
    value: ''
  };

  render() {
    const { label, onChange, rows, value } = this.props;

    return (
      <TextField
        floatingLabelText={label}
        rows={rows}
        value={value}
        onChange={onChange}
        multiLine
        fullWidth
      />
    );
  }
}

export default TextEditor;
