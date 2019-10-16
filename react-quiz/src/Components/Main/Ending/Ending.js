import React from "react";
import "./Ending.css";
import { Link } from "react-router-dom";
import retry from "../../../assets/refreshing.svg";

const Ending = props => {
  const { score, resetState } = props;
  let message = "";

  if (score <= 3) {
    message = "Don't be discouraged!";
  } else if (score > 3 && score <= 6) {
    message = "Keep up the greate work!";
  } else {
    message = "You're the best!";
  }

  return (
    <div className="BoxTransparent">
      <h1 className="Heading">{message}</h1>
      <div className="Description">Your Score: {score}</div>
      <Link to="/" onClick={resetState}>
        <img src={retry} className="Retry" alt="ending" />
      </Link>
    </div>
  );
};

export default Ending;
