import React, { useState, useEffect } from "react";
import DCurveDiagram from './DCurveDiagram.jsx';
import correct from '../../dist/sounds/correct.wav';
import incorrect from '../../dist/sounds/incorrect.wav';
import close from "../../dist/images/close_icon.png";
import coin from "../../dist/coin.png";
import useSound from 'use-sound';
import ProgressBar from "react-progressbar";
import WordBankDiagram from "./WordBankDiagram.jsx";
import { demandQuestions3 } from "../../../DummyData/demandDummyData.js";
import Modal from '@mui/material/Modal';
import { Typography, Button, Box } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import axios from 'axios';

export default function DemandCurve3(props) {
  const percent = 100 / demandQuestions3.questions.length;
  const [playCorrect] = useSound(correct);
  const [playIncorrect] = useSound(incorrect);
  const [coins, setCoins] = useState([coin, coin, coin]);
  const [questions, setQuestions] = useState(demandQuestions3.questions);
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
          demand2: true,
          demand3: true,
          sd1: true,
          macro1: true,
        },
        id: props.userProfileData._id
      };
      console.log(updatedSkills)
      if (!props.userProfileData.skills.sd1) {
      alert("You've completed the lesson and the unit! You've earned an award!");
      } else {
        alert("You've completed the lesson!");
      }
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
          {/* </div> */}
      {isDiagram && (
        <DCurveDiagram
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

