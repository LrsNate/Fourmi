import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';

import reducer from './reducers';
// import Add from './routes/add/Add';
import Search from './routes/search/Search';

import './reset.scss';
import './app.scss';

injectTapEventPlugin();

const logger = createLogger();

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(logger)),
);

render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Search />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root'),
);
