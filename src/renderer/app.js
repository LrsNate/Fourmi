import { createMemoryHistory } from "history";
import { createMuiTheme, MuiThemeProvider } from "material-ui";
import { orange, teal } from "material-ui/colors";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";

import routes from "./routes";
import configureStore from "./store";

import "./app.global.css";

const syncHistoryWithStore = (store, history) => {
  const { routing } = store.getState();
  if (routing && routing.location) {
    history.replace(routing.location);
  }
};

const initialState = {};
const routerHistory = createMemoryHistory();
const store = configureStore(initialState, routerHistory);
syncHistoryWithStore(store, routerHistory);

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: orange
  }
});

const App = () => (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <ConnectedRouter history={routerHistory}>{routes}</ConnectedRouter>
    </MuiThemeProvider>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById("app"));
