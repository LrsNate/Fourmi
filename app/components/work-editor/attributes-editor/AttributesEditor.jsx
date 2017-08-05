import { Card, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import ChipInput from 'material-ui-chip-input';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';

import styles from './AttributesEditor.scss';

class AttributesEditor extends Component {
  static get propTypes() {
    return {
      onChange: PropTypes.func.isRequired,
      work: PropTypes.object.isRequired
    };
  }

  renderContent() {
    return (
      <Grid className={styles.grid} fluid>
        {this.renderReferencesRow()}
        {this.renderAttributesRow()}
        {this.renderTagsRow()}
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

  renderReferencesRow() {
    const { onChange, work } = this.props;

    return (
      <Row>
        <Col sm={3}>
          <TextField
            floatingLabelText="Auteur"
            className={styles.textField}
            value={work.author}
            onChange={onChange('author')}
            fullWidth
          />
        </Col>
        <Col sm={3}>
          <TextField
            floatingLabelText="Référence"
            className={styles.textField}
            value={work.reference}
            onChange={onChange('reference')}
            fullWidth
          />
        </Col>
        <Col sm={6}>
          <TextField
            floatingLabelText="Titre"
            className={styles.textField}
            value={work.title}
            onChange={onChange('title')}
            fullWidth
          />
        </Col>
      </Row>
    );
  }

  renderAttributesRow() {
    const { onChange, work } = this.props;

    return (
      <Row>
        <Col sm={3}>
          <TextField
            floatingLabelText="Destinataire"
            className={styles.textField}
            value={work.addressee}
            onChange={onChange('addressee')}
            fullWidth
          />
        </Col>
        <Col sm={3}>
          <TextField
            floatingLabelText="Date"
            className={styles.textField}
            value={work.date}
            onChange={onChange('date')}
            fullWidth
          />
        </Col>
        <Col sm={3}>
          <TextField
            floatingLabelText="Strophe"
            className={styles.textField}
            value={work.stanza}
            onChange={onChange('stanza')}
            fullWidth
          />
        </Col>
        <Col sm={3}>
          <TextField
            floatingLabelText="Mètre"
            className={styles.textField}
            value={work.meter}
            onChange={onChange('meter')}
            fullWidth
          />
        </Col>
      </Row>
    );
  }

  renderTagsRow() {
    const { onChange, work } = this.props;

    return (
      <Row>
        <Col sm={6}>
          <ChipInput
            floatingLabelText="Vices"
            value={work.vices}
            onChange={onChange('vices')}
            fullWidth
          />
        </Col>
        <Col sm={6}>
          <ChipInput
            floatingLabelText="Tags"
            value={work.tags}
            onChange={onChange('tags')}
            fullWidth
          />
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
