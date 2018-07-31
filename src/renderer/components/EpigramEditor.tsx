import { Card, CardContent, CardHeader, Grid } from "@material-ui/core";
import * as React from "react";
import { Form } from "react-final-form";
import { Epigram } from "../constants/types";
import TextInput from "./forms/TextInput";

interface EpigramEditorProps {
  epigram: Epigram;
  onSave: (values: Epigram) => void;
}

class EpigramEditor extends React.Component<EpigramEditorProps> {
  public handleSave = (values: object) => {
    this.props.onSave(values as Epigram);
  };

  public render() {
    const { epigram } = this.props;

    return (
      <Form initialValues={epigram} onSubmit={this.handleSave}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>{this.renderAttributes()}</form>
        )}
      </Form>
    );
  }

  public renderAttributes() {
    return (
      <Card className={"?"}>
        <CardHeader title="Propriétés" />
        <CardContent>
          <Grid container={true}>
            <Grid item={true} sm={3}>
              <TextInput label="Auteur" name="author" />
            </Grid>
            <Grid item={true} sm={3}>
              <TextInput label="Référence" name="reference" />
            </Grid>
            <Grid item={true} sm={6}>
              <TextInput label="Titre" name="title" />
            </Grid>
            <Grid item={true} sm={3}>
              <TextInput label="Mètre" name="meter" />
            </Grid>
            <Grid item={true} sm={3}>
              <TextInput label="Strophe" name="stanza" />
            </Grid>
            <Grid item={true} sm={3}>
              <TextInput label="Destinataire" name="addressee" />
            </Grid>
            <Grid item={true} sm={3}>
              <TextInput label="Date" name="date" />
            </Grid>
            <Grid item={true} sm={12}>
              <TextInput label="Thèmes" name="themes" />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

export default EpigramEditor;
