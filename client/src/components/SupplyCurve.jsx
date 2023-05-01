import React, { useState } from "react";
import Draggable from "react-draggable";
import SCurve from "./SCurve.png";
import diagram from "../../dist/diagram.png";

export default function SupplyCurve () {
  const [xPos, setXPos] = useState(100);
  const [left, setLeft] =useState(false);
  const [right, setRight] =useState(false);

  const handleDrag = (e, ui) => {
    const { x } = ui;
    if (x < 100) {
      setXPos(0);
      setLeft(true);
      setRight(false);
    } else if (x >= 100) {
      setXPos(200);
      setRight(true);
      setLeft(false);
    } else {
      setXPos(x);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <img src={diagram} style={{ position: "absolute", zIndex: "1", top: "0", left: "0" }} />
      <Draggable axis="x" onDrag={handleDrag} position={{ x: xPos, y: 0 }}>
        <img src={SCurve} style={{ position: "absolute", zIndex: "2", top: "0", left: "0" }} />
      </Draggable>
    </div>
  );
};