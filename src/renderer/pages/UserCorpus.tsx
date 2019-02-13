import { Grid } from "@material-ui/core";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import EpigramView from "../components/epigramView/EpigramView";
import Page from "../components/Page";
import { Corpus, Epigram } from "../constants/types";
import { RootState } from "../reducers";

function mapStateToProps(state: RootState, ownProps: UserCorpusProps) {
  const { id } = ownProps.match.params;
  const corpus = state.corpora[id];
  const epigrams = corpus.epigramIds.map(
    epigramId => state.epigrams[epigramId]
  );

  return { corpus, epigrams };
}

interface UserCorpusRouteParams {
  id: string;
}

interface UserCorpusProps extends RouteComponentProps<UserCorpusRouteParams> {
  corpus: Corpus;
  epigrams: Epigram[];
}

class UserCorpus extends React.Component<UserCorpusProps> {
  public render() {
    const {
      corpus: { title },
      epigrams
    } = this.props;

    return (
      <Page title={title}>
        <Grid container direction="column" spacing={8}>
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

export default connect(mapStateToProps)(withRouter(UserCorpus));
