/* @flow */
import { Card, CardText } from 'material-ui/Card';
import ChipInput from 'material-ui-chip-input';
import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';

import TextInput from '../../form/TextInput';

import styles from './AttributesEditor.scss';

class AttributesEditor extends Component<{}> {
  renderContent() {
    return (
      <Grid className={styles.grid} fluid>
        {this.renderReferencesRow()}
        {this.renderAttributesRow()}
        {this.renderTagsRow()}
        <Row>
          <Col sm={12}>
            <TextInput label="Oeuvre" field="originId" />
          </Col>
        </Row>
      </Grid>
    );
  }

  renderReferencesRow() {
    return (
      <Row>
        <Col sm={3}>
          <TextInput label="Auteur" field="author" />
        </Col>
        <Col sm={3}>
          <TextInput label="Référence" field="reference" />
        </Col>
        <Col sm={6}>
          <TextInput label="Titre" field="title" />
        </Col>
      </Row>
    );
  }

  renderAttributesRow() {
    return (
      <Row>
        <Col sm={3}>
          <TextInput label="Destinataire" field="addressee" />
        </Col>
        <Col sm={3}>
          <TextInput label="Date" field="date" />
        </Col>
        <Col sm={3}>
          <TextInput label="Strophe" field="stanza" />
        </Col>
        <Col sm={3}>
          <TextInput label="Mètre" field="meter" />
        </Col>
      </Row>
    );
  }

  renderTagsRow() {
    return (
      <Row>
        <Col sm={6}>
          <ChipInput floatingLabelText="Vices" fullWidth />
        </Col>
        <Col sm={6}>
          <ChipInput floatingLabelText="Tags" fullWidth />
        </Col>
      </Row>
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
