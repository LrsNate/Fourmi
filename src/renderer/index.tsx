import * as React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Application from "./Application";
import configureStore from "./store";

import "./app.global.css";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Application />
  </Provider>,
  document.getElementById("app")
);
