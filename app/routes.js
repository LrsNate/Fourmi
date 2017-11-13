import React from "react";
import { Switch, Route } from "react-router";

import Boot from "./components/Boot";
import Search from "./components/Search";

export default (
  <Switch>
    <Route path="/search" component={Search} />
    <Route exact path="/" component={Boot} />
  </Switch>
);
