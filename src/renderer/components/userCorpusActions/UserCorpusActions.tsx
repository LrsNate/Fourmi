import { Button, Card, CardActions } from "@material-ui/core";
import * as React from "react";
import { Corpus } from "../../constants/types";
import RemoveFromCorpus from "./RemoveFromCorpus";
import RenameCorpus from "./RenameCorpus";

enum UserCorpusActionType {
  RenameCorpus,
  RemoveFromCorpus,
  None
}

interface UserCorpusActionsProps {
  corpus: Corpus;
  epigramIds: string[];
  onToggleSelectingEpigrams: (selectingEpigrams: boolean) => void;
}

interface UserCorpusActionsState {
  currentAction: UserCorpusActionType;
}

class UserCorpusActions extends React.Component<
  UserCorpusActionsProps,
  UserCorpusActionsState
> {
  public state = { currentAction: UserCorpusActionType.None };

  public setCurrentAction = (actionType: UserCorpusActionType) => () => {
    this.setState({ currentAction: actionType });
    this.props.onToggleSelectingEpigrams(
      actionType !== UserCorpusActionType.None
    );
  };

  public render() {
    const { corpus, epigramIds } = this.props;
    const { currentAction } = this.state;

    switch (currentAction) {
      case UserCorpusActionType.RenameCorpus:
        return (
          <RenameCorpus
            title={corpus.title}
            corpus={corpus}
            onSave={this.setCurrentAction(UserCorpusActionType.None)}
            onCancel={this.setCurrentAction(UserCorpusActionType.None)}
          />
        );
      case UserCorpusActionType.RemoveFromCorpus:
        return (
          <RemoveFromCorpus
            epigramIds={epigramIds}
            corpus={corpus}
            onSave={this.setCurrentAction(UserCorpusActionType.None)}
            onCancel={this.setCurrentAction(UserCorpusActionType.None)}
          />
        );
      default:
        return (
          <Card>
            <CardActions>
              <Button
                onClick={this.setCurrentAction(
                  UserCorpusActionType.RenameCorpus
                )}
              >
                Renommer le corpus
              </Button>
              <Button
                onClick={this.setCurrentAction(
                  UserCorpusActionType.RemoveFromCorpus
                )}
              >
                Retirer des œuvres
              </Button>
            </CardActions>
          </Card>
        );
    }
  }
}

export default UserCorpusActions;
