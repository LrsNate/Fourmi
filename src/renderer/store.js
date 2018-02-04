import { routerMiddleware, routerReducer as routing } from "react-router-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import database from "./reducers/database";
import draft from "./reducers/draft";
import epigrams from "./reducers/epigrams";

export default function configureStore(initialState, routerHistory) {
  const router = routerMiddleware(routerHistory);

  const reducers = {
    database,
    draft,
    epigrams,
    routing
  };

  const middlewares = [thunk, router];

  const enhancer = composeWithDevTools(applyMiddleware(...middlewares));
  const rootReducer = combineReducers(reducers);

  return createStore(rootReducer, initialState, enhancer);
}
