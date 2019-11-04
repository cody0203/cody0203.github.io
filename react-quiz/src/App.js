import React from "react";
import Background from "./assets/quiz-background.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";

import { Container } from "reactstrap";
import "./App.css";

import Main from "./Components/Main/Main";
import Starting from "./Components/Starting/Starting";
function App() {
  return (
    <Container
      fluid={true}
      className="App"
      style={{ backgroundImage: `url(${Background})`, padding: "0" }}
    >
      <Switch>
        <Route path="/" exact>
          <Starting />
        </Route>
        <Route path="/quiz">
          <Main />
        </Route>
      </Switch>
    </Container>
  );
}

export default App;
