import * as React from "react";
import { connect } from "react-redux";
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
    return <p>MyApp! {isLoaded ? "Y" : "N"}</p>;
  }
}

export default connect(mapStateToProps)(Application);
