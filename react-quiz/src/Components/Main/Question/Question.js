import React from "react";
import "./Question.css";

const Question = props => {
  const {
    currentQuestionIndex,
    questions,
    chooseAnswer,
    answered,
    isChose,
    isNext,
    nextQuestion,
    toEnding,
    isEnded
  } = props;

  let currentQuestion = questions[currentQuestionIndex];

  const AnswerIndex = ["A", "B", "C", "D"];
  const answerClass = index => {
    let classes = "Answer";

    if (answered.index === index) {
      classes += " Choose";
      if (answered.answerIndex === currentQuestion.correctAnswer) {
        classes += " True";
      }
    }

    return classes;
  };

  let Button = (
    <button
      className="Button ButtonSmall btn btn-secondary"
      disabled={!isNext}
      onClick={nextQuestion}
    >
      Next
    </button>
  );

  if (currentQuestionIndex === questions.length - 1 && isEnded) {
    Button = (
      <button
        className="Button ButtonSmall btn btn-secondary"
        onClick={toEnding}
      >
        Finish
      </button>
    );
  }

  const chooseAnswerHandler = () => {
    if (isChose) {
      return "none";
    } else if (isEnded) {
      return "none";
    }
    return "auto";
  };

  const answer = currentQuestion.answers.map((answer, index) => {
    return (
      <div
        className={`${answerClass(index)} ${
          answer.index === answered.correctAnswer ? "Choose True" : ""
        } `}
        key={index}
        onClick={chooseAnswer.bind(
          null,
          answer.index,
          index,
          currentQuestion.correctAnswer
        )}
        style={{ pointerEvents: chooseAnswerHandler() }}
      >
        <div className="AnswerIndex">{AnswerIndex[index]}</div>
        <div className="AnswerContent">{answer.content}</div>
      </div>
    );
  });

  return (
    <div className="Body">
      <div className="Question">{currentQuestion.question}</div>
      <div className="PossibleAnwsers">{answer}</div>
      <div className="Footer">{Button}</div>
    </div>
  );
};

export default Question;
