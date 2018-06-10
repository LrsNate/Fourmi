import * as React from "react";
import { Route, Switch } from "react-router";

import Edit from "./components/Edit";
import Search from "./components/Search";

export interface EditRouteArgs {
  id: string;
}

export const editRoutePath = (id: string) => `/edit/${id}`;
export const searchRoutePath = () => "/";

export default (
  <Switch>
    <Route path={editRoutePath(":id")} component={Edit} />
    <Route path={searchRoutePath()} component={Search} />
  </Switch>
);
