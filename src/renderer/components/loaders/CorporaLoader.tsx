import * as React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { loadCorporaAction } from "../../actions/corpora";

import { DatabaseReadyAction } from "../../actions/database";
import { RootState } from "../../reducers";

function mapDispatchToProps(
  dispatch: ThunkDispatch<RootState, void, DatabaseReadyAction>
) {
  return {
    loadCorpora() {
      dispatch(loadCorporaAction());
    }
  };
}

interface CorporaLoaderProps {
  loadCorpora: () => void;
}

class CorporaLoader extends React.Component<CorporaLoaderProps> {
  public componentDidMount() {
    this.props.loadCorpora();
  }

  public render() {
    return "Chargement des corpora...";
  }
}

export default connect(
  null,
  mapDispatchToProps
)(CorporaLoader);
