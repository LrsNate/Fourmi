import * as React from "react";
import { Route, Switch } from "react-router";
import Add from "./pages/Add";
import Dashboard from "./pages/Dashboard";

import Edit from "./pages/Edit";
import MartialQuery from "./pages/MartialQuery";
import MartialResults from "./pages/MartialResults";
import Search from "./pages/Search";

export interface EditRouteArgs {
  id: string;
}

export interface MartialResultsRouteArgs {
  field: string;
  value: string;
}

export const addRoutePath = () => "/add";
export const editRoutePath = (id: string) => `/edit/${id}`;
export const martialQueryRoutePath = () => "/martial";
export const martialResultsRoutePath = (field: string, value: string) =>
  `/martial/results/${field}/${value}`;
export const searchRoutePath = () => "/search";
export const dashboardRoutePath = () => "/";

export default (
  <Switch>
    <Route path={addRoutePath()} component={Add}/>
    <Route path={editRoutePath(":id")} component={Edit} />
    <Route
      path={martialResultsRoutePath(":field", ":value")}
      component={MartialResults}
    />
    <Route path={martialQueryRoutePath()} component={MartialQuery} />
    <Route path={searchRoutePath()} component={Search} />
    <Route path={dashboardRoutePath()} component={Dashboard} />
  </Switch>
);
