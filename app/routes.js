import React from "react";
import { Switch, Route } from "react-router";

import Search from "./components/Search";

export default (
  <Switch>
    <Route exact path="/" component={Search} />
  </Switch>
);
