import React, { useState, useEffect } from "react";
import Draggable from 'react-draggable';
import SCurve from "../../dist/SCurve.png";
// import diagram from "../../dist/diagram.png";
import SupplyCurvePic from "../../dist/images/SupplyCurve.png";;
import diagram from "../../dist/images/BlankMicro.png";
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
import axios from 'axios';
import leftArrow from "../../dist/images/leftArrow.png"
import rightArrow from "../../dist/images/rightArrow.png"

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

  const theme = useTheme();
  
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
      alert("You've completed the lesson!");
      // send db put
      const updatedSkills = {
        skills: {
          supply2: true
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
    }
    setXPos(100);
    setCurPos('');
  };

  const incorrectSetNextQuestion = () => {
    playIncorrect();
    let coinsCopy = coins;
    coinsCopy.splice(0, 1);
    setCoins(coinsCopy);

    if (coins.length === 0) {
      alert("You have run out of coins");
      props.setIsModalOpen(false);
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
    setXPos(100);
    setCurPos('');
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
        overflowY: 'scroll',
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
          <br />
          <div style={{ position: "relative"}}>
          <div style={{ position: "relative" }}>
            <div style={{ margin: "10px", marginTop: "20px", marginBottom: "40px" }}>
              <p style={{ maxWidth: "80vw" }}>{currentQuestion && currentQuestion.question}</p>
              <span style={{ fontSize: "12px", color: "#E40066" }}>drag the curve left or right to answer the question</span>
              <br />
            </div>
          </div>

          <div
    style={{
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: "5px", 
      size: "2em"// Adjust this value to move the container further down
    
    }}
  >            <img
                src={diagram}
                style={{
                  position: "absolute",
                  zIndex: "1",
                  top: "+30px",
                  width: "450px",
                  height: "auto",
                }}
                alt="diagram"
              />
                <div style={{ position: "absolute", marginLeft: "50px", zIndex: "2", top: "180px", width: "30px", height: "auto" }}>
                  <img src={leftArrow} style={{ position: "absolute", left: "5px", width: "100px", height: "auto", opacity: curPos === "left" ? 0 : 1, transition: "opacity 0.3s ease-in-out" }} alt="left-arrow" />
                  <img src={rightArrow} style={{ position: "absolute", right: "15px", width: "100px", height: "auto", opacity: curPos === "right" ? 0 : 1, transition: "opacity 0.3s ease-in-out" }} alt="right-arrow" />
                </div>
              <Draggable axis="x" onDrag={handleDrag} position={{ x: xPos - 50, y: 0 }}>

                <img src={SupplyCurvePic} draggable="false" style={{ position: "absolute", marginLeft: "-100px", zIndex: "2", top: "+80px", width: "400px", height: "auto" }} alt="s-curve" />

              </Draggable>
              <div style={{ marginTop: "450px", marginBottom: "550px" }}>
                <form onSubmit={handleSubmit}>
                  <Button type="submit">Submit Answer</Button>
                </form>
              </div>
            </div>
          </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
}

