import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

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
    } else {
      setTenzies(false);
      setDice(allNewDice());
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
      <svg
        id="spinning-rays"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <path d="M50,50l100,-26.7949l0,53.5898z">
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            dur="60s"
            repeatCount="indefinite"
          />
        </path>
        <path d="M50,50l100,-26.7949l0,53.5898z">
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="60 50 50"
            to="420 50 50"
            dur="60s"
            repeatCount="indefinite"
          />
        </path>
        <path d="M50,50l100,-26.7949l0,53.5898z">
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="120 50 50"
            to="480 50 50"
            dur="60s"
            repeatCount="indefinite"
          />
        </path>
        <path d="M50,50l100,-26.7949l0,53.5898z">
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="180 50 50"
            to="540 50 50"
            dur="60s"
            repeatCount="indefinite"
          />
        </path>
        <path d="M50,50l100,-26.7949l0,53.5898z">
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="240 50 50"
            to="600 50 50"
            dur="60s"
            repeatCount="indefinite"
          />
        </path>
        <path d="M50,50l100,-26.7949l0,53.5898z">
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="300 50 50"
            to="660 50 50"
            dur="60s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
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
      </main>
      <footer>
        <p><a href="https://github.com/michaelkolesidis/tenzi" target="_blank" rel="noreferrer">Made with <span id="heart">♥</span> by  Michael Kolesidis</a></p>
      </footer>
    </>
  );
}
