import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Typography
} from "@material-ui/core";
import * as React from "react";
import { connect } from "react-redux";
import { saveCorpusAction } from "../actions/corpora";
import { Corpus, Dispatch } from "../constants/types";

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    saveCorpus(title: string, epigramIds: string[]) {
      const corpus = { title, epigramIds };
      return dispatch(saveCorpusAction(corpus as Corpus));
    }
  };
}

interface GenerateCorpusProps {
  epigramIds: string[];
  onCancel: () => void;
  saveCorpus: (title: string, epigramIds: string[]) => void;
  onSave: () => void;
}

interface GenerateCorpusState {
  corpusTitle: string;
}

class GenerateCorpus extends React.Component<
  GenerateCorpusProps,
  GenerateCorpusState
> {
  public state = { corpusTitle: "" };

  public onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ corpusTitle: event.target.value });
  };

  public save = () => {
    const { saveCorpus, epigramIds, onSave } = this.props;
    const { corpusTitle } = this.state;

    saveCorpus(corpusTitle, epigramIds);
    onSave();
  };

  public render() {
    const { epigramIds, onCancel } = this.props;
    const { corpusTitle } = this.state;

    const corpusSize = epigramIds.length;

    return (
      <Card>
        <CardHeader title="Créer un corpus" />
        <CardContent>
          <Grid container direction="column" spacing={16}>
            <Grid item>
              <TextField
                fullWidth
                value={corpusTitle}
                onChange={this.onTitleChange}
                label="Titre du corpus"
              />
            </Grid>
            <Grid item>
              <Typography>
                Ce corpus contient {corpusSize} entrée
                {corpusSize > 1 && "s"}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            disabled={corpusSize === 0}
            onClick={this.save}
          >
            Sauvegarder
          </Button>
          <Button onClick={onCancel}>Annuler</Button>
        </CardActions>
      </Card>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(GenerateCorpus);
