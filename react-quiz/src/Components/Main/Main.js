import React, { useState } from "react";
import "./Main.css";

import Header from "./Header/Header";
import Question from "./Question/Question";
import shuffleQuestionMocks from "../../QuestionMocks";

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
  const [progress] = useState(350);
  const [isEnded, setIsEnded] = useState(false);
  const [point, setPoint] = useState(0);

  const chooseAnswerHandler = (answer, index, correctAnswer) => {
    setAnswered({
      index: index,
      answerIndex: answer,
      correctAnswer: correctAnswer
    });

    if (answer === correctAnswer) {
      setPoint(point + 1);
    }

    setIsChose(true);
  };

  const nextQuestionHandler = () => {
    setcurrentQuestionIndex(currentQuestionIndex + 1);
    const answeredQ = { ...answered };

    setAnswered({
      index: null,
      answerIndex: "",
      correctAnswer: ""
    });
    setIsChose(false);
    if (currentQuestionIndex === questions.length - 1) {
      setLastQuestionIndex(questions.length);
      setcurrentQuestionIndex(currentQuestionIndex);
      setAnswered(answeredQ);
      setIsEnded(true);
    }
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
        isEnded={isEnded}
      />
    </div>
  );
};

export default Main;
