import React from "react";
import { Button } from "reactstrap";

const Starting = props => {
  return (
    <div className="BoxTransparent">
      <h1 className="Heading">Quiz!</h1>
      <div className="Description">
        Learn JavaScript fundamentals through fun and challenging quizzes
      </div>
      <Button className="Button">Let's Go!</Button>
    </div>
  );
};

export default Starting;
