import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select
} from "@material-ui/core";
import * as _ from "lodash";
import * as React from "react";
import { connect } from "react-redux";
import { saveCorpusAction } from "../../actions/corpora";
import { Corpora, Corpus, Dispatch } from "../../constants/types";
import { sortCorpora } from "../../lib/corpora";
import { RootState } from "../../reducers";

function mapStateToProps(state: RootState) {
  return { corpora: state.corpora };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    saveCorpus(corpus: Corpus) {
      dispatch(saveCorpusAction(corpus));
    }
  };
}

interface AddToCorpusProps {
  onSave: () => void;
  onCancel: () => void;
  epigramIds: string[];
  saveCorpus: (corpus: Corpus) => void;
  corpora: Corpora;
}

interface AddToCorpusState {
  selectedCorpusId: string;
}

class AddToCorpus extends React.Component<AddToCorpusProps, AddToCorpusState> {
  public state = { selectedCorpusId: "" };

  public handleSubmit = () => {
    const { corpora, epigramIds, saveCorpus, onSave } = this.props;
    const { selectedCorpusId } = this.state;

    const corpus = corpora[selectedCorpusId];
    const existingEpigramIds = corpus.epigramIds;
    saveCorpus({
      ...corpus,
      epigramIds: _.union(existingEpigramIds, epigramIds)
    });
    onSave();
  };

  public handleSelectCorpus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ selectedCorpusId: event.target.value });
  };

  public renderCorpusSelector() {
    const { corpora } = this.props;
    const { selectedCorpusId } = this.state;

    return (
      <FormControl fullWidth>
        <InputLabel htmlFor="select-corpus">Corpus</InputLabel>
        <Select
          value={selectedCorpusId}
          onChange={this.handleSelectCorpus}
          inputProps={{ id: "select-corpus" }}
        >
          <MenuItem value="">
            <em>Aucun</em>
          </MenuItem>
          {sortCorpora(corpora).map(c => (
            <MenuItem key={c._id} value={c._id}>
              {c.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }

  public render() {
    const { onCancel } = this.props;
    const { selectedCorpusId } = this.state;
    return (
      <Card>
        <CardHeader title="Ajouter des œuvres à un corpus existant" />
        <CardContent>
          <Grid container>
            <Grid item sm={6}>
              {this.renderCorpusSelector()}
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            onClick={this.handleSubmit}
            disabled={selectedCorpusId === ""}
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
  mapStateToProps,
  mapDispatchToProps
)(AddToCorpus);
