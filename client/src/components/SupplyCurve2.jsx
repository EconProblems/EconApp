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
import Modal from '@mui/material/Modal';
import { Typography, Button, Box } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import axios from 'axios';

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

  const theme = useTheme();

  useEffect(() => {
    setNextQuestion();
  }, []);

  const setNextQuestion = () => {
    playCorrect();
    if (questions.length === 0) {
      alert("You've completed the lesson!");


      const updatedSkills = {
        skills: {
          supply2: true,
          supply3: true,
        },
        id: props.userProfileData._id
      };
      console.log(updatedSkills)

      console.log('here is updated userProfileData', updatedSkills)
      axios.put(`/user/${props.userProfileData.id}`, { data: updatedSkills })
      .then((response) => {
        console.log('Skills updated successfully:', response.data);
        props.setUserProfileData(response.data);
      })
      .catch((error) => {
        console.error('Error updating skills:', error);
      });
      props.changeView('App');
      handleClose();

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
    props.setIsModalOpen(false);
    props.changeView('App');
  };

  const handleOpen = () => {
    props.setIsModalOpen(true);
  };

  const progressBarStyle = {
    color: "#03cea4",
    backgroundColor: "white",
    borderRadius: "5px",
    border: "solid"
  };


  return (
      <Modal
      open={props.isModalOpen}
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
    <img src={close} alt="close" onClick={handleClose} style={{ margin: "10px", height: "25px", width: "auto" }} />
    </div>
      <div style={{ position: "fixed", top: "20px", left: "50px", width: "90%", zIndex: "3" }}>
        {prog > 0 ? (
          <ProgressBar completed={prog} style={progressBarStyle} />
        ) : (
          <div style={{ width: "90%", height: "10px", border: "1px solid #ccc" }} />
        )}
    <div style={{ left: "20px", display: "flex", zIndex: "3" }}>
      {coins.map((coin, i) => (
        <img src={coin} key={i} alt={`coin-${i}`} style={{ marginLeft: "5px", width: "50px" }} />
      ))}
    </div>
    </div>
      {currentQuestion && (
        <div style={{ position: "relative"}}>
          <h3>Question: {currentQuestion.question}</h3>
          <div style={{ marginBottom: "20px" }}>
            {currentQuestion.wordBank.map((answer, index) => (
              <button
                key={index}
                onClick={() => toggleAnswer(answer)}
                style={{
                  margin: "5px",
                  background: selectedAnswers.includes(answer) ? theme.palette.secondary.main : theme.palette.background.default,
                  color: selectedAnswers.includes(answer) ? theme.palette.text.primary : theme.palette.primary.main,
                  padding: "8px 16px",
                  borderRadius: "5px",
                  border: "1px solid",
                  borderColor: theme.palette.secondary.main,
                  cursor: "pointer",
                }}
              >
                {answer}
              </button>
            ))}
          </div >
          <div style={{ marginTop: "auto", marginBottom: "50px" }}>
          <Button onClick={submitAnswer}>Submit</Button>
          </div>
        </div>
          )}
        </div>
      </Box>
    </Modal>
  );
}