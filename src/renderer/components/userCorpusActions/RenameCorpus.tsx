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
import { saveCorpusAction } from "../../actions/corpora";
import { Corpus, Dispatch } from "../../constants/types";

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    saveCorpus(corpus: Corpus) {
      dispatch(saveCorpusAction(corpus));
    }
  };
}

interface RenameCorpusProps {
  title: string;
  corpus: Corpus;
  saveCorpus: (corpus: Corpus) => void;
  onSave: () => void;
  onCancel: () => void;
}

interface RenameCorpusState {
  title: string;
}

class RenameCorpus extends React.Component<
  RenameCorpusProps,
  RenameCorpusState
> {
  constructor(props: RenameCorpusProps) {
    super(props);
    const { title } = this.props;
    this.state = { title };
  }

  public handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;
    this.setState({ title });
  };

  public handleSave = () => {
    const { saveCorpus, corpus, onSave } = this.props;
    const { title } = this.state;

    saveCorpus({ ...corpus, title });
    onSave();
  };

  public render() {
    const { title: initialTitle, onCancel } = this.props;
    const { title } = this.state;

    return (
      <Card>
        <CardHeader title="Renommer le corpus" />
        <CardContent>
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
        </CardContent>
        <CardActions>
          <Button color="primary" onClick={this.handleSave}>
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
)(RenameCorpus);
