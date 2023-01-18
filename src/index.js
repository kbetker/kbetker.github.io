import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import Pickleball from "./pages/PickleBall";
import configureStore from "./components/store";
import {
  Route,
  Switch,
  HashRouter,
  BrowserRouter,
  Link,
} from "react-router-dom";

const store = configureStore();

function Wat() {
  return (
    <BrowserRouter>
      <HashRouter basename="/">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </HashRouter>
    </BrowserRouter>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

ReactDOM.render(<Wat></Wat>, document.getElementById("root"));

// ReactDOM.render(
//   <BrowserRouter>
//     <HashRouter basename="/">
//       <Provider store={store}>
//         <Switch>
//           <Route exact path="/pickleball">
//             <Pickleball />
//           </Route>
//           <Route exact path="/">
//             <App />
//           </Route>
//         </Switch>
//       </Provider>
//     </HashRouter>
//   </BrowserRouter>,
//   document.getElementById("root")
// ); Nothing?
