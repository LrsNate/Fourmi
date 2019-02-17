import { Button, Card, CardActions } from "@material-ui/core";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { dashboardRoutePath } from "../../routes";
import AddToCorpus from "./AddToCorpus";
import GenerateCorpus from "./GenerateCorpus";

enum CorpusActionType {
  GenerateCorpus,
  AddToCorpus,
  None
}

interface CorpusActionsProps extends RouteComponentProps<{}> {
  epigramIds: string[];
  onToggleSelectingEpigrams: (selectingEpigrams: boolean) => void;
}

interface CorpusActionsState {
  currentAction: CorpusActionType;
}

class CorpusActions extends React.Component<
  CorpusActionsProps,
  CorpusActionsState
> {
  public state = { currentAction: CorpusActionType.None };

  public setActionType = (actionType: CorpusActionType) => () => {
    this.setState({ currentAction: actionType });
    this.props.onToggleSelectingEpigrams(actionType !== CorpusActionType.None);
  };

  public handleSave = () => {
    this.props.history.push(dashboardRoutePath());
  };

  public render() {
    const { epigramIds } = this.props;
    const { currentAction } = this.state;

    switch (currentAction) {
      case CorpusActionType.AddToCorpus:
        return (
          <AddToCorpus
            epigramIds={epigramIds}
            onSave={this.handleSave}
            onCancel={this.setActionType(CorpusActionType.None)}
          />
        );
      case CorpusActionType.GenerateCorpus:
        return (
          <GenerateCorpus
            epigramIds={epigramIds}
            onSave={this.handleSave}
            onCancel={this.setActionType(CorpusActionType.None)}
          />
        );
      default:
        return (
          <Card>
            <CardActions>
              <Button
                color="primary"
                onClick={this.setActionType(CorpusActionType.GenerateCorpus)}
              >
                Générer un corpus
              </Button>
              <Button
                onClick={this.setActionType(CorpusActionType.AddToCorpus)}
              >
                Ajouter à un corpus existant
              </Button>
            </CardActions>
          </Card>
        );
    }
  }
}

export default withRouter(CorpusActions);
