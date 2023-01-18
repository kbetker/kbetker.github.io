import { useEffect, useRef, useState } from "react";
import "./pickleball.css";

const Pickleball = () => {
  const [gameName, setGameName] = useState("");

  const gameInitialState = {
    teams: true,
    players: [],
    scoreSide1: 0,
    scoreSide2: 0,
  };

  function handleInput(e) {
    console.log(e.target.id);
  }

  return (
    <div className="pickle-container">
      {/* Menu Screen */}

      <div className="teams-or-single">
        <button id="doubles-button" onClick={(e) => handleInput(e)}>
          Doubles
        </button>
        <button id="singles-button" onClick={(e) => handleInput(e)}>
          Singles
        </button>
      </div>

      <div className="players-input"></div>
    </div>
  );
};

export default Pickleball;
