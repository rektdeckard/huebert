import React from "react";
import ReactDOM from "react-dom";
import { Router } from 'react-router-dom';
import { Provider } from "react-redux";

import history from '../history';
import store from "./reducers";
import MainScreen from "./screens/MainScreen";


ReactDOM.render(
  <Provider store={store}>
      <Router history={history}>
        <MainScreen />
      </Router>
  </Provider>,
  document.querySelector("#root")
);
