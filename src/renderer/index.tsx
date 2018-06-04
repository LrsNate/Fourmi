import * as React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./app.global.css";
import Application from "./Application";
import configureStore from "./store";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Application />
  </Provider>,
  document.getElementById("app")
);
