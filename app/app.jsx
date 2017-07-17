import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { createStore } from 'redux';

import reducer from './reducers';
// import Add from './routes/add/Add';
import Search from './routes/search/Search';

import './reset.scss';
import './app.scss';

injectTapEventPlugin();


const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Search />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root'),
);
