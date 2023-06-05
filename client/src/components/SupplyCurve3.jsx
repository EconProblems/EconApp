import React, { useState, useEffect } from "react";
import SCurveDiagram from './SCurveDiagram.jsx';
import correct from '../../dist/sounds/correct.wav';
import incorrect from '../../dist/sounds/incorrect.wav';
import close from "../../dist/images/close_icon.png";
import coin from "../../dist/coin.png";
import useSound from 'use-sound';
import ProgressBar from "react-progressbar";

const supplyQuestions = [
  {
    question: 'What will happen to the supply of oranges if there is a Hurricane that hits florida?',
    pos:'left'
  },
  {
    question: 'What will happen to the supply of wheat if fertilizer becomes more expensive?',
    pos:'left'
  },
  {
    question: 'What will happen to the supply of electric vehicles if new battery factories are built?',
    pos:'right'
  },
  {
    question: 'What happens to the supply of toys if the factory workers get a pay raise?',
    pos:'left'
  },
  {
    question: 'What will happen to the global coffee supply if Vietnam plants millions more acres of coffee trees?',
    pos:'right'
  },
  {
    question: 'What will happen to the supply of gasoline if the government demands refineries install new pollution reducing technologies?',
    pos:'left'
  },
  {
    question: 'What will happen to the supply of bread in town if rents are decreased on bakeries?',
    pos:'right'
  },
  {
    question: 'What will happen to the supoply of shirts if cotton plants are engineered to have a greater yield with less water?',
    pos:'right'
  }
]


export default function SupplyCurve3(props) {
  const [playCorrect] = useSound(correct);
  const [playIncorrect] = useSound(incorrect);
  const [coins, setCoins] = useState([coin, coin, coin]);
  const [questions, setQuestions] = useState(supplyQuestions);
  const [currentQuestion, setCurrentQuestion] = useState();
  const [isDiagram, setIsDiagram] = useState(false);
  const [prog, setProg] = useState(0);
  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    if (answer === true) {
      setNextQuestion();
    } else {
      incorrectSetNextQuestion();
    };
  },[answer]);

const incorrectSetNextQuestion = () => {
  playIncorrect();
  let coinsCopy = coins;
  coinsCopy.splice(0, 1);
  setCoins(coinsCopy);
  if (coins.length === 0) {
    alert("You have run out of coins");
  }
  if (prog > 0) {
    setProg(prog - percent);
    console.log(questions);
  }
  setQuestions(prevQuestions => {
    const newQuestions = [...prevQuestions];
    const randomIndex = Math.floor(Math.random() * supplyQuestions.length);
    newQuestions.push(supplyQuestions[randomIndex]);
    return newQuestions;
  });
  const randomSetIndex = Math.floor(Math.random() * questions.length);
  setCurrentQuestion(questions[randomSetIndex]);
  console.log(currentQuestion)
  if (questions[randomSetIndex].pos) { // Check if the current question has a 'pos' property
    setIsDiagram(true);
  } else {
    setIsDiagram(false);
  }
};

  const handleClose = () => {
    props.changeView('App');
  };

  useEffect(() => {
    setNextQuestion();
    console.log(questions);
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
      alert("You've completed the lesson. The devs need to change the view");
      props.changeView('App');
    }

    if (questions[randomIndex].pos) {
      setIsDiagram(true);
    } else {
      setIsDiagram(false);
    }
  };


  return (
    <div>
      <img src={close} alt="close" onClick={handleClose} />
      {isDiagram && (
        <SCurveDiagram
          currentQuestion={currentQuestion}
          setAnswer={setAnswer}
          incorrectSetNextQuestion={incorrectSetNextQuestion}
          setProg={setProg}
        />
      )}
      <ProgressBar completed={prog} />
    </div>
  )
};

