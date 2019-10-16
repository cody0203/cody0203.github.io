import React from "react";
import { Link } from "react-router-dom";

const Ending = props => {
  const { score, resetState } = props;
  return (
    <div className="BoxTransparent">
      <h1 className="Heading">Score</h1>
      <div className="Description">Your Score: {score}</div>
      <Link to="/" onClick={resetState}>
        Try again!
      </Link>
    </div>
  );
};

export default Ending;
