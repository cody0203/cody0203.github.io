import React from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

const Starting = props => {
  return (
    <div className="BoxTransparent">
      <h1 className="Heading">Quiz!</h1>
      <div className="Description">
        Learn JavaScript fundamentals through fun and challenging quizzes
      </div>
      <Link to="/quiz">
        <Button className="Button">Let's Go!</Button>
      </Link>
    </div>
  );
};

export default Starting;
