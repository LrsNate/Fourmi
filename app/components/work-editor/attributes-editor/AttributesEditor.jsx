import { Card, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import React from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';

class AttributesEditor extends React.Component {
  static renderContent() {
    return (
      <Grid fluid>
        <Row>
          <Col sm={3}><TextField floatingLabelText="Auteur" fullWidth /></Col>
          <Col sm={3}><TextField floatingLabelText="Référence" fullWidth /></Col>
          <Col sm={6}><TextField floatingLabelText="Titre" fullWidth /></Col>
        </Row>
        <Row>
          <Col sm={3}><TextField floatingLabelText="Destinataire" fullWidth /></Col>
          <Col sm={3}><TextField floatingLabelText="Date" fullWidth /></Col>
          <Col sm={3}><TextField floatingLabelText="Strophe" fullWidth /></Col>
          <Col sm={3}><TextField floatingLabelText="Mètre" fullWidth /></Col>
        </Row>
      </Grid>
    );
  }

  render() {
    return (
      <Card>
        <CardText>
          {AttributesEditor.renderContent()}
        </CardText>
      </Card>
    );
  }
}

export default AttributesEditor;
