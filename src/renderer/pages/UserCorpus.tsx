import { Grid } from "@material-ui/core";
import produce from "immer";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import EpigramView from "../components/epigramView/EpigramView";
import Page from "../components/Page";
import UserCorpusActions from "../components/userCorpusActions/UserCorpusActions";
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

interface UserCorpusState {
  selectingEpigrams: boolean;
  selectedEpigrams: { [id: string]: boolean };
}

class UserCorpus extends React.Component<UserCorpusProps, UserCorpusState> {
  public state: UserCorpusState = {
    selectingEpigrams: false,
    selectedEpigrams: {}
  };

  public get epigramIds() {
    return Object.entries(this.state.selectedEpigrams)
      .filter(([id, selected]) => !!selected)
      .map(([id]) => id);
  }

  public handleToggleSelectingEpigrams = (selectingEpigrams: boolean) => {
    if (selectingEpigrams) {
      this.setState({ selectingEpigrams: true });
    } else {
      this.setState({ selectingEpigrams: false, selectedEpigrams: {} });
    }
  };

  public handleToggleSelected = (id: string) => (selected: boolean) => {
    this.setState(state =>
      produce(state, draft => {
        draft.selectedEpigrams[id] = selected;
      })
    );
  };

  public render() {
    const { corpus, epigrams } = this.props;
    const { selectingEpigrams, selectedEpigrams } = this.state;

    return (
      <Page title={corpus.title}>
        <Grid container direction="column" spacing={8}>
          <Grid item>
            <UserCorpusActions
              corpus={corpus}
              epigramIds={this.epigramIds}
              onToggleSelectingEpigrams={this.handleToggleSelectingEpigrams}
            />
          </Grid>
          {epigrams.map(e => (
            <Grid item key={e._id}>
              <EpigramView
                epigram={e}
                startExpanded
                selectable={selectingEpigrams}
                onToggleSelected={this.handleToggleSelected(e._id)}
                selected={!!selectedEpigrams[e._id]}
              />
            </Grid>
          ))}
        </Grid>
      </Page>
    );
  }
}

export default connect(mapStateToProps)(withRouter(UserCorpus));
