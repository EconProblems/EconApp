import React, { useState } from "react";
import Draggable from "react-draggable";

export default function SupplyCurve () {
  const [xPos, setXPos] = useState(0);

  const handleDrag = (e, ui) => {
    const { x } = ui;
    if (x > 100 && x < 500) {
      // limit the draggable element to the range between 100 and 500
      setXPos(x);
    }
  };

  return (
    <Draggable axis="x" onDrag={handleDrag} position={{ x: xPos, y: 0 }}>
      <img src={'../../dist/SCurve.png'} />
    </Draggable>
  );
};