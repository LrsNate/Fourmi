import {
  routerMiddleware,
  routerReducer as routing,
  push
} from "react-router-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { loginAction } from "./actions/user";
import user from "./reducers/user";

export default function configureStore(initialState, routerHistory) {
  const router = routerMiddleware(routerHistory);

  const actionCreators = {
    loginAction,
    push
  };

  const reducers = {
    user,
    routing
  };

  const middlewares = [thunk, router];

  const composeEnhancers = composeWithDevTools({ actionCreators });

  const enhancer = composeEnhancers(applyMiddleware(...middlewares));
  const rootReducer = combineReducers(reducers);

  return createStore(rootReducer, initialState, enhancer);
}
