import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography
} from "@material-ui/core";
import * as _ from "lodash";
import * as React from "react";
import { connect } from "react-redux";
import { saveCorpusAction } from "../../actions/corpora";
import { Corpus, Dispatch } from "../../constants/types";

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    saveCorpus(corpus: Corpus) {
      dispatch(saveCorpusAction(corpus));
    }
  };
}

interface RemoveFromCorpusProps {
  epigramIds: string[];
  corpus: Corpus;
  saveCorpus: (corpus: Corpus) => void;
  onSave: () => void;
  onCancel: () => void;
}

class RemoveFromCorpus extends React.Component<RemoveFromCorpusProps> {
  public handleSubmit = () => {
    const { epigramIds, corpus, saveCorpus, onSave } = this.props;
    const { epigramIds: existingEpigramIds } = corpus;

    saveCorpus({
      ...corpus,
      epigramIds: _.without(existingEpigramIds, ...epigramIds)
    });
    onSave();
  };

  public render() {
    const { epigramIds, onCancel } = this.props;

    const message =
      epigramIds.length < 2
        ? `${epigramIds.length} œuvre sera retirée`
        : `${epigramIds.length} œuvres seront retirées`;

    return (
      <Card>
        <CardHeader title="Retirer des œuvres d'un corpus" />
        <CardContent>
          <Typography>{message}</Typography>
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            onClick={this.handleSubmit}
            disabled={epigramIds.length === 0}
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
)(RemoveFromCorpus);
