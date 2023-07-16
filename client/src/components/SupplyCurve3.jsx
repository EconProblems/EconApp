import React, { useState, useEffect } from "react";
import SCurveDiagram from './SCurveDiagram.jsx';
import correct from '../../dist/sounds/correct.wav';
import incorrect from '../../dist/sounds/incorrect.wav';
import close from "../../dist/images/close_icon.png";
import coin from "../../dist/coin.png";
import useSound from 'use-sound';
import ProgressBar from "react-progressbar";
import WordBankDiagram from "./WordBankDiagram.jsx";
import {supplyQuestions3} from "../../../DummyData/dummyData.js";



export default function SupplyCurve3(props) {
  const percent = 100 / supplyQuestions3.questions.length;
  const [playCorrect] = useSound(correct);
  const [playIncorrect] = useSound(incorrect);
  const [coins, setCoins] = useState([coin, coin, coin]);
  const [questions, setQuestions] = useState(supplyQuestions3.questions);
  const [currentQuestion, setCurrentQuestion] = useState();
  const [isDiagram, setIsDiagram] = useState(false);
  const [prog, setProg] = useState(0);
  const [curPos, setCurPos] = useState('');
  const [isWordBank, setIsWordBank] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const incorrectSetNextQuestion = () => {
    console.log('triggered');
    playIncorrect();
    let coinsCopy = coins;
    coinsCopy.splice(0, 1);
    setCoins(coinsCopy);
    if (coins.length === 0) {
      alert("You have run out of coins");
      props.changeView('App');
      return;
    }
    if (prog > 0) {
      setProg(prog - percent);
      console.log(questions);
    }
    setQuestions(prevQuestions => {
      const newQuestions = [...prevQuestions];
      const randomIndex = Math.floor(Math.random() * newQuestions.length);
      newQuestions.push(newQuestions[randomIndex]);
      return newQuestions;
    });
    const randomSetIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomSetIndex]);
    console.log(currentQuestion);
    if (questions[randomSetIndex].pos) {
      // Check if the current question has a 'pos' property
      setIsDiagram(true);
      setIsWordBank(false);
    } else {
      setIsDiagram(false);
      setIsWordBank(true);
      console.log('diagram is false');
    }
  };

  const handleClose = () => {
    props.changeView('App');
  };


  const setNextQuestion = () => {
    console.log('triggered')
    playCorrect();
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomIndex]);
    setQuestions(prevQuestions => {
      const newQuestions = [...prevQuestions];
      newQuestions.splice(randomIndex, 1);
      return newQuestions;
    });

    if (questions.length === 0) {
      alert("You've completed the lesson. The devs need to change the view");
      props.changeView('App');
    }

    if (questions[randomIndex].pos) {
      setIsDiagram(true);
      setIsWordBank(false);
    } else {
      setIsDiagram(false);
      setIsWordBank(true);
      console.log('diagram is false');
    }
  };

  useEffect(() => {
    setNextQuestion();
    console.log(questions);
  }, []);


  const handleDiagramSubmit = (e) => {
    e.preventDefault();
    if (currentQuestion && currentQuestion.pos === curPos) {
      setProg(prog + percent);
      setNextQuestion();
      console.log('correct');
    } else {
      incorrectSetNextQuestion();
      console.log('incorrect');
    }
  };

  return (
    <div>
      <img src={close} alt="close" onClick={handleClose} />
      <div>{coins.map((coin, i)=><img src={coin} key={i}></img>)}</div>
      {isDiagram && (
        <SCurveDiagram
          currentQuestion={currentQuestion}
          handleDiagramSubmit={handleDiagramSubmit}
          setCurPos={setCurPos}
        />
      )}
      {isWordBank && (
        <WordBankDiagram
          currentQuestion={currentQuestion}
          setNextQuestion={setNextQuestion}
          incorrectSetNextQuestion={incorrectSetNextQuestion}
          percent={percent}
          prog={prog}
          setProg={setProg}
        />
      )}
      <ProgressBar completed={prog} />
    </div>
  )
};

