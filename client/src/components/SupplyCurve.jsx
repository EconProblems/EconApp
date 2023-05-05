import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import SCurve from "../../dist/SCurve.png";
import diagram from "../../dist/diagram.png";
import supplyQuestions from "../../../DummyData/dummyData.js";
import ProgressBar from "react-progressbar";
import coin from "../../dist/coin.png";
import useSound from 'use-sound';
import correct from '../../dist/sounds/correct.wav';
import incorrect from '../../dist/sounds/incorrect.wav';
import close from "../../dist/images/close_icon.png";

export default function SupplyCurve (props) {
  const percent = 100 / supplyQuestions.supplyQuestions.length;
  const [questions, setQuestions] = useState(supplyQuestions.supplyQuestions);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [xPos, setXPos] = useState(100);
  const [curPos, setCurPos] = useState('');
  const [prog, setProg] = useState(0);
  const [playCorrect] = useSound(correct);
  const [playIncorrect] = useSound(incorrect);
  const [coins, setCoins] = useState([coin, coin, coin])


  useEffect(() => {
    setNextQuestion();
    console.log(questions);
  }, []);


  const setNextQuestion = () => {
    // console.log('percent', prog);
    playCorrect(); // play the sound
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomIndex]);

    setQuestions(prevQuestions => {
      const newQuestions = [...prevQuestions];
      newQuestions.splice(randomIndex, 1);
      return newQuestions;
    });
    if (questions.length === 0) {
      alert("you've completed the lesson. The devs need to change the view")
      props.changeView('App');
    }
  };

  const incorrectSetNextQuestion = () => {
    playIncorrect();
    let coinsCopy = coins;
    coinsCopy.splice(0, 1);
    setCoins(coinsCopy);
    if (coins.length === 0) {
      alert("You have run out of coins")
    }
    if (prog > 0) {
      setProg(prog - percent);
      console.log(questions);
    };
    setQuestions(prevQuestions => {
      const newQuestions = [...prevQuestions];
      const randomIndex = Math.floor(Math.random() * supplyQuestions.supplyQuestions.length);
      newQuestions.push(supplyQuestions.supplyQuestions[randomIndex]);
      return newQuestions;
    });
    const randomSetIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomSetIndex]);
  };

  const handleDrag = (e, ui) => {
    const { x } = ui;
    if (x < 100) {
      setXPos(0);
      setCurPos('left');
    } else if (x >= 100) {
      setXPos(200);
      setCurPos('right');
    } else {
      setXPos(x);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentQuestion.pos === curPos) {
      setXPos(100);
      setProg(prog + percent);
      setNextQuestion();
    } else {
      setXPos(100);
      incorrectSetNextQuestion();
    }
  };

  const handleClose = () => {
    props.changeView('App');
  };

  return (
    <div>
      <img src={close} alt="close" onClick={handleClose} />
      <div>{coins.map((coin, i)=><img src={coin} key={i}></img>)}</div>
      <div style={{ position: "relative" }}>
        <img src={diagram} style={{ position: "absolute", zIndex: "1", top: "0", left: "0" }} />
        <Draggable axis="x" onDrag={handleDrag} position={{ x: xPos, y: 0 }}>
          <img src={SCurve} style={{ position: "absolute", zIndex: "2", top: "0", left: "0" }} />
        </Draggable>
        <p>{currentQuestion && currentQuestion.question}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <button style={{
          position: "absolute",
          bottom: "20px",
          left: "0",
        }}
        type="submit">submit Answer</button>
      </form>
      <div>
        <ProgressBar completed={prog} />
      </div>
    </div>
  );
};