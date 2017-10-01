import Grid from 'material-ui/Grid';
import React, { Component } from 'react';

import TextInput from '../../form/TextInput';

import styles from './AttributesEditor.scss';

class AttributesEditor extends Component<{}> {
  renderContent() {
    return (
      <Grid container className={styles.grid} fluid>
        <Grid item sm={3}>
          <TextInput label="Auteur" field="author" />
        </Grid>
        <Grid item sm={3}>
          <TextInput label="Référence" field="reference" />
        </Grid>
        <Grid item sm={6}>
          <TextInput label="Titre" field="title" />
        </Grid>
        <Grid item sm={3}>
          <TextInput label="Destinataire" field="addressee" />
        </Grid>
        <Grid item sm={3}>
          <TextInput label="Date" field="date" />
        </Grid>
        <Grid item sm={3}>
          <TextInput label="Strophe" field="stanza" />
        </Grid>
        <Grid item sm={3}>
          <TextInput label="Mètre" field="meter" />
        </Grid>
        <Grid item sm={6}>
          Vices
        </Grid>
        <Grid item sm={6}>
          Tags
        </Grid>
        <Grid item sm={12}>
          <TextInput label="Oeuvre" field="originId" />
        </Grid>
      </Grid>
    );
  }

  render() {
    return this.renderContent();
  }
}

export default AttributesEditor;
