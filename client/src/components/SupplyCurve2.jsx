import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import ProgressBar from "react-progressbar";
import useSound from 'use-sound';
import SCurve from "../../dist/SCurve.png";
import diagram from "../../dist/diagram.png";
import correct from '../../dist/sounds/correct.wav';
import incorrect from '../../dist/sounds/incorrect.wav';
import supplyQuestions from "../../../DummyData/dummyData.js";
import coin from "../../dist/coin.png";
import close from "../../dist/images/close_icon.png";

export default function SupplyCurve2(props) {
  const percent = 100 / supplyQuestions.supplyQuestions2.questions.length;
  const [questions, setQuestions] = useState(supplyQuestions.supplyQuestions2.questions);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [xPos, setXPos] = useState(100);
  const [curPos, setCurPos] = useState('');
  const [prog, setProg] = useState(0);
  const [playCorrect] = useSound(correct);
  const [playIncorrect] = useSound(incorrect);
  const [coins, setCoins] = useState([coin, coin, coin])

  useEffect(() => {
    setNextQuestion();
  }, []);

  const setNextQuestion = () => {
    playCorrect();
    if (questions.length === 0) {
      alert("You've completed the lesson!");
      props.changeView('App');
      return;
    }

    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomIndex]);

    setQuestions(prevQuestions => {
      const newQuestions = [...prevQuestions];
      newQuestions.splice(randomIndex, 1);
      return newQuestions;
    });


    console.log(questions);
    setSelectedAnswers([]);
  };

  const incorrectSetNextQuestion = () => {
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
    }

    setQuestions(prevQuestions => {
      const newQuestions = [...prevQuestions];
      const randomIndex = Math.floor(Math.random() * supplyQuestions.supplyQuestions2.questions.length);
      newQuestions.push(supplyQuestions.supplyQuestions2.questions[randomIndex]);
      return newQuestions;
    });

    setSelectedAnswers([]);

    const randomSetIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomSetIndex]);
  };

  const toggleAnswer = (answer) => {
    const updatedAnswers = [...selectedAnswers];
    const answerIndex = updatedAnswers.indexOf(answer);
    if (answerIndex !== -1) {
      updatedAnswers.splice(answerIndex, 1);
    } else {
      updatedAnswers.push(answer);
    }
    setSelectedAnswers(updatedAnswers);
  };



  const submitAnswer = (e) => {
    e.preventDefault();
    // Create a new array to avoid modifying the original state
    let curSelectedAnswers = [...selectedAnswers];
    curSelectedAnswers.sort();

    // Create a new array to avoid modifying the original state
    let wordAns = [...currentQuestion.wordAns];
    wordAns.sort();

    const wordAnsString = JSON.stringify(wordAns);
    const curSelectedAnswersString = JSON.stringify(curSelectedAnswers);


    if (wordAnsString === curSelectedAnswersString) {
      setProg(prog + percent);
      setNextQuestion();
    } else {
      incorrectSetNextQuestion();
      setSelectedAnswers([]);
    }
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
      <h1>Question Page</h1>
      <img src={close} alt="close" onClick={handleClose} />
      <div>{coins.map((coin, i)=><img src={coin} key={i}></img>)}</div>
      {currentQuestion && (
        <div>
          <h3>Question: {currentQuestion.question}</h3>
          <div style={{ marginBottom: "20px" }}>
            {currentQuestion.wordBank.map((answer, index) => (
              <button
                key={index}
                onClick={() => toggleAnswer(answer)}
                style={{
                  margin: "5px",
                  background: selectedAnswers.includes(answer) ? "lightblue" : "white",
                }}
              >
                {answer}
              </button>
            ))}
          </div>
          <button onClick={submitAnswer}>Submit</button>
        </div>
      )}
      <div>
        <ProgressBar completed={prog} />
      </div>
    </div>
  );
}