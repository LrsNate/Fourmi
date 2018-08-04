import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { saveEpigramAction } from "../actions/epigrams";
import { Dispatch, Epigram } from "../constants/types";
import { RootState } from "../reducers";
import { EditRouteArgs } from "../routes";
import EpigramEditor from "./EpigramEditor";
import Page from "./Page";

const mapStateToProps = (state: RootState) => {
  const { epigrams } = state;
  return { epigrams };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    saveEpigram(epigram: Epigram) {
      dispatch(saveEpigramAction(epigram));
    }
  };
};

interface EditProps extends RouteComponentProps<EditRouteArgs> {
  epigrams: { [id: string]: Epigram };
  saveEpigram: (epigram: Epigram) => void;
}

class Edit extends React.Component<EditProps> {
  public render() {
    const { epigrams, saveEpigram } = this.props;
    const { id } = this.props.match.params;

    return (
      <Page title="Éditer une oeuvre">
        <EpigramEditor epigram={epigrams[id]} onSave={saveEpigram} />
        <p>{id}</p>
      </Page>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Edit));
