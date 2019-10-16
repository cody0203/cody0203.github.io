import React, { useState } from "react";
import "./Main.css";

import Header from "./Header/Header";
import Question from "./Question/Question";
import { QuestionMocks } from "../../QuestionMocks";

const Main = () => {
  const questionMocks = QuestionMocks;
  const [questions] = useState(questionMocks);
  const [currentQuestionIndex, setcurrentQuestionIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [answered, setAnswered] = useState("");

  const chooseAnswerHandler = answer => {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    setAnswered(answer);
    if (answer === correctAnswer) {
      setIsCorrect(true);
    }
  };

  return (
    <div className="Box">
      <Header />
      <Question
        questions={questions}
        currentQuestionIndex={currentQuestionIndex}
        chooseAnswer={chooseAnswerHandler}
        answered={answered}
        isCorrect={isCorrect}
      />
    </div>
  );
};

export default Main;
