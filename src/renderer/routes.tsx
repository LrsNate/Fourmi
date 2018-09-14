import * as React from "react";
import { Route, Switch } from "react-router";
import Dashboard from "./pages/Dashboard";

import Edit from "./pages/Edit";
import Search from "./pages/Search";

export interface EditRouteArgs {
  id: string;
}

export const editRoutePath = (id: string) => `/edit/${id}`;
export const searchRoutePath = () => "/search";
export const dashboardRoutePath = () => "/";

export default (
  <Switch>
    <Route path={editRoutePath(":id")} component={Edit} />
    <Route path={searchRoutePath()} component={Search} />
    <Route path={dashboardRoutePath()} component={Dashboard} />
  </Switch>
);
