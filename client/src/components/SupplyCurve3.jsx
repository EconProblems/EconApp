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
import Modal from '@mui/material/Modal';
import { Typography, Button, Box } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import axios from 'axios';

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
    setCurPos('');
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

      const updatedSkills = {
        skills: {
          supply2: true,
          supply3: true,
          demand1: true,
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
    setCurPos('');
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
          {/* </div> */}
      {isDiagram && (
        <SCurveDiagram
          currentQuestion={currentQuestion}
          handleDiagramSubmit={handleDiagramSubmit}
          setCurPos={setCurPos}
          curPos={curPos}
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
                </div>

    </div>
    </Box>
    </Modal>
  )
};

