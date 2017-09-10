/* @flow */
import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';
import { Form } from 'react-form';

import type { Work } from '../../types';
import AttributesEditor from './AttributesEditor';
import TextEditor from './TextEditor';
import styles from './WorkEditor.scss';

type Props = {
  work: Work
};

class WorkEditor extends Component<Props, Work> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ...props.work
    };
  }

  handleChange(fieldName: string) {
    return (event: SyntheticInputEvent<>) => {
      this.setState({
        [fieldName]: event.target.value
      });
    };
  }

  render() {
    const { notes, latinText, frenchText } = this.state;
    return (
      <Form loadState={() => ({ values: this.state })}>
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
      </Form>
    );
  }
}

export default WorkEditor;
