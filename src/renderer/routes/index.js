import React from "react";
import { Route, Switch } from "react-router";

import {
  bootRoute,
  editRoute,
  searchRoute,
  selectRoute
} from "../constants/routes";
import Boot from "./Boot";
import Edit from "./Edit";
import Search from "./Search";
import Select from "./Select";

export default (
  <Switch>
    <Route path={editRoute(":id")} component={Edit} />
    <Route path={searchRoute()} component={Search} />
    <Route path={selectRoute()} component={Select} />
    <Route exact path={bootRoute()} component={Boot} />
  </Switch>
);
