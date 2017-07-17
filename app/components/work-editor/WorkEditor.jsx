import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';

import AttributesEditor from './attributes-editor/AttributesEditor';
import NotesEditor from './notes-editor/NotesEditor';
import styles from './WorkEditor.scss';

class WorkEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Grid className={styles.grid} fluid>
        <Row className={styles.row}>
          <Col sm={7}>
            <AttributesEditor />
          </Col>
          <Col sm={5}><NotesEditor /></Col>
        </Row>
        <Row className={styles.row}>
          <Col sm={6}><NotesEditor /></Col>
          <Col sm={6}><NotesEditor /></Col>
        </Row>
      </Grid>
    );
  }
}

WorkEditor.displayName = 'WorkEditor';

export default WorkEditor;
