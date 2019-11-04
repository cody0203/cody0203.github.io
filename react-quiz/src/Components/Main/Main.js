import React, { useState, useEffect, useRef } from "react";
import "./Main.css";
import CorrectSound from "../../assets/correct.mp3";
import WrongSound from "../../assets/wrong.mp3";
import BackgroundSound from "../../assets/background-sound.mp3";

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

shuffleQuestionMocks.map(question => {
  return shuffle(question.answers);
});

const Main = () => {
  const [questions, setQuestions] = useState(shuffleQuestionMocks);
  const [currentQuestionIndex, setcurrentQuestionIndex] = useState(0);
  const [isChose, setIsChose] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const [answered, setAnswered] = useState({
    index: null,
    answerIndex: "",
    correctAnswer: ""
  });
  const [lastQuestionIndex, setLastQuestionIndex] = useState(null);
  const [progress, setProgress] = useState(350);
  const [isEnded, setIsEnded] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(10);
  const [toEnding, setToEnding] = useState(false);
  const backgroundSoundRef = useRef();
  const wrongSoundRef = useRef();
  const correctSoundRef = useRef();

  useEffect(() => {
    correctSoundRef.current.volume = 0.8;
    wrongSoundRef.current.volume = 0.8;
    wrongSoundRef.current.playbackRate = 2;
    correctSoundRef.current.playbackRate = 2;

    let interval = setInterval(() => {
      setTimer(timer => timer - 1);
    }, 1000);
    if (isChose || isEnded) {
      clearInterval(interval);
    }
    if (timer < 0) {
      setTimer(0);
      wrongSoundRef.current.play();

      clearInterval(interval);
      setAnswered({
        correctAnswer: questions[currentQuestionIndex].correctAnswer
      });
      setIsChose(true);
      setTimeout(() => setIsNext(true), 500);
    }

    return () => {
      clearInterval(interval);
    };
  }, [
    timer,
    isChose,
    isNext,
    isEnded,
    currentQuestionIndex,
    questions,
    correctSoundRef,
    wrongSoundRef
  ]);

  const handleResize = () => {
    if (window.innerWidth > 560) {
      setProgress(350);
    }
    if (window.innerWidth < 560) {
      setProgress(250);
    }

    if (window.innerWidth < 450) {
      setProgress(130);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize());
    return () => {
      window.removeEventListener("resize", handleResize());
    };
  });

  useEffect(() => {
    backgroundSoundRef.current.play();
    backgroundSoundRef.current.volume = 0.5;

    return () => {};
  });

  const chooseAnswerHandler = (answer, index, correctAnswer) => {
    setAnswered({
      index: index,
      answerIndex: answer,
      correctAnswer: correctAnswer
    });
    if (answer === correctAnswer) {
      correctSoundRef.current.play();
      setScore(score + 1);
    } else {
      wrongSoundRef.current.play();
    }
    setIsChose(true);
    setTimeout(() => setIsNext(true), 500);
  };

  const nextQuestionHandler = () => {
    setcurrentQuestionIndex(currentQuestionIndex + 1);
    const answeredQ = { ...answered };
    setTimer(10);
    setAnswered({
      index: null,
      answerIndex: "",
      correctAnswer: ""
    });
    setIsChose(false);
    setIsNext(false);
    if (currentQuestionIndex === questions.length - 1) {
      setLastQuestionIndex(questions.length);
      setcurrentQuestionIndex(currentQuestionIndex);
      setAnswered(answeredQ);
      setIsEnded(true);
    }
  };

  const toEndingHandler = () => {
    setToEnding(true);
  };

  const resetStateHandler = () => {
    shuffleQuestionMocks.map(question => {
      return shuffle(question.answers);
    });
    setQuestions(shuffle(shuffleQuestionMocks));
    setcurrentQuestionIndex(0);
    setIsChose(false);
    setIsNext(false);
    setAnswered({
      index: null,
      answerIndex: "",
      correctAnswer: ""
    });
    setLastQuestionIndex(null);
    setIsEnded(false);
    setToEnding(false);
    setScore(0);
  };

  return (
    <div className="Main">
      <audio ref={backgroundSoundRef} id="beep" src={BackgroundSound} />
      <audio ref={wrongSoundRef} id="beep" src={WrongSound} />
      <audio ref={correctSoundRef} id="beep" src={CorrectSound} />

      {toEnding ? (
        <Ending score={score} resetState={resetStateHandler} />
      ) : (
        <div className="Box">
          <Header
            totalQuestions={questions.length}
            currentQuestionIndex={currentQuestionIndex}
            lastQuestionIndex={lastQuestionIndex}
            progress={progress}
            timer={timer}
          />
          <Question
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            chooseAnswer={chooseAnswerHandler}
            answered={answered}
            isChose={isChose}
            isNext={isNext}
            nextQuestion={nextQuestionHandler}
            toEnding={toEndingHandler}
            isEnded={isEnded}
          />
        </div>
      )}
    </div>
  );
};

export default Main;
