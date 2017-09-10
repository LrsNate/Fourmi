/* @flow */
import { Card, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import React, { Component } from 'react';

import styles from './TextEditor.scss';

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
      <Card className={styles.card}>
        <CardText className={styles.cardText}>
          <TextField
            floatingLabelText={label}
            rows={rows}
            value={value}
            onChange={onChange}
            multiLine
            fullWidth
          />
        </CardText>
      </Card>
    );
  }
}

export default TextEditor;
