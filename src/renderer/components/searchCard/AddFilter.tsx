import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Theme,
  withStyles
} from "@material-ui/core";
import * as React from "react";
import { Form } from "react-final-form";
import { allFilters } from "../../lib/epigrams/filter";
import { Filter, SearchQuery } from "../../reducers/search";
import Checkbox from "../forms/Checkbox";
import Dropdown from "../forms/Dropdown";
import TextInput from "../forms/TextInput";

const styles = (theme: Theme) => ({
  dialog: {
    paddingBottom: 0,
    width: theme.spacing.unit * 40
  }
});

interface AddFilterProps {
  query: SearchQuery;
  onSubmit: (filter: Filter) => void;
  classes: { dialog: string };
}

interface AddFilterState {
  openModal: boolean;
}

class AddFilter extends React.Component<AddFilterProps, AddFilterState> {
  public state = {
    openModal: false
  };

  get availableFilters() {
    const { query } = this.props;
    const existingFilters = query.filters.map(f => f.field);

    return allFilters.filter(({ key }) => !existingFilters.includes(key));
  }

  public handleClickAddFilter = () => this.setState({ openModal: true });
  public handleCloseModal = () => this.setState({ openModal: false });

  public handleSubmit = (values: object) => {
    this.setState({ openModal: false });
    this.props.onSubmit(values as Filter);
  };

  public render() {
    const { openModal } = this.state;
    return (
      <React.Fragment>
        <Button color="primary" onClick={this.handleClickAddFilter}>
          Ajouter un filtre
        </Button>
        <Dialog open={openModal} onClose={this.handleCloseModal}>
          <Form onSubmit={this.handleSubmit}>{this.renderForm}</Form>
        </Dialog>
      </React.Fragment>
    );
  }

  public renderForm = ({ handleSubmit }: { handleSubmit: any }) => {
    const { classes } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <DialogTitle>Ajouter un filtre</DialogTitle>
        <DialogContent className={classes.dialog}>
          <Dropdown
            label="Champ"
            options={this.availableFilters}
            name="field"
            id="field"
          />
          <TextInput label="Terme" name="term" />
          <Checkbox label="Insensible à la casse" name="caseInsensitive" />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCloseModal}>Annuler</Button>
          <Button type="submit" color="primary">
            Ajouter
          </Button>
        </DialogActions>
      </form>
    );
  };
}

export default withStyles(styles)(AddFilter);
