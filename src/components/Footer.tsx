import React from "react";

export default function Die(props: any) {
  const styles = {
    backgroundColor: props.isHeld ? "rgba(247, 182, 41, 0.9)" : "white",
  };

  function face() {
    // eslint-disable-next-line default-case
    switch (props.value) {
      case 1:
        return (
          <div className="dice first-face" style={styles}>
            <span className="dot"></span>
          </div>
        );
      case 2:
        return (
          <div className="dice second-face" style={styles}>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        );
      case 3:
        return (
          <div className="dice third-face" style={styles}>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        );
      case 4:
        return (
          <div className="fourth-face dice" style={styles}>
            <div className="column">
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
            <div className="column">
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="fifth-face dice" style={styles}>
            <div className="column">
              <span className="dot"></span>
              <span className="dot"></span>
            </div>

            <div className="column">
              <span className="dot"></span>
            </div>

            <div className="column">
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="sixth-face dice" style={styles}>
            <div className="column">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
            <div className="column">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        );
    }
  }

  return (
    <div className="die-face" onClick={props.holdDice}>
      {face()}
    </div>
  );
}
