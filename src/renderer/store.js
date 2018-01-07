import {
  push,
  routerMiddleware,
  routerReducer as routing
} from "react-router-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { loadEpigramsAction } from "./actions/epigrams";

import database from "./reducers/database";
import epigrams from "./reducers/epigrams";

export default function configureStore(initialState, routerHistory) {
  const router = routerMiddleware(routerHistory);

  const actionCreators = {
    loadEpigramsAction,
    push
  };

  const reducers = {
    database,
    epigrams,
    routing
  };

  const middlewares = [thunk, router];

  const composeEnhancers = composeWithDevTools({ actionCreators });

  const enhancer = composeEnhancers(applyMiddleware(...middlewares));
  const rootReducer = combineReducers(reducers);

  return createStore(rootReducer, initialState, enhancer);
}
