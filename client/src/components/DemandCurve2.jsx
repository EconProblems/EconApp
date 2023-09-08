import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import ProgressBar from "react-progressbar";
import useSound from 'use-sound';
import correct from '../../dist/sounds/correct.wav';
import incorrect from '../../dist/sounds/incorrect.wav';
import { demandQuestions2 } from "../../../DummyData/demandDummyData.js";
import coin from "../../dist/coin.png";
import close from "../../dist/images/close_icon.png";
import Modal from '@mui/material/Modal';
import { Typography, Button, Box } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import axios from 'axios';

export default function DemandCurve2(props) {
  const percent = 100 / demandQuestions2.questions.length;
  const [questions, setQuestions] = useState(demandQuestions2.questions);
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
            demand1: true,
            demand2: true,
            demand3: true,
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
      const randomIndex = Math.floor(Math.random() * demandQuestions2.length);
      newQuestions.push(demandQuestions2[randomIndex]);
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
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          maxHeight: "100vh",
          overflow: "auto", 
          overflowX: "hidden",
          margin: "10px",
          marginTop: "20px",
          marginBottom: "40px",
                // Hide scrollbar for Chrome, Safari, and Opera
          scrollbarWidth: 'none',
          // Hide scrollbar for IE, Edge, and Firefox
          msOverflowStyle: 'none',
          '&::webkitScrollbar': {
            width: '0px',
            // background: 'transparent', // Optional: If you want to hide the scrollbar track.
          },
        }}
      >



      <div >
          <img src={close} alt="close" onClick={handleClose} style={{position: "absolute", top: 0, left: 0, zIndex: 3, margin: "10px", height: "25px", width: "auto" }} />
          <div style={{ position: "absolute", top: "18px", left: "35px", zIndex: 3, width: "95%"  }}>
          {prog > 0 ? (
              <ProgressBar completed={prog} style={progressBarStyle} />
            ) : (
              <div style={{ width: "90%", height: "10px", border: "1px solid #ccc" }} />
          )}
              <div style={{  position: "absolute", left: "20px" }}>
                {coins.map((coin, i) => (
                <img src={coin} key={i} alt={`coin-${i}`} style={{ marginLeft: "5px", width: "50px" }} />
              ))}
              </div>
          </div>
        </div>
        <br />
          <div style={{ position: "relative" }}>
      {currentQuestion && (
        <div style={{ position: "relative"}}>
      <p style={{ maxWidth: "80vw" }}>{currentQuestion && currentQuestion.question}</p>
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
        </div>
      </Box>
    </Modal>
  );
}