import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";

export default function WordBankDiagram(props) {
  const [currentQuestion, setCurrentQuestion] = useState(props.currentQuestion);
  const [xPos, setXPos] = useState(100);
  const [curPos, setCurPos] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  useEffect(() => {
    setCurrentQuestion(props.currentQuestion);
    setXPos(100);
    setSelectedAnswers([]);
  }, [currentQuestion]);

  const toggleAnswer = (answer) => {
    setSelectedAnswers((prevSelectedAnswers) => {
      const isSelected = prevSelectedAnswers.includes(answer);
      if (isSelected) {
        return prevSelectedAnswers.filter((selectedAnswer) => selectedAnswer !== answer);
      } else {
        return [...prevSelectedAnswers, answer];
      }
    });
    console.log(props.selectedAnswers);
  };

  useEffect(() => {
    console.log(selectedAnswers);
  }, [selectedAnswers]);


  const handleDrag = (e, ui) => {
    const { x } = ui;
    if (x < 100) {
      setXPos(0);
      setCurPos("left");
    } else if (x >= 100) {
      setXPos(200);
      setCurPos("right");
    } else {
      setXPos(x);
    }
  };

  const submitWordAnswer = (e) => {
    e.preventDefault();
    console.log(selectedAnswers);
    let curSelectedAnswers = [...selectedAnswers]; // Create a new array to avoid modifying the original state
    curSelectedAnswers.sort();
    let wordAns = [...currentQuestion.wordAns]; // Create a new array to avoid modifying the original state
    wordAns.sort();
    const wordAnsString = JSON.stringify(wordAns);
    const curSelectedAnswersString = JSON.stringify(curSelectedAnswers);
    console.log(wordAnsString, curSelectedAnswersString)
    if (wordAnsString === curSelectedAnswersString) {
      props.setProg(props.prog + props.percent);
      props.setNextQuestion();
    } else {
      props.incorrectSetNextQuestion();
      setSelectedAnswers([]);
    }
  };

  return (
    <div>
      {currentQuestion && (
        <div>
          <h3>Question: {currentQuestion.question}</h3>
          <div style={{ marginBottom: "20px" }}>
            {currentQuestion.wordBank.map((answer, index) => (
              <button
                key={index}
                onClick={() => toggleAnswer(answer)}
                style={{
                  margin: "5px",
                  background: selectedAnswers.includes(answer)
                    ? "lightblue"
                    : "white",
                }}
              >
                {answer}
              </button>
            ))}
          </div>
          <button onClick={submitWordAnswer}>Submit</button>
        </div>
      )}
    </div>
  );
}