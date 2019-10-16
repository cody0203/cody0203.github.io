import React, { useState } from "react";
import "./Main.css";
import { Switch, Route } from "react-router-dom";

import Starting from "./Starting/Starting";
import Header from "./Header/Header";
import Question from "./Question/Question";
import Ending from "./Ending/Ending";
import QuestionMocks from "../../QuestionMocks";

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
const shuffleQuestionMocks = shuffle(QuestionMocks);

let shuffleAnswer = shuffleQuestionMocks.map(question => {
  return shuffle(question.answers);
});

const Main = () => {
  const [questions, setQuestions] = useState(shuffleQuestionMocks);
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
  const [score, setScore] = useState(0);

  const chooseAnswerHandler = (answer, index, correctAnswer) => {
    setAnswered({
      index: index,
      answerIndex: answer,
      correctAnswer: correctAnswer
    });

    if (answer === correctAnswer) {
      setScore(score + 1);
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

  const resetStateHandler = () => {
    shuffleAnswer = shuffleQuestionMocks.map(question => {
      return shuffle(question.answers);
    });
    setQuestions(shuffle(shuffleQuestionMocks));
    setcurrentQuestionIndex(0);
    setIsChose(false);
    setAnswered({
      index: null,
      answerIndex: "",
      correctAnswer: ""
    });
    setLastQuestionIndex(null);
    setIsEnded(false);
    setScore(0);
  };

  return (
    <Switch>
      <Route path="/" exact>
        <Starting />
      </Route>
      <Route path="/quiz">
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
      </Route>
      <Route path="/ending">
        <Ending score={score} resetState={resetStateHandler} />
      </Route>
    </Switch>
  );
};

export default Main;
