import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Background from "./Background";
import Footer from "./Footer";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  // const [time, setTime] = React.useState(0);
  const [rolls, setRolls] = React.useState(0);

  // const [bestTime, setBestTime] = React.useState(JSON.parse(localStorage.getItem("bestTime")) || 0);
  const [bestRoll, setBestRoll] = React.useState(parseInt(localStorage.getItem("bestRoll")) || 0);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  React.useEffect(() => {
    localStorage.setItem("bestRoll", bestRoll.toString())
}, [bestRoll])

  // let startTime = new Date();
  // let endTime = new Date();
  // let timeDiff = endTime - startTime;
  // timeDiff /= 100;

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
      setRolls((oldRolls) => oldRolls + 1);
    } else {
      setTenzies(false);

      if (!bestRoll || rolls < bestRoll) {
        setBestRoll(rolls)
      }

      setDice(allNewDice());
      setRolls(0);
    }
  }

  

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <>
      {tenzies && <Confetti />}
      <Background />
      <main>
        <h1 className="title">Tenzi!</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">{diceElements}</div>
        <button className="roll-dice" onClick={rollDice}>
          {tenzies ? "New Game" : "Roll"}
        </button>
        <div className="stats">
          {/* <div>Time: {time}</div> */}
          <div>Rolls: {rolls}</div>
          {/* {bestTime ? <div>Best : {bestTime}</div> : ""} */}
          {bestRoll ? <div>Best : {bestRoll}</div> : ""}
        </div>
      </main>
      <Footer />
    </>
  );
}
