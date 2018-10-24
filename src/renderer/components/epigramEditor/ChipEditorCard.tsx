import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  withStyles
} from "@material-ui/core";
import * as React from "react";
import { Form } from "react-final-form";
import TextInput from "../forms/TextInput";

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 16
  }
};

interface ThemeEditorCardProps {
  values: string[];
  onChange: (values: string[]) => void;
  classes: Record<string, string>;
}

interface ThemeEditorCardState {
  showAddChipForm: boolean;
}

class ThemeEditorCard extends React.Component<
  ThemeEditorCardProps,
  ThemeEditorCardState
> {
  public state = {
    showAddChipForm: false
  };

  public deleteChip = (value: string) => () => {
    const { onChange, values } = this.props;

    onChange(values.filter(v => v !== value));
  };

  public openAddChipForm = () => {
    this.setState({ showAddChipForm: true });
  };

  public closeAddChipForm = () => {
    this.setState({ showAddChipForm: false });
  };

  public addChip = (formValues: object) => {
    const { onChange, values } = this.props;
    const { value } = formValues as { value: string };

    onChange([...values, value]);
    this.closeAddChipForm();
  };

  public render() {
    const { values } = this.props;

    return (
      <React.Fragment>
        <Card>
          <CardHeader title="Thèmes" />
          <CardContent>
            {values.map(value => (
              <Chip
                label={value}
                key={value}
                onDelete={this.deleteChip(value)}
              />
            ))}
          </CardContent>
          <CardActions>
            <Button color="primary" onClick={this.openAddChipForm}>
              Ajouter un thème
            </Button>
          </CardActions>
        </Card>
        {this.renderAddChipForm()}
      </React.Fragment>
    );
  }

  public renderAddChipForm() {
    const { showAddChipForm } = this.state;
    return (
      <Dialog open={showAddChipForm}>
        <Form onSubmit={this.addChip}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <DialogTitle>Ajouter un thème</DialogTitle>
              <DialogContent>
                <TextInput name="value" label="Thème" required />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.closeAddChipForm}>Annuler</Button>
                <Button color="primary" type="submit">
                  Ajouter
                </Button>
              </DialogActions>
            </form>
          )}
        </Form>
      </Dialog>
    );
  }
}

// @ts-ignore
export default withStyles(styles)(ThemeEditorCard);
