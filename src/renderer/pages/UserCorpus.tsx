import { Card, CardActions, Grid } from "@material-ui/core";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { saveCorpusAction } from "../actions/corpora";
import EpigramView from "../components/epigramView/EpigramView";
import Page from "../components/Page";
import RenameCorpus from "../components/userCorpus/RenameCorpus";
import { Corpus, Dispatch, Epigram } from "../constants/types";
import { RootState } from "../reducers";

function mapStateToProps(state: RootState, ownProps: UserCorpusProps) {
  const { id } = ownProps.match.params;
  const corpus = state.corpora[id];
  const epigrams = corpus.epigramIds.map(
    epigramId => state.epigrams[epigramId]
  );

  return { corpus, epigrams };
}

function mapDispatchToProps(dispatch: Dispatch, ownProps: UserCorpusProps) {
  return {
    saveCorpus(corpus: Corpus) {
      dispatch(saveCorpusAction(corpus));
    }
  };
}

interface UserCorpusRouteParams {
  id: string;
}

interface UserCorpusProps extends RouteComponentProps<UserCorpusRouteParams> {
  corpus: Corpus;
  epigrams: Epigram[];
  saveCorpus: (corpus: Corpus) => void;
}

class UserCorpus extends React.Component<UserCorpusProps> {
  public handleSaveTitle = (title: string) => {
    const { corpus, saveCorpus } = this.props;
    saveCorpus({ ...corpus, title });
  };

  public render() {
    const {
      corpus: { title },
      epigrams
    } = this.props;

    return (
      <Page title={title}>
        <Grid container direction="column" spacing={8}>
          <Grid item>
            <Card>
              <CardActions>
                <RenameCorpus title={title} onSave={this.handleSaveTitle} />
              </CardActions>
            </Card>
          </Grid>
          {epigrams.map(e => (
            <Grid item key={e._id}>
              <EpigramView epigram={e} startExpanded />
            </Grid>
          ))}
        </Grid>
      </Page>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UserCorpus));
