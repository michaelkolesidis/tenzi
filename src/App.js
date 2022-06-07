import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Background from "./Background";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [time, setTime] = React.useState(0);
  const [rolls, setRolls] = React.useState(0);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  let startTime = new Date();

  let endTime = new Date();

 let timeDiff = endTime - startTime;

  timeDiff /= 100;

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
      setRolls(oldRolls => oldRolls + 1)
    } else {
      setTenzies(false);
      setDice(allNewDice());
      setRolls(0)
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
        <div>Time: {time}</div>
        <div>Rolls: {rolls}</div>
        <div>Best : 10.3</div>
        <div>Best : 3</div>
        </div>

      </main>
      <footer>
        <p>
          <a
            href="https://github.com/michaelkolesidis/tenzi"
            target="_blank"
            rel="noreferrer"
          >
            Made with <span id="heart">♥</span> by Michael Kolesidis
          </a>
        </p>
      </footer>
    </>
  );
}
