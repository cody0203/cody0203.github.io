import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import Home from "./Home";
import Login from "./Login";
import NotFound from "./NotFound";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from "./routes.js";

ReactDOM.render(
  <Router>
    <Switch>
      {/* <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/table">
        <App />
      </Route>
      <Route path="/login" exact>
        <Login />
      </Route>
      <Route component={NotFound} /> */}

      {routes.map(route => (
        <Route
          path={route.path}
          exact
          key={route.path}
          component={route.components}
        />
      ))}
    </Switch>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
