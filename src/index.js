import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from "react-redux";

import store from "./reducers";
import App from "./components/App";

ReactDOM.render(
  <Provider store={store}>
      <Router>
        <App />
      </Router>
  </Provider>,
  document.querySelector("#root")
);
