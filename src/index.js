import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "normalize.css";
import App from "./App";
import GlobalMessage from "./shared-components/GlobalMessage";
import { Provider } from "react-redux";
import createStore, { history } from "./store";

ReactDOM.render(
  <Provider store={createStore}>
    <GlobalMessage show={true} />
    <App />
  </Provider>,
  document.getElementById("root")
);
