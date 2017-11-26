import React from "react";
import { Route, Switch } from "react-router";

import Boot from "./components/Boot";
import Search from "./components/Search";
import Edit from "./components/Edit";

export default (
  <Switch>
    <Route path="/edit/:id" component={Edit} />
    <Route path="/search" component={Search} />
    <Route exact path="/" component={Boot} />
  </Switch>
);
