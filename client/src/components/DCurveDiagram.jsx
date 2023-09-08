import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import DemandCurvePic from "../../dist/images/DemandCurvePic.png";;
import diagram from "../../dist/images/BlankMicro.png";
import { Button } from "@mui/material";
import theme from "../themes/default.jsx";
import leftArrow from "../../dist/images/leftArrow.png"
import rightArrow from "../../dist/images/rightArrow.png"

export default function DCurveDiagram(props) {
  const [currentQuestion, setCurrentQuestion] = useState(props.currentQuestion);
  const [xPos, setXPos] = useState(100);
  const [curPos, setCurPos] = useState("");

  useEffect(() => {
    setCurrentQuestion(props.currentQuestion);
    setXPos(100);
    setCurPos('');

  }, [props.currentQuestion]);

  const handleDrag = (e, ui) => {
    const { x } = ui;
    if (x < 100) {
      setXPos(0);
      props.setCurPos("left");
    } else if (x >= 100) {
      setXPos(200);
      props.setCurPos("right");
    } else {
      setXPos(x);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <p style={{ maxWidth: "80vw" }}>{currentQuestion && currentQuestion.question}</p>
      <span style={{ fontSize: "12px", color: "#E40066" }}>drag the curve left or right to answer the question</span>
      <div
    style={{
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: "5px", 
      size: "2em"
    }}
  >           
        <img src={diagram} style={{ position: "absolute", zIndex: "1", top: "+30px", width: "450px", height: "auto", }} alt="diagram" />
        <div style={{ position: "absolute", marginLeft: "-25px", zIndex: "2", top: "180px", width: "30px", height: "auto" }}>
          <img src={leftArrow} style={{ position: "absolute", left: "5px", width: "100px", height: "auto", opacity: props.curPos === "left" ? 0 : 1, transition: "opacity 0.3s ease-in-out" }} alt="left-arrow" />
          <img src={rightArrow} style={{ position: "absolute", right: "15px", width: "100px", height: "auto", opacity: props.curPos === "right" ? 0 : 1, transition: "opacity 0.3s ease-in-out" }} alt="right-arrow" />
        </div>
        <Draggable axis="x" onDrag={handleDrag} position={{ x: xPos - 50, y: 0 }}>
          <img src={DemandCurvePic} draggable="false" style={{ position: "absolute", marginLeft: "-10px", zIndex: "2", top: "+80px", width: "400px", height: "auto" }} alt="s-curve" />
        </Draggable>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "405px",
          }}
  >
        <form onSubmit={props.handleDiagramSubmit}>
          <Button type="submit" variant="contained" color="primary">
            Submit Answer
          </Button>
      </form>
      </div>
      </div>
    </div>
  );
}