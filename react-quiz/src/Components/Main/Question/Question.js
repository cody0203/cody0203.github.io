import React from "react";
import "./Question.css";

const Question = props => {
  const {
    currentQuestionIndex,
    questions,
    chooseAnswer,
    answered,
    isCorrect
  } = props;
  let currentQuestion = [...questions];
  currentQuestion = currentQuestion[currentQuestionIndex];
  const AnswerIndex = ["A", "B", "C", "D"];

  const answer = currentQuestion.answers.map((answer, index) => {
    return (
      <div
        className="Answer"
        key={index}
        onClick={chooseAnswer.bind(null, answer.index)}
        style={{ pointerEvents: isCorrect ? "none" : "auto" }}
      >
        <div
          className={`AnswerIndex ${
            answered === currentQuestion.correctAnswer ? "True" : ""
          }`}
        >
          {AnswerIndex[index]}
        </div>
        <div className="AnswerContent">{answer.content}</div>
      </div>
    );
  });
  return (
    <div className="Body">
      <div className="Question">What gets logged when I try to log fetch?</div>
      <div className="PossibleAnwsers">{answer}</div>
      <div className="Footer">
        <button
          className="Button ButtonSmall btn btn-secondary"
          disabled={!isCorrect}
        >
          Next Question
        </button>
      </div>
    </div>
  );
};

export default Question;
