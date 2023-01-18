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
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <HashRouter basename="/">
          <Switch>
            <Route exact path="/pickleball">
              <Pickleball />
            </Route>
            <Route exact path="/">
              <App />
            </Route>
          </Switch>
        </HashRouter>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
