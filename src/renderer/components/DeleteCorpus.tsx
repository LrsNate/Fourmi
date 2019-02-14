import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import * as React from "react";
import { Corpus } from "../constants/types";

interface DeleteCorpusProps {
  onConfirm: () => void;
  corpus: Corpus;
}

interface DeleteCorpusState {
  showDialog: boolean;
}

export default class DeleteCorpus extends React.Component<
  DeleteCorpusProps,
  DeleteCorpusState
> {
  public state = { showDialog: false };

  public openDialog = () => this.setState({ showDialog: true });

  public closeDialog = () => this.setState({ showDialog: false });

  public render() {
    const { corpus, onConfirm } = this.props;
    const { showDialog } = this.state;
    const size = corpus.epigramIds.length;

    return (
      <React.Fragment>
        <Dialog open={showDialog} onClose={this.closeDialog}>
          <DialogTitle>Supprimer ce corpus ?</DialogTitle>
          <DialogContent>
            <Grid container direction="column" spacing={16}>
              <Grid item>
                <Typography>Titre du corpus : {corpus.title}</Typography>
              </Grid>
              <Grid item>
                <Typography>
                  {size} entrée
                  {size > 1 && "s"}
                </Typography>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button color="secondary" onClick={onConfirm}>
              Supprimer
            </Button>
            <Button onClick={this.closeDialog}>Annuler</Button>
          </DialogActions>
        </Dialog>
        <IconButton onClick={this.openDialog}>
          <Delete />
        </IconButton>
      </React.Fragment>
    );
  }
}
