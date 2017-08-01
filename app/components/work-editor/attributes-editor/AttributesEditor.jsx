import { Card, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import ChipInput from 'material-ui-chip-input';
import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';

import styles from './AttributesEditor.scss';

class AttributesEditor extends Component {
  renderContent() {
    return (
      <Grid className={styles.grid} fluid>
        <Row>
          <Col sm={3}>
            <TextField
              floatingLabelText="Auteur"
              className={styles.textField}
              fullWidth
            />
          </Col>
          <Col sm={3}>
            <TextField
              floatingLabelText="Référence"
              className={styles.textField}
              fullWidth
            />
          </Col>
          <Col sm={6}>
            <TextField
              floatingLabelText="Titre"
              className={styles.textField}
              fullWidth
            />
          </Col>
        </Row>
        <Row>
          <Col sm={3}>
            <TextField
              floatingLabelText="Destinataire"
              className={styles.textField}
              fullWidth
            />
          </Col>
          <Col sm={3}>
            <TextField
              floatingLabelText="Date"
              className={styles.textField}
              fullWidth
            />
          </Col>
          <Col sm={3}>
            <TextField
              floatingLabelText="Strophe"
              className={styles.textField}
              fullWidth
            />
          </Col>
          <Col sm={3}>
            <TextField
              floatingLabelText="Mètre"
              className={styles.textField}
              fullWidth
            />
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <ChipInput floatingLabelText="Vices" fullWidth />
          </Col>
          <Col sm={6}>
            <ChipInput floatingLabelText="Tags" fullWidth />
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <TextField
              floatingLabelText="Oeuvre"
              className={styles.textField}
              fullWidth
            />
          </Col>
        </Row>
      </Grid>
    );
  }

  render() {
    return (
      <Card>
        <CardText className={styles.cardText}>
          {this.renderContent()}
        </CardText>
      </Card>
    );
  }
}

export default AttributesEditor;
