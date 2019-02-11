import * as React from "react";
import { connect } from "react-redux";
import { HashRouter } from "react-router-dom";
import ApplicationLoader from "./components/ApplicationLoader";
import { RootState } from "./reducers";
import { ApplicationState, LoadingStatus } from "./reducers/application";
import routes from "./routes";

function mapStateToProps(state: RootState) {
  const { application } = state;

  return { application };
}

interface ApplicationProps {
  application: ApplicationState;
}

const Application: React.SFC<ApplicationProps> = ({ application }) => {
  const { databaseStatus, epigramsStatus, corporaStatus } = application;

  const isLoaded =
    databaseStatus === LoadingStatus.Ready &&
    epigramsStatus === LoadingStatus.Ready &&
    corporaStatus === LoadingStatus.Ready;

  if (isLoaded) {
    return <HashRouter>{routes}</HashRouter>;
  } else {
    return <ApplicationLoader application={application} />;
  }
};

export default connect(mapStateToProps)(Application);
