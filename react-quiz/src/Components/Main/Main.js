import React, { useState } from "react";
import "./Main.css";

import Header from "./Header/Header";
import Question from "./Question/Question";
import { QuestionMocks } from "../../QuestionMocks";

const Main = () => {
  const questionMocks = QuestionMocks;
  const [questions] = useState(questionMocks);
  const [currentQuestionIndex, setcurrentQuestionIndex] = useState(0);
  const [isChose, setIsChose] = useState(false);
  const [answered, setAnswered] = useState({
    index: null,
    answerIndex: "",
    correctAnswer: ""
  });

  const chooseAnswerHandler = (answer, index, correctAnswer) => {
    setAnswered({
      index: index,
      answerIndex: answer,
      correctAnswer: correctAnswer
    });
    setIsChose(true);
  };

  const nextQuestionHandler = () => {
    setcurrentQuestionIndex(currentQuestionIndex + 1);
    setAnswered({
      index: null,
      answerIndex: "",
      correctAnswer: ""
    });
    setIsChose(false);
  };

  return (
    <div className="Box">
      <Header />
      <Question
        questions={questions}
        currentQuestionIndex={currentQuestionIndex}
        chooseAnswer={chooseAnswerHandler}
        answered={answered}
        isChose={isChose}
        nextQuestion={nextQuestionHandler}
      />
    </div>
  );
};

export default Main;
