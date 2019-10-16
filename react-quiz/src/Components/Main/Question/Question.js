import React from "react";
import "./Question.css";

const Question = props => {
  const {
    currentQuestionIndex,
    questions,
    chooseAnswer,
    answered,
    isChose,
    nextQuestion
  } = props;

  let currentQuestion = questions[currentQuestionIndex];

  const AnswerIndex = ["A", "B", "C", "D"];
  const answerClass = (answerIndex, index) => {
    let classes = "Answer";

    if (answered.index === index) {
      classes += " Choose";
      if (answered.answerIndex === currentQuestion.correctAnswer) {
        classes += " True";
      }
    }

    return classes;
  };

  const answer = currentQuestion.answers.map((answer, index) => {
    return (
      <div
        className={`${answerClass(answer.index, index)} ${
          answer.index === answered.correctAnswer ? "Choose True" : ""
        } `}
        key={index}
        onClick={chooseAnswer.bind(
          null,
          answer.index,
          index,
          currentQuestion.correctAnswer
        )}
        style={{ pointerEvents: isChose ? "none" : "auto" }}
      >
        <div className="AnswerIndex">{AnswerIndex[index]}</div>
        <div className="AnswerContent">{answer.content}</div>
      </div>
    );
  });

  let Button = (
    <button
      className="Button ButtonSmall btn btn-secondary"
      disabled={!isChose}
      onClick={nextQuestion}
    >
      Next Question
    </button>
  );

  if (currentQuestionIndex === questions.length - 1 && isChose === true) {
    Button = (
      <button className="Button ButtonSmall btn btn-secondary">Finish</button>
    );
  }

  return (
    <div className="Body">
      <div className="Question">{currentQuestion.question}</div>
      <div className="PossibleAnwsers">{answer}</div>
      <div className="Footer">{Button}</div>
    </div>
  );
};

export default Question;
