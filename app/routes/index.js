import React from "react";
import { Route, Switch } from "react-router";

import Boot from "./Boot";
import Search from "./Search";
import Edit from "./Edit";

export default (
  <Switch>
    <Route path="/edit/:id" component={Edit} />
    <Route path="/search" component={Search} />
    <Route exact path="/" component={Boot} />
  </Switch>
);
