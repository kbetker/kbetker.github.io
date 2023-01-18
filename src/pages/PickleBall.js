import { useEffect, useRef, useState } from "react";
import "./pickleball.css";
import court from "../images/pickleBallCourt.jpg";

const Pickleball = () => {
  const gameInitialState = {
    teams: "",
    players: {
      player1: { name: "", color: "#00ffff", serving: true },
      player2: { name: "", color: "#ff00ff", serving: false },
      player3: { name: "", color: "#ffffff", serving: false },
      player4: { name: "", color: "#ffff00", serving: false },
    },
    scoreSide1: 0,
    scoreSide2: 0,
    server: 2,
    servingSide: "left",
    serveQuadrent: "quadrent1",
  };
  const timeOut = useRef(null);
  const [gameState, setGameState] = useState(gameInitialState);
  const [color1, setColor1] = useState("#00ffff");
  const [color2, setColor2] = useState("#00ff00");
  const [color3, setColor3] = useState("#ff0000");
  const [color4, setColor4] = useState("#ffff00");
  const [gameStart, setGameStart] = useState(false);
  const quad1 = useRef(null);
  const quad2 = useRef(null);
  const quad3 = useRef(null);
  const quad4 = useRef(null);

  const player1 = useRef(null);
  const player2 = useRef(null);
  const player3 = useRef(null);
  const player4 = useRef(null);

  const quad1pos = { left: "2%", top: "75%" };
  const quad2pos = { left: "2%", top: "35%" };
  const quad3pos = { left: "88%", top: "75%" };
  const quad4pos = { left: "88%", top: "35%" };

  /*
   * Deep Copy Object
   */
  const deepCopyFunction = (inObject) => {
    let outObject, value, key;
    if (typeof inObject !== "object" || inObject === null) {
      return inObject;
    }
    outObject = Array.isArray(inObject) ? [] : {};
    for (key in inObject) {
      value = inObject[key];
      outObject[key] = deepCopyFunction(value);
    }
    return outObject;
  };

  const handleInput = (e) => {
    let copiedGameState = deepCopyFunction(gameState);
    const input = e.target?.id || e.name;

    switch (input) {
      case "doubles-button":
        copiedGameState.teams = "doubles";
        break;
      case "singles-button":
        copiedGameState.teams = "singles";
        break;
      case "player1":
        copiedGameState.players.player1.name = e.target.value;
        break;
      case "player2":
        copiedGameState.players.player2.name = e.target.value;
        break;
      case "color2":
        copiedGameState.players.player2.color = e.value;
        break;
      case "player3":
        copiedGameState.players.player3.name = e.target.value;
        break;
      case "player4":
        copiedGameState.players.player4.name = e.target.value;
        break;
      case "back-to-team-choice":
        copiedGameState = gameInitialState;
        break;
      case "gameStart":
        // const singlesNames =
        //   copiedGameState.players.player1.name.length > 1 &&
        //   copiedGameState.players.player2.name.length > 1;
        // const doublesNames =
        //   copiedGameState.players.player3.name.length > 1 &&
        //   copiedGameState.players.player4.name.length > 1;

        // if (
        //   copiedGameState.teams === "doubles" &&
        //   singlesNames &&
        //   doublesNames
        // ) {
        //   copiedGameState.gameStart = true;
        // } else if (copiedGameState.teams === "singles" && singlesNames) {
        //   copiedGameState.gameStart = true;
        // } else {
        //   alert("Input some names bruh!");
        // }
        setGameStart(true);
        break;
      default:
        break;
    }
    setGameState(copiedGameState);
  };

  const debounce = (e) => {
    clearTimeout(timeOut.current);
    timeOut.current = setTimeout(() => {
      handleInput(e);
    }, 400);
  };

  useEffect(() => {
    debounce({ name: "color1", value: color1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color1]);

  useEffect(() => {
    debounce({ name: "color2", value: color2 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color2]);

  useEffect(() => {
    debounce({ name: "color3", value: color3 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color3]);

  useEffect(() => {
    debounce({ name: "color4", value: color4 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color4]);

  const styleName = (name) => {
    return (
      <>
        <span className="first-letter">{name.slice(0, 1)}</span>
        {name.slice(1)}
      </>
    );
  };

  const calcScore = (e) => {
    console.log("%ce: ", "color:green", e.target.id);
  };

  useEffect(() => {
    if (gameState.teams === "doubles" && player1.current) {
      player1.current.style.left = quad1pos.left;
      player1.current.style.top = quad1pos.top;

      player2.current.style.left = quad2pos.left;
      player2.current.style.top = quad2pos.top;

      player3.current.style.left = quad3pos.left;
      player3.current.style.top = quad3pos.top;

      player4.current.style.left = quad4pos.left;
      player4.current.style.top = quad4pos.top;
    } else if (player1.current) {
      player1.current.style.left = quad1pos.left;
      player1.current.style.top = quad1pos.top;

      player2.current.style.left = quad4pos.left;
      player2.current.style.top = quad4pos.top;
    }
  }, [gameStart]);

  return (
    <div className="pickle-container">
      <div className="sidebar">wat</div>

      <div className="content">
        {/* Singles or Doubles Selection */}
        {gameState.teams === "" && (
          <div className="teams-or-single">
            <button id="doubles-button" onClick={(e) => handleInput(e)}>
              Doubles
            </button>
            <button id="singles-button" onClick={(e) => handleInput(e)}>
              Singles
            </button>
          </div>
        )}
        {console.log(gameState)}
        {/* Player Name input */}
        {/* Singles Name Input*/}
        {gameState.teams !== "" && !gameStart && (
          <div className="players-input">
            <div className="flex-container">
              <input
                onChange={(e) => debounce(e)}
                placeholder="Player 1(start)"
                id="player1"
              ></input>
              <input
                type="color"
                className="color-input"
                id="player1-color"
                value={color1}
                onChange={(e) => setColor1(e.target.value)}
              ></input>
              {gameState.teams === "singles" && <p>Vs.</p>}
              <input
                onChange={(e) => debounce(e)}
                placeholder="Player 2"
                id="player2"
              ></input>
              <input
                type="color"
                className="color-input"
                id="player2-color"
                value={color2}
                onChange={(e) => setColor2(e.target.value)}
              ></input>
            </div>
            {/* Doubles Name Input*/}
            {gameState.teams === "doubles" && (
              <>
                <p className="flex-container">Vs.</p>
                <div className="flex-container">
                  <input
                    onChange={(e) => debounce(e)}
                    placeholder="Player 3"
                    id="player3"
                  ></input>{" "}
                  <input
                    type="color"
                    className="color-input"
                    id="player3-color"
                    value={color3}
                    onChange={(e) => setColor3(e.target.value)}
                  ></input>
                  <input
                    onChange={(e) => debounce(e)}
                    placeholder="Player 4"
                    id="player4"
                  ></input>{" "}
                  <input
                    type="color"
                    className="color-input"
                    id="player4-color"
                    value={color4}
                    onChange={(e) => setColor4(e.target.value)}
                  ></input>
                </div>
              </>
            )}
            <div className="flex-container">
              <button onClick={(e) => handleInput(e)} id="back-to-team-choice">
                Back
              </button>
              <button id="gameStart" onClick={(e) => handleInput(e)}>
                Start Game
              </button>
            </div>
          </div>
        )}

        {gameStart && (
          <div className="game-start">
            <div className="top-row">
              <button
                className="green-button"
                id="score-button"
                onClick={(e) => calcScore(e)}
              >
                Score
              </button>
              <div className="score">0-0-1</div>
              <button className="red-button">Fault</button>
            </div>

            <div className="court">
              <div className="left-court">
                <div className="quads" ref={quad1}></div>
                <div className="quads" ref={quad2}></div>
              </div>
              <div className="kitchen">
                <div className="net"></div>
              </div>
              <div className="right-court">
                <div className="quads" ref={quad3}></div>
                <div className="quads" ref={quad4}></div>
              </div>
            </div>

            <div
              className={`players player1${
                gameState.players.player1.serving ? " serving" : ""
              }`}
              style={{
                backgroundColor: gameState.players.player1.color,
              }}
              ref={player1}
            >
              {styleName(gameState.players.player1.name)}
            </div>

            <div
              className={`players player2${
                gameState.players.player2.serving ? " serving" : ""
              }`}
              style={{
                backgroundColor: gameState.players.player2.color,
              }}
              ref={player2}
            >
              {styleName(gameState.players.player2.name)}
            </div>

            {gameState.teams === "doubles" && (
              <>
                {" "}
                <div
                  className={`players player3${
                    gameState.players.player3.serving ? " serving" : ""
                  }`}
                  style={{
                    backgroundColor: gameState.players.player3.color,
                  }}
                  ref={player3}
                >
                  {styleName(gameState.players.player3.name)}
                </div>
                <div
                  className={`players player4${
                    gameState.players.player4.serving ? " serving" : ""
                  }`}
                  style={{
                    backgroundColor: gameState.players.player4.color,
                  }}
                  ref={player4}
                >
                  {styleName(gameState.players.player4.name)}
                </div>
              </>
            )}
          </div>
        )}
        {/* end content */}
      </div>
    </div>
  );
};

export default Pickleball;
