/* @flow */
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { HashRouter as Router } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import 'typeface-roboto/index.css';

import { initializeWorksAction } from './actions/initializeWorks';
import NavigationBar from './components/NavigationBar';
import reducer from './reducers';
import Add from './routes/Add';
import Edit from './routes/Edit';
// import Search from './routes/Search';

import './reset.scss';
import './app.scss';

const logger = createLogger();

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk, logger))
);

class App extends React.Component<{}> {
  componentWillMount() {
    store.dispatch(initializeWorksAction());
  }

  render() {
    return (
      <div>
        <NavigationBar />
        <Switch>
          <Route path="/add" component={Add} />
          <Route path="/edit/:id" component={Edit} />
          <Route component={Add} />
        </Switch>
      </div>
    );
  }
}

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
