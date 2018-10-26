import * as React from "react";
import { connect } from "react-redux";
import { saveEpigramAction } from "../actions/epigrams";
import EpigramEditor from "../components/epigramEditor/EpigramEditor";
import Page from "../components/Page";
import { Dispatch, emptyEpigram, Epigram } from "../constants/types";

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    saveEpigram(epigram: Epigram) {
      dispatch(saveEpigramAction(epigram));
    }
  };
};

interface AddProps {
  saveEpigram: (epigram: Epigram) => void;
}

class Add extends React.Component<AddProps> {
  public render() {
    const { saveEpigram } = this.props;

    return (
      <Page title="Éditer une oeuvre">
        <EpigramEditor epigram={emptyEpigram} onSave={saveEpigram} />
      </Page>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Add);
