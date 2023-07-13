import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import SCurve from "../../dist/SCurve.png";
import diagram from "../../dist/diagram.png";
import { Button } from "@mui/material";
import theme from "../themes/default.jsx";

export default function SCurveDiagram(props) {
  const [currentQuestion, setCurrentQuestion] = useState(props.currentQuestion);
  const [xPos, setXPos] = useState(100);
  const [curPos, setCurPos] = useState("");

  useEffect(() => {
    setCurrentQuestion(props.currentQuestion);
    setXPos(100);
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
      <div>
        <img
          src={diagram}
          style={{ position: "relative", zIndex: "1" }}
          alt="Diagram"
        />
        <Draggable axis="x" onDrag={handleDrag} position={{ x: xPos, y: 0 }}>
          <img
            src={SCurve}
            style={{ position: "absolute", zIndex: "2", top: "0", left: "0" }}
            alt="SCurve"
          />
        </Draggable>
      </div>
      <div style={{ marginTop: "20px" }}>
        <p>{currentQuestion && currentQuestion.question}</p>
      </div>
      <form onSubmit={props.handleDiagramSubmit}>
        <div style={{ position: "fixed", bottom: "20px", left: "50%", transform: "translateX(-50%)" }}>
          <Button type="submit" variant="contained" color="primary">
            Submit Answer
          </Button>
        </div>
      </form>
    </div>
  );
}