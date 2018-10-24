import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  StyleRulesCallback,
  Theme,
  withStyles
} from "@material-ui/core";
import { Save } from "@material-ui/icons";
import * as React from "react";
import { Field, Form } from "react-final-form";
import { RouteComponentProps, withRouter } from "react-router";
import { Epigram } from "../../constants/types";
import { searchRoutePath } from "../../routes";
import TextEditor from "../forms/TextEditor";
import TextInput from "../forms/TextInput";
import ChipEditorCard from "./ChipEditorCard";

const styles: StyleRulesCallback<string> = (theme: Theme) => ({
  saveButton: {
    position: "fixed",
    right: theme.spacing.unit * 2,
    bottom: theme.spacing.unit * 2,
    zIndex: 1
  }
});

interface EpigramEditorProps extends RouteComponentProps<{}> {
  epigram: Epigram;
  onSave: (values: Epigram) => void;
  classes: Record<string, string>;
}

class EpigramEditor extends React.Component<EpigramEditorProps> {
  public handleSave = (values: object) => {
    const { history, onSave } = this.props;
    onSave(values as Epigram);
    history.push(searchRoutePath());
  };

  public render() {
    const { classes, epigram } = this.props;

    return (
      <Form initialValues={epigram} onSubmit={this.handleSave}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Grid container direction="column" spacing={8}>
              <Grid item>{this.renderAttributes()}</Grid>
              <Grid item>{this.renderThemes()}</Grid>
              <Grid item>
                {this.renderTextEditor("Texte latin", "latinText")}
              </Grid>
              <Grid item>
                {this.renderTextEditor("Texte français", "frenchText")}
              </Grid>
              <Grid item>{this.renderTextEditor("Notes", "notes")}</Grid>
            </Grid>
            <Button
              className={classes.saveButton}
              type="submit"
              variant="fab"
              color="secondary"
            >
              <Save />
            </Button>
          </form>
        )}
      </Form>
    );
  }

  public renderAttributes() {
    return (
      <Card>
        <CardHeader title="Propriétés" />
        <CardContent>
          <Grid container spacing={8}>
            <Grid item sm={3}>
              <TextInput label="Auteur" name="author" />
            </Grid>
            <Grid item sm={3}>
              <TextInput label="Référence" name="reference" />
            </Grid>
            <Grid item sm={6}>
              <TextInput label="Titre" name="title" />
            </Grid>
            <Grid item sm={3}>
              <TextInput label="Mètre" name="meter" />
            </Grid>
            <Grid item sm={3}>
              <TextInput label="Strophe" name="stanza" />
            </Grid>
            <Grid item sm={3}>
              <TextInput label="Destinataire" name="addressee" />
            </Grid>
            <Grid item sm={3}>
              <TextInput label="Date" name="date" />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }

  public renderThemes() {
    return (
      <Field name="themes">
        {({ input: { onChange, value } }) => (
          <ChipEditorCard values={value} onChange={onChange} />
        )}
      </Field>
    );
  }

  public renderTextEditor(label: string, name: string) {
    return (
      <Card>
        <CardHeader title={label} />
        <CardContent>
          <TextEditor name={name} />
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(withRouter(EpigramEditor));
