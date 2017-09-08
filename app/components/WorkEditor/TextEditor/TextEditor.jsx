import { Card, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import { func, number, string } from 'prop-types';
import React, { Component } from 'react';

import styles from './TextEditor.scss';

class TextEditor extends Component {
  static propTypes = {
    label: string.isRequired,
    onChange: func.isRequired,
    rows: number,
    value: string
  };

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
