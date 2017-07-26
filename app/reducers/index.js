import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import works from './works';

export default combineReducers({
  works,
  routing: routerReducer,
});
