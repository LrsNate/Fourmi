import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';

import AttributesEditor from './attributes-editor/AttributesEditor';
import TextEditor from './text-editor/TextEditor';
import styles from './WorkEditor.scss';

class WorkEditor extends Component {
  static get propTypes() {
    return {
      work: PropTypes.object.isRequired
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      ...props.work
    };
  }

  handleChange(fieldName) {
    return event => {
      this.setState({
        [fieldName]: event.target.value
      });
    };
  }

  render() {
    const { notes, latinText, frenchText } = this.state;
    return (
      <Grid className={styles.grid} fluid>
        <Row className={styles.row}>
          <Col sm={7}>
            <AttributesEditor />
          </Col>
          <Col sm={5}>
            <TextEditor
              value={notes}
              onChange={this.handleChange('notes')}
              label="Notes"
            />
          </Col>
        </Row>
        <Row className={styles.row}>
          <Col sm={6}>
            <TextEditor
              value={latinText}
              onChange={this.handleChange('latinText')}
              label="Latin"
            />
          </Col>
          <Col sm={6}>
            <TextEditor
              value={frenchText}
              onChange={this.handleChange('frenchText')}
              label="Français"
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default WorkEditor;
