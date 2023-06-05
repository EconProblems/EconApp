import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import SCurve from "../../dist/SCurve.png";
import diagram from "../../dist/diagram.png";
import useSound from 'use-sound';

export default function SCurveDiagram (props) {
  const [currentQuestion, setCurrentQuestion] = useState(props.currentQuestion);
  const [xPos, setXPos] = useState(100);
  const [curPos, setCurPos] = useState('');

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
    if (props.currentQuestion.pos === curPos) {
      setXPos(100);
      props.setAnswer(true);
    } else {
      setXPos(100);
      props.setAnswer(false);
      props.incorrectSetNextQuestion();
      if (props.setProg) {
        props.setProg(0);
      }
    }
  };

  return (
    <div>
      <div style={{ position: "relative" }}>
        <img src={diagram} style={{ position: "absolute", zIndex: "1", top: "0", left: "0" }} />
        <Draggable axis="x" onDrag={handleDrag} position={{ x: xPos, y: 0 }}>
          <img src={SCurve} style={{ position: "absolute", zIndex: "2", top: "0", left: "0" }} />
        </Draggable>
        <p>{currentQuestion && currentQuestion.question}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <button style={{
          position: "absolute",
          bottom: "20px",
          left: "0",
        }}
        type="submit">submit Answer</button>
      </form>
    </div>
  );
}