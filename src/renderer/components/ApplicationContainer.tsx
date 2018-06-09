import * as React from "react";
import { Route, Switch } from "react-router";
import Edit from "./Edit";
import Search from "./Search";

class ApplicationContainer extends React.Component {
  public render() {
    return (
      <Switch>
        <Route path="/edit" component={Edit} />
        <Route path="/" component={Search} />
      </Switch>
    );
  }
}

export default ApplicationContainer;
