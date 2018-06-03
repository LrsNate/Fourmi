import * as React from "react";
import { connect } from "react-redux";
import ApplicationLoader from "./components/ApplicationLoader";
import { RootState } from "./reducers";

function mapStateToProps(state: RootState) {
  const {
    epigrams: { isLoaded }
  } = state;

  return { isLoaded };
}

interface ApplicationProps {
  isLoaded: boolean;
}

class Application extends React.Component<ApplicationProps> {
  public render() {
    const { isLoaded } = this.props;

    return isLoaded
      ? this.renderApplicationContainer()
      : this.renderApplicationLoader();
  }

  private renderApplicationLoader() {
    return <ApplicationLoader />;
  }

  private renderApplicationContainer() {
    return <p>MyApp!</p>;
  }
}

export default connect(mapStateToProps)(Application);
