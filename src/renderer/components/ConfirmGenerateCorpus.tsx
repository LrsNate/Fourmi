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

interface ConfirmGenerateCorpusProps {
  corpusSize: number;
  onConfirm: () => void;
}

interface ConfirmGenerateCorpusState {
  showDialog: boolean;
  corpusTitle: string;
}

export default class ConfirmGenerateCorpus extends React.Component<
  ConfirmGenerateCorpusProps,
  ConfirmGenerateCorpusState
> {
  public state = { showDialog: false, corpusTitle: "" };

  public showConfirmDialog = () => {
    this.setState({ showDialog: true });
  };

  public closeConfirmDialog = () => {
    this.setState({ showDialog: false });
  };

  public onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ corpusTitle: event.target.value });
  };

  public render() {
    const { corpusSize } = this.props;
    const { corpusTitle, showDialog } = this.state;

    return (
      <React.Fragment>
        <Dialog open={showDialog} onClose={this.closeConfirmDialog}>
          <DialogTitle>Générer un nouveau corpus</DialogTitle>
          <DialogContent>
            <Grid container direction="column" spacing={16}>
              <Grid item>
                <Typography>
                  Le corpus généré contient {corpusSize} entrées
                </Typography>
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  value={corpusTitle}
                  onChange={this.onTitleChange}
                  placeholder="Titre du corpus"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeConfirmDialog}>Annuler</Button>
            <Button color="primary">Sauvegarder</Button>
          </DialogActions>
        </Dialog>
        <Button color="primary" onClick={this.showConfirmDialog}>
          Sauvegarder
        </Button>
      </React.Fragment>
    );
  }
}
