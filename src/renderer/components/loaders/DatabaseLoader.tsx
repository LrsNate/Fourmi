import * as React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import {
  DatabaseReadyAction,
  ensureDatabaseExistsAction
} from "../../actions/database";
import { RootState } from "../../reducers";

function mapDispatchToProps(
  dispatch: ThunkDispatch<RootState, void, DatabaseReadyAction>
) {
  return {
    loadDatabase() {
      dispatch(ensureDatabaseExistsAction());
    }
  };
}

interface DatabaseLoaderProps {
  loadDatabase: () => void;
}

class DatabaseLoader extends React.Component<DatabaseLoaderProps> {
  componentDidMount() {
    this.props.loadDatabase();
  }

  public render() {
    return "Chargement de la base de donneées...";
  }
}

export default connect(
  null,
  mapDispatchToProps
)(DatabaseLoader);
