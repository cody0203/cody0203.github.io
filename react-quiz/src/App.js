import React from "react";
import Background from "./assets/quiz-background.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "reactstrap";
import "./App.css";

import Main from "./Components/Main/Main";

function App() {
  return (
    <Container
      fluid={true}
      className="App"
      style={{ backgroundImage: `url(${Background})`, padding: "0" }}
    >
      <Main />
    </Container>
  );
}

export default App;
