import React, { useState, useEffect, useRef } from "react";
import Draggable from 'react-draggable';
import DemandCurvePic from "../../dist/images/DemandCurvePicWeight.svg";
import SupplyCurvePic from "../../dist/images/SupplyCurveWeight.svg";
import diagram from "../../dist/images/BlankMicro.png";
import { supplyDemandQuestions1 } from "../../../DummyData/supplyDemandDummyData.js";
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


export default function SupplyDemand1(props) {
  const percent = 100 / supplyDemandQuestions1.length;
  const [questions, setQuestions] = useState(supplyDemandQuestions1);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [demandXPos, setDemandXPos] = useState(100);
  const [demandCurPos, setDemandCurPos] = useState('');
  const [supplyXPos, setSupplyXPos] = useState(100);
  const [supplyCurPos, setSupplyCurPos] = useState('');
  const [prog, setProg] = useState(0);
  const [playCorrect] = useSound(correct);
  const [playIncorrect] = useSound(incorrect);
  const [coins, setCoins] = useState([coin, coin, coin]);
  const [curCurve, setCurCurve] = useState();
  const [isTransparent, setIsTransparent] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(true);
  const [showRightArrow, setShowRightArrow] = useState(true);

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
          supply2: true,
          supply3: true,
          demand1: true,
          demand2: true,
          demand3: true,
          macro1: true,
          sd1: true,
          sd2: true,
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
    setSupplyXPos(100);
    setDemandXPos(100);
    setSupplyCurPos('');
    setDemandCurPos('');
    setShowLeftArrow(true);
    setShowRightArrow(true);
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
      const randomIndex = Math.floor(Math.random() * supplyDemandQuestions1.length);
      newQuestions.push(supplyDemandQuestions1[randomIndex]);
      return newQuestions;
    });

    const randomSetIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomSetIndex]);
    setSupplyXPos(100);
    setDemandXPos(100);
    setSupplyCurPos('');
    setDemandCurPos('');
    setShowLeftArrow(true);
    setShowRightArrow(true);
  };

  const supplyHandleDrag = (e, ui) => {
    const { x } = ui;

    if (x < 100) {
      setSupplyXPos(0);
      setSupplyCurPos('left');
    } else if (x >= 100) {
      setSupplyXPos(200);
      setSupplyCurPos('right');
    } else {
      setXPos(x);
    }

    setShowLeftArrow(supplyCurPos !== 'left');
    setShowRightArrow(supplyCurPos !== 'right');
  };

  const supplyCurvePicRef = useRef(null);

   const demandHandleDrag = (e, ui) => {
    console.log("dragging")
    const { x } = ui;
    setCurCurve('demand')
    if (x < 100) {
      setDemandXPos(0);
      setDemandCurPos('left');
    } else if (x >= 100) {
      setDemandXPos(200);
      setDemandCurPos('right');
    } else {
      setSupplyXPos(x);
    }

    setShowLeftArrow(demandCurPos !== 'left');
    setShowRightArrow(demandCurPos !== 'right');
    // here
    supplyCurvePicRef.current.style.pointerEvents = "auto";
  }; 
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (demandCurPos !== "" && supplyCurPos !== "" || demandCurPos === "" && supplyCurPos === "") {
      incorrectSetNextQuestion();
    }
    if (demandCurPos !== "") {
      setCurCurve('demand')
      if (currentQuestion.curve === "demand" && demandCurPos === currentQuestion.pos) {
        setProg(prog + percent);
        setNextQuestion();
      } else {
        incorrectSetNextQuestion();
      }
    }
    if (supplyCurPos !== "") {
      setCurCurve('supply')
      if (currentQuestion.curve === "supply" && supplyCurPos === currentQuestion.pos) {
      setProg(prog + percent);
      setNextQuestion();
      } else {
        incorrectSetNextQuestion();
      }
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

  function DraggableImage({ src, onDrag, position }) {
    const [dragging, setDragging] = useState(false);
  
    const handleStart = () => {
      setDragging(true);
    };
  
    const handleStop = () => {
      setDragging(false);
    };
  
    return (
      <Draggable
        axis="x"
        onDrag={onDrag}
        position={position}
        onStart={handleStart}
        onStop={handleStop}
      >
        <div
          style={{
            cursor: dragging ? "grabbing" : "grab",
          }}
        >
          <img
            src={src}
            alt="draggable-image"
            style={{
              width: "100%",
              height: "auto",
              background: "transparent", // Make the image's background transparent
            }}
          />
        </div>
      </Draggable>
    );
  }

  const isPixelTransparent = (image, x, y) => {
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, image.width, image.height);
  
    // Get the pixel color at the specified coordinates (x, y)
    const pixelData = ctx.getImageData(x, y, 1, 1).data;
  
    // Check if the pixel is transparent (alpha channel is 0)
    return pixelData[3] === 0;
  };

  // Event handler for clicking on SupplyCurvePic
  const handleSupplyCurvePicClick = (e) => {
    const image = supplyCurvePicRef.current;
    const rect = image.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if the clicked pixel is transparent
    const clickedIsTransparent = isPixelTransparent(image, x, y);
    
    // Update state and apply pointerEvents styling
    setIsTransparent(clickedIsTransparent);
    image.style.pointerEvents = clickedIsTransparent ? "none" : "auto";
  };
  
  const resetCurves = () => {
  setSupplyXPos(100);
  setDemandXPos(100);
  setSupplyCurPos('');
  setDemandCurPos('');
  setShowLeftArrow(true);
  setShowRightArrow(true);
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
          <div >
          <br />
          <div style={{ position: "relative" }}>

    <div style={{ margin: "10px", marginTop: "20px", marginBottom: "40px" }}>
      <p style={{ maxWidth: "80vw" }}>{currentQuestion && currentQuestion.question}</p>
      <span style={{ fontSize: "12px", color: "#E40066" }}>drag the curve left or right to answer the question</span>
      <br />

  </div>
  <div
    style={{
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      size: "2em",
      pointerEvents: "auto"
    }}
  >        <img
  src={diagram}
  style={{
    position: "absolute",
    zIndex: "1",
    top: "+30px", 
    width: "100",
    height: "auto",
    maxWidth: "450px",
  }}
  alt="diagram"
/>
                <div style={{ position: "absolute", marginLeft: "5px", zIndex: "2", top: "220px", width: "30px", height: "auto" }}>
                  {/* <img src={leftArrow} style={{ position: "absolute", left: "5px", width: "100px", height: "auto", opacity: supplyCurPos || demandCurPos === "left" ? 0 : 1, transition: "opacity 0.3s ease-in-out" }} alt="left-arrow" />
                  <img src={rightArrow} style={{ position: "absolute", right: "15px", width: "100px", height: "auto", opacity: supplyCurPos || demandCurPos === "right" ? 0 : 1, transition: "opacity 0.3s ease-in-out" }} alt="right-arrow" />
                 */}
                  <img
                    src={leftArrow}
                    style={{
                      position: "absolute",
                      left: "5px",
                      width: "100px",
                      height: "auto",
                      opacity: showLeftArrow ? 1 : 0, // Updated opacity based on state
                      transition: "opacity 0.3s ease-in-out",
                    }}
                    alt="left-arrow"
                  />

                  <img
                    src={rightArrow}
                    style={{
                      position: "absolute",
                      right: "15px",
                      width: "100px",
                      height: "auto",
                      opacity: showRightArrow ? 1 : 0, // Updated opacity based on state
                      transition: "opacity 0.3s ease-in-out",
                    }}
                    alt="right-arrow"
                  />
                </div>

                <Draggable axis="x" onDrag={demandHandleDrag} position={{ x: demandXPos - 50, y: 0 }}  >
                    <img src={DemandCurvePic} draggable="false" style={{ position: "absolute", marginLeft: "-50px", zIndex: "2", top: "+80px", width: "400px", height: "auto", transform: "translate(0, 0)", pointerEvents: "stroke"}} alt="d-curve" />
                </Draggable>

                <Draggable axis="x" onDrag={supplyHandleDrag} position={{ x: supplyXPos - 50, y: 0 }} bounds="parent">
                    <img src={SupplyCurvePic} onClick={handleSupplyCurvePicClick} ref={supplyCurvePicRef} draggable="false" style={{ position: "absolute", marginLeft: "-49px", zIndex: "2", top: "+80px", width: "400px", height: "auto", transform: "translate(0, 0)", background: "transparent" }} alt="d-curve" />
                </Draggable>
              
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "405px",
                        marginLeft: "20px",
                        padding: "10px"
                    }}
                >
                  <div style={{marginRight: "10px"}}>
                <Button style={{backgroundColor: "#eac435"}}onClick={resetCurves}>Reset Curve</Button>
                    </div>
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

