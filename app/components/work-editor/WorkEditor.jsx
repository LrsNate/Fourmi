import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';

import AttributesEditor from './attributes-editor/AttributesEditor';

class WorkEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Grid fluid>
        <Row>
          <Col sm={8}>
            <AttributesEditor />
          </Col>
          <Col sm={4}>Foo!</Col>
        </Row>
      </Grid>
    );
  }
}

WorkEditor.displayName = 'WorkEditor';

export default WorkEditor;
