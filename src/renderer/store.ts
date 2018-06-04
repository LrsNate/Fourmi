import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

export default function configureStore() {
  const middlewares = [thunk, logger];

  const enhancer = applyMiddleware(...middlewares);
  return createStore(rootReducer, enhancer);
}
