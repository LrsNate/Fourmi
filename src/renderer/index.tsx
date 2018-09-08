import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { amber, teal } from "@material-ui/core/colors";
import * as React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./app.global.css";
import Application from "./Application";
import configureStore from "./store";

const store = configureStore();

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: amber
  }
});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Application />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("app")
);
