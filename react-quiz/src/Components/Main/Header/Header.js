import React from "react";
import "./Header.css";

const header = props => {
  const {
    totalQuestions,
    currentQuestionIndex,
    lastQuestionIndex,
    progress,
    timer
  } = props;

  const currentQuestionCount = () => {
    if (lastQuestionIndex !== null) {
      return (lastQuestionIndex / totalQuestions) * 100;
    }
    return (currentQuestionIndex / totalQuestions) * 100;
  };

  const progressBar = () => {
    if (lastQuestionIndex !== null) {
      return (progress / totalQuestions) * lastQuestionIndex;
    }
    return (progress / totalQuestions) * currentQuestionIndex;
  };

  return (
    <div className="Header">
      <div className="LeftSide">
        <div
          className="ProgressBar"
          style={{
            width: `${progressBar()}px`
          }}
        >
          <span className="Percent">{currentQuestionCount() + "%"}</span>
        </div>
      </div>
      <div className="RightSide">
        <div className="Time">{timer}</div>
      </div>
    </div>
  );
};

export default header;
