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
import theme from "../themes/default.jsx";
import Modal from '@mui/material/Modal';
import { Typography, Button, Box } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';

export default function SupplyCurve(props) {
  const percent = 100 / supplyQuestions.supplyQuestions.length;
  const [questions, setQuestions] = useState(supplyQuestions.supplyQuestions);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [xPos, setXPos] = useState(100);
  const [curPos, setCurPos] = useState('');
  const [prog, setProg] = useState(0);
  const [playCorrect] = useSound(correct);
  const [playIncorrect] = useSound(incorrect);
  const [coins, setCoins] = useState([coin, coin, coin]);

  useEffect(() => {
    setNextQuestion();
  }, []);

  const setNextQuestion = () => {
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
      handleClose();
    }
  };

  const incorrectSetNextQuestion = () => {
    playIncorrect();
    let coinsCopy = coins;
    coinsCopy.splice(0, 1);
    setCoins(coinsCopy);

    if (coins.length === 0) {
      alert("You have run out of coins");
      props.setIsSupplyModalOpen(false);
      props.changeView('App');
    }

    if (prog > 0) {
      setProg(prog - percent);
    }

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
    props.setIsSupplyModalOpen(false);
    props.changeView('App');
  };

  const handleOpen = () => {
    props.setIsSupplyModalOpen(true);
  };

  const progressBarStyle = {
    color: "#03cea4",
    backgroundColor: "white",
    borderRadius: "5px",
    border: "solid"
  };


  return (
    <Modal
      open={props.isSupplyModalOpen}
      onClose={handleClose}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          backgroundColor: '#ffffff',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
        style={{
          width: '95%',
          height: '95%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
        }}>
          <div style={{ position: "absolute", top: 0, left: 0, zIndex: "3" }}>
            <img src={close} alt="close" onClick={handleClose} />
          </div>
          <div style={{ position: "fixed", top: "20px", left: "50px", width: "95%", zIndex: "3" }}>
            {prog > 0 ? (
              <ProgressBar completed={prog} style={progressBarStyle} />
            ) : (
              <div style={{ width: "100%", height: "10px", border: "1px solid #ccc" }} />
            )}
                    <div style={{ left: "20px", display: "flex", zIndex: "3" }}>
          {coins.map((coin, i) => (
            <img src={coin} key={i} alt={`coin-${i}`} style={{ marginLeft: "5px", width: "50px" }} />
          ))}
          </div>
          <br />
          <div style={{ position: "relative"}}>
            <p>{currentQuestion && currentQuestion.question}</p>
            <span style={{ fontSize: "12px", color: "#E40066" }}>drag the curve left or right to answer the question</span>
            <br />

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <img src={diagram} style={{ position: "absolute", zIndex: "1", top: "+30px" }} alt="diagram" />
              <Draggable axis="x" onDrag={handleDrag} position={{ x: xPos - 50, y: 0 }}>
                <img src={SCurve} style={{ position: "absolute", zIndex: "2", top: "+80px" }} alt="s-curve" />
              </Draggable>
            </div>

          </div>

          </div>
          <div style={{ marginTop: "auto", marginBottom: "50px" }}>
              <form onSubmit={handleSubmit}>
                <Button type="submit">Submit Answer</Button>
              </form>
            </div>
        </div>
      </Box>
    </Modal>
  );
}