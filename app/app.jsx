import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { HashRouter as Router } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import NavigationBar from './components/navigation-bar/NavigationBar';
import reducer from './reducers';
import Add from './routes/add/Add';
import Edit from './routes/edit/Edit';
import Search from './routes/search/Search';

import './reset.scss';
import './app.scss';

injectTapEventPlugin();

const logger = createLogger();

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk, logger))
);

const App = () =>
  <div>
    <NavigationBar />
    <Switch>
      <Route path="/add" component={Add} />
      <Route path="/edit/:id" component={Edit} />
      <Route component={Search} />
    </Switch>
  </div>;

render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
