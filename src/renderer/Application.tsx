import * as React from "react";
import { connect } from "react-redux";
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
    const {
      application: { databaseStatus, epigramsStatus }
    } = this.props;

    const isLoaded =
      databaseStatus === LoadingStatus.Ready &&
      epigramsStatus === LoadingStatus.Ready;

    return isLoaded
      ? this.renderApplicationContainer()
      : this.renderApplicationLoader();
  }

  private renderApplicationLoader() {
    const { application } = this.props;

    return <ApplicationLoader application={application} />;
  }

  private renderApplicationContainer() {
    return <p>MyApp!</p>;
  }
}

export default connect(mapStateToProps)(Application);
