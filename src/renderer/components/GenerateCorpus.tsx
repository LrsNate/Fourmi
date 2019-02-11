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

interface GenerateCorpusProps {
  corpusSize: number;
  onCancel: () => void;
}

interface GenerateCorpusState {
  corpusTitle: string;
}

export default class GenerateCorpus extends React.Component<
  GenerateCorpusProps,
  GenerateCorpusState
> {
  public state = { corpusTitle: "" };

  public onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ corpusTitle: event.target.value });
  };

  public render() {
    const { corpusSize, onCancel } = this.props;
    const { corpusTitle } = this.state;

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
          <Button color="primary">Sauvegarder</Button>
          <Button onClick={onCancel}>Annuler</Button>
        </CardActions>
      </Card>
    );
  }
}
