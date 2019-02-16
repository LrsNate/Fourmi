import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography
} from "@material-ui/core";
import * as React from "react";

interface RenameCorpusProps {
  title: string;
  onSave: (title: string) => void;
}

interface RenameCorpusState {
  title: string;
  showDialog: boolean;
}

export default class RenameCorpus extends React.Component<
  RenameCorpusProps,
  RenameCorpusState
> {
  constructor(props: RenameCorpusProps) {
    super(props);
    const { title } = this.props;
    this.state = { title, showDialog: false };
  }

  public openDialog = () => this.setState({ showDialog: true });

  public closeDialog = () => this.setState({ showDialog: false });

  public handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;
    this.setState({ title });
  };

  public handleSave = () => {
    const { title } = this.state;

    this.closeDialog();
    this.props.onSave(title);
  };

  public render() {
    const { title: initialTitle } = this.props;
    const { showDialog, title } = this.state;

    return (
      <React.Fragment>
        <Dialog open={showDialog} onClose={this.closeDialog}>
          <DialogTitle>Renommer le corpus</DialogTitle>
          <DialogContent>
            <Grid container direction="column" spacing={16}>
              <Grid item>
                <Typography>Titre actuel : {initialTitle}</Typography>
              </Grid>
              <Grid item>
                <TextField
                  label="Nouveau titre"
                  value={title}
                  onChange={this.handleChangeTitle}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.handleSave}>
              Sauvegarder
            </Button>
            <Button onClick={this.closeDialog}>Annuler</Button>
          </DialogActions>
        </Dialog>
        <Button onClick={this.openDialog}>Renommer le corpus</Button>
      </React.Fragment>
    );
  }
}
