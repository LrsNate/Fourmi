import * as React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import { loadEpigramsAction, LoadEpigramsAction } from "../../actions/epigrams";
import { RootState } from "../../reducers";

type Dispatch = ThunkDispatch<RootState, void, LoadEpigramsAction>;

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    loadEpigrams() {
      dispatch(loadEpigramsAction());
    }
  };
}

interface EpigramsLoaderProps {
  loadEpigrams: () => void;
}

class EpigramsLoader extends React.Component<EpigramsLoaderProps> {
  public componentDidMount() {
    this.props.loadEpigrams();
  }

  public render() {
    return "Chargement des épigrammes...";
  }
}

export default connect(
  null,
  mapDispatchToProps
)(EpigramsLoader);
