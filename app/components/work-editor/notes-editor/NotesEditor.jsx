import { Card, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import React, { Component } from 'react';

import styles from './NotesEditor.scss';

class NotesEditor extends Component {
  handleChange() {
    this.doSomething();
  }

  render() {
    return (
      <Card className={styles.card}>
        <CardText className={styles.cardText}>
          <TextField
            floatingLabelText="Notes"
            rows={11} rowsMax={11}
            multiLine fullWidth
          />
        </CardText>
      </Card>
    );
  }
}

export default NotesEditor;
