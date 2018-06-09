import * as React from "react";
import { connect } from "react-redux";
import { MemoryRouter } from "react-router";
import ApplicationContainer from "./components/ApplicationContainer";
import ApplicationLoader from "./components/ApplicationLoader";
import { RootState } from "./reducers";
import { ApplicationState, LoadingStatus } from "./reducers/application";

function mapStateToProps(state: RootState) {
  const { application } = state;

  return { application };
}

interface ApplicationProps {
  application: ApplicationState;
}

class Application extends React.Component<ApplicationProps> {
  public render() {
    const { application } = this.props;
    const { databaseStatus, epigramsStatus } = application;

    const isLoaded =
      databaseStatus === LoadingStatus.Ready &&
      epigramsStatus === LoadingStatus.Ready;

    if (isLoaded) {
      return (
        <MemoryRouter>
          <ApplicationContainer />
        </MemoryRouter>
      );
    } else {
      return <ApplicationLoader application={application} />;
    }
  }
}

export default connect(mapStateToProps)(Application);
