import { Button, Card, CardActions } from "@material-ui/core";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { RootState } from "../../reducers";
import { dashboardRoutePath } from "../../routes";
import AddToCorpus from "./AddToCorpus";
import GenerateCorpus from "./GenerateCorpus";

function mapStateToProps(state: RootState) {
  return {
    hasUserCorpora: Object.entries(state.corpora).length > 0
  };
}

interface CorpusActionsProps extends RouteComponentProps<{}> {
  epigramIds: string[];
  hasUserCorpora: boolean;
  onToggleSelectingEpigrams: (selectingEpigrams: boolean) => void;
}

interface CorpusActionsState {
  generatingCorpus: boolean;
  addingToCorpus: boolean;
}

class CorpusActions extends React.Component<
  CorpusActionsProps,
  CorpusActionsState
> {
  public state = { generatingCorpus: false, addingToCorpus: false };

  public handleStartGeneratingCorpus = () => {
    this.setState({ generatingCorpus: true });
    this.props.onToggleSelectingEpigrams(true);
  };

  public handleStartAddingToCorpus = () => {
    this.setState({ addingToCorpus: true });
    this.props.onToggleSelectingEpigrams(true);
  };

  public handleCancelAction = () => {
    this.setState({ generatingCorpus: false, addingToCorpus: false });
    this.props.onToggleSelectingEpigrams(false);
  };

  public handleSave = () => {
    this.props.history.push(dashboardRoutePath());
  };

  public render() {
    const { epigramIds, hasUserCorpora } = this.props;
    const { generatingCorpus, addingToCorpus } = this.state;

    if (generatingCorpus) {
      return (
        <GenerateCorpus
          epigramIds={epigramIds}
          onSave={this.handleSave}
          onCancel={this.handleCancelAction}
        />
      );
    } else if (addingToCorpus) {
      return (
        <AddToCorpus
          epigramIds={epigramIds}
          onSave={this.handleSave}
          onCancel={this.handleCancelAction}
        />
      );
    } else {
      return (
        <Card>
          <CardActions>
            <Button color="primary" onClick={this.handleStartGeneratingCorpus}>
              Générer un corpus
            </Button>
            <Button
              onClick={this.handleStartAddingToCorpus}
              disabled={!hasUserCorpora}
            >
              Ajouter à un corpus existant
            </Button>
          </CardActions>
        </Card>
      );
    }
  }
}

export default connect(mapStateToProps)(withRouter(CorpusActions));
