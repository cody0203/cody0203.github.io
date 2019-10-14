import React, { useState } from "react";
import Background from "./assets/quiz-background.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "reactstrap";
import "./App.css";

import Starting from "./Components/Starting";

function App() {
  const [isStating, setIsStarting] = useState(false);

  return (
    <Container fluid={true} style={{ padding: "0" }}>
      <div className="App" style={{ backgroundImage: `url(${Background})` }}>
        <Starting isStating={isStating} />
      </div>
    </Container>
  );
}

export default App;
