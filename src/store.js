import { Map } from "immutable";
import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducer";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { routerMiddleware } from "react-router-redux";
import createHistory from "history/createBrowserHistory";

export const history = createHistory();
let middlewares = [thunk, routerMiddleware(history)];

if (["development"].indexOf(process.env.NODE_ENV) !== -1) {
  middlewares.push(logger);
}

export default createStore(
  reducer,
  Map(),
  compose(
    applyMiddleware(...middlewares),
    window && window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);
