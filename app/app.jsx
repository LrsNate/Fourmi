import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Add from './routes/add/Add';

import './reset.scss';
import './app.scss';

injectTapEventPlugin();

render(
  <MuiThemeProvider>
    <Add />
  </MuiThemeProvider>,
  document.getElementById('root'),
);
