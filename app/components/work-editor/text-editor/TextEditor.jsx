import { Card, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import React, { Component, PropTypes } from 'react';

import styles from './TextEditor.scss';

class TextEditor extends Component {
  static get propTypes() {
    return {
      label: PropTypes.string.isRequired,
      onChange: PropTypes.func.isRequired,
      rows: PropTypes.number.isRequired,
      value: PropTypes.string.isRequired,
    };
  }

  render() {
    const {
      label,
      onChange,
      rows,
      value,
    } = this.props;

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
