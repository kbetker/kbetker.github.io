import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import Pickleball from "./pages/PickleBall";
import configureStore from "./components/store";
import { Route, Switch, HashRouter, BrowserRouter } from "react-router-dom";

const store = configureStore();

ReactDOM.render(
  <BrowserRouter>
    <HashRouter basename="/">
      <Provider store={store}>
        <Switch>
          <Route exact path="/pickleball">
            <Pickleball />
          </Route>
          <Route exact path="/">
            <App />
          </Route>
        </Switch>
      </Provider>
    </HashRouter>
  </BrowserRouter>,
  document.getElementById("root")
);
