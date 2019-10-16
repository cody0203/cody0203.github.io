import React, { useState } from "react";
import "./Main.css";

import Header from "./Header/Header";
import Question from "./Question/Question";
import { shuffleQuestionMocks } from "../../QuestionMocks";

const Main = () => {
  const [questions] = useState(shuffleQuestionMocks);
  const [currentQuestionIndex, setcurrentQuestionIndex] = useState(0);
  const [isChose, setIsChose] = useState(false);
  const [answered, setAnswered] = useState({
    index: null,
    answerIndex: "",
    correctAnswer: ""
  });
  const [lastQuestionIndex, setLastQuestionIndex] = useState(null);
  const [progress, setProgress] = useState(350);

  const chooseAnswerHandler = (answer, index, correctAnswer) => {
    setAnswered({
      index: index,
      answerIndex: answer,
      correctAnswer: correctAnswer
    });
    if (currentQuestionIndex === questions.length - 1) {
      setLastQuestionIndex(questions.length);
    }

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
      <Header
        totalQuestions={questions.length}
        currentQuestionIndex={currentQuestionIndex}
        lastQuestionIndex={lastQuestionIndex}
        progress={progress}
      />
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
