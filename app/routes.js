import React from "react";
import { Switch, Route } from "react-router";

import Boot from "./components/Boot";

export default (
  <Switch>
    <Route exact path="/" component={Boot} />
  </Switch>
);
