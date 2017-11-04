import React from "react";
import { Switch, Route } from "react-router";

import Login from "./components/Login";
import LoggedIn from "./components/LoggedIn";

export default (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route exact path="/loggedin" component={LoggedIn} />
  </Switch>
);
