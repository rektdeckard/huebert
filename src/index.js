import React from "react";
import ReactDOM from "react-dom";
import { Router } from 'react-router-dom';
import { Provider } from "react-redux";
import { createBrowserHistory } from 'history'

import store from "./reducers";
import MainScreen from "./screens/MainScreen";

ReactDOM.render(
  <Provider store={store}>
    <Router history={createBrowserHistory()}>
      <MainScreen />
    </Router>
  </Provider>,
  document.querySelector("#root")
);
