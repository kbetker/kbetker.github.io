// This code was rushed to have it ready for the weekend. Please excuse the mess.

import { useEffect, useRef, useState } from "react";
import "./pickleball.css";

const Pickleball = () => {
  const gameInitialState = {
    teams: "",
    players: {
      player1: { name: "", color: "#835020" },
      player2: { name: "", color: "#145022" },
      player3: { name: "", color: "#466cb9" },
      player4: { name: "", color: "#a4a43d" },
    },
    serving: "player1",
    scoreSide1: 0,
    scoreSide2: 0,
    serverNumber: 2,
    servingSide: "left",
    serveQuadrent: "quadrent1",
    playToScore: 11,
  };
  const timeOut = useRef(null);
  const [gameState, setGameState] = useState(gameInitialState);
  const [confirmPosition, setConfirmPositions] = useState(false);
  const [startTheGame, setStartTheGame] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [color1, setColor1] = useState("#835020");
  const [color2, setColor2] = useState("#145022");
  const [color3, setColor3] = useState("#466cb9");
  const [color4, setColor4] = useState("#a4a43d");
  const [winners, setWinners] = useState({});
  const scoreButton = useRef(null);
  const faultButton = useRef(null);
  const [finishScore, setFinishScore] = useState(11);

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

  const reset = () => {
    setGameState(gameInitialState);
    setGameOver(false);
    setStartTheGame(false);
    setConfirmPositions(false);
    setWinners({});
    setFinishScore(11);
  };

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
      case "confirmPosition":
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
        //   copiedGameState.confirmPosition = true;
        // } else if (copiedGameState.teams === "singles" && singlesNames) {
        //   copiedGameState.confirmPosition = true;
        // } else {
        //   alert("Input some names bruh!");
        // }
        // let copiedGameState = deepCopyFunction(gameState);

        setGameState(copiedGameState);
        setConfirmPositions(true);
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
    if (!confirmPosition) {
      debounce({ name: "color1", value: color1 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color1]);

  useEffect(() => {
    if (!confirmPosition) {
      debounce({ name: "color2", value: color2 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color2]);

  useEffect(() => {
    if (!confirmPosition) {
      debounce({ name: "color3", value: color3 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color3]);

  useEffect(() => {
    if (!confirmPosition) {
      debounce({ name: "color4", value: color4 });
    }
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
    let copiedGameState = deepCopyFunction(gameState);
    if (scoreButton.current) {
      scoreButton.current.style.pointerEvents = "none";
    }

    if (copiedGameState.teams === "doubles") {
      if (
        copiedGameState.serving === "player1" ||
        copiedGameState.serving === "player2"
      ) {
        copiedGameState.scoreSide1++;

        if (player1.current.style.top === "75%") {
          player1.current.style.top = quad2pos.top;
          player2.current.style.top = quad1pos.top;
        } else {
          player1.current.style.top = quad1pos.top;
          player2.current.style.top = quad2pos.top;
        }

        if (
          copiedGameState.scoreSide1 >= gameState.playToScore &&
          copiedGameState.scoreSide1 - copiedGameState.scoreSide2 >= 2
        ) {
          setGameOver(true);
          setWinners({
            player1: copiedGameState.players.player1,
            player2: copiedGameState.players.player2,
          });
        }
      } else {
        copiedGameState.scoreSide2++;
        if (player3.current.style.top === "75%") {
          player3.current.style.top = quad4pos.top;
          player4.current.style.top = quad3pos.top;
        } else {
          player3.current.style.top = quad3pos.top;
          player4.current.style.top = quad4pos.top;
        }
      }
      if (
        copiedGameState.scoreSide2 >= gameState.playToScore &&
        copiedGameState.scoreSide2 - copiedGameState.scoreSide1 >= 2
      ) {
        setGameOver(true);
        setWinners({
          player1: copiedGameState.players.player3,
          player2: copiedGameState.players.player4,
        });
      }
    } else {
      if (copiedGameState.serving === "player1") {
        copiedGameState.scoreSide1++;
        if (copiedGameState.scoreSide1 % 2 === 0) {
          player1.current.style.top = quad1pos.top;
          player2.current.style.top = quad4pos.top;
        } else {
          player1.current.style.top = quad2pos.top;
          player2.current.style.top = quad3pos.top;
        }
        if (
          copiedGameState.scoreSide1 >= gameState.playToScore &&
          copiedGameState.scoreSide1 - copiedGameState.scoreSide2 >= 2
        ) {
          setGameOver(true);
          console.log(copiedGameState.players.player1);
          setWinners(copiedGameState.players.player1);
        }
      } else {
        copiedGameState.scoreSide2++;
        if (copiedGameState.scoreSide2 % 2 === 0) {
          player1.current.style.top = quad1pos.top;
          player2.current.style.top = quad4pos.top;
        } else {
          player1.current.style.top = quad2pos.top;
          player2.current.style.top = quad3pos.top;
        }
        if (
          copiedGameState.scoreSide2 >= gameState.playToScore &&
          copiedGameState.scoreSide2 - copiedGameState.scoreSide1 >= 2
        ) {
          setGameOver(true);
          setWinners(copiedGameState.players.player2);
        }
      }
    }

    setGameState(copiedGameState);
    setTimeout(() => {
      if (scoreButton.current) {
        scoreButton.current.style.pointerEvents = "all";
      }
    }, 1000);
  };

  const calcFault = (e) => {
    let copiedGameState = deepCopyFunction(gameState);
    if (faultButton.current) {
      faultButton.current.style.pointerEvents = "none";
    }
    if (gameState.teams === "doubles") {
      if (copiedGameState.serverNumber === 1) {
        copiedGameState.serverNumber++;
        if (copiedGameState.servingSide === "left") {
          if (copiedGameState.serving === "player1") {
            copiedGameState.serving = "player2";
          } else {
            copiedGameState.serving = "player1";
          }
        } else {
          // if right
          if (copiedGameState.serving === "player3") {
            copiedGameState.serving = "player4";
          } else {
            copiedGameState.serving = "player3";
          }
        }
      } else {
        //switch sides
        copiedGameState.serverNumber = 1;
        if (copiedGameState.servingSide === "left") {
          copiedGameState.servingSide = "right";
        } else {
          copiedGameState.servingSide = "left";
        }

        if (copiedGameState.servingSide === "left") {
          if (player1.current.style.top === "75%") {
            copiedGameState.serving = "player1";
          } else {
            copiedGameState.serving = "player2";
          }
        } else {
          //if right
          if (player3.current.style.top === "35%") {
            copiedGameState.serving = "player3";
          } else {
            copiedGameState.serving = "player4";
          }
        }
      }
    } else {
      //singles
      if (copiedGameState.serving === "player1") {
        copiedGameState.serving = "player2";
        copiedGameState.servingSide = "right";
      } else {
        copiedGameState.serving = "player1";
        copiedGameState.servingSide = "left";
      }

      if (copiedGameState.serving === "player1") {
        if (copiedGameState.scoreSide1 % 2 === 0) {
          player1.current.style.top = quad1pos.top;
          player2.current.style.top = quad4pos.top;
        } else {
          player1.current.style.top = quad2pos.top;
          player2.current.style.top = quad3pos.top;
        }
      } else {
        if (copiedGameState.scoreSide2 % 2 === 0) {
          player1.current.style.top = quad1pos.top;
          player2.current.style.top = quad4pos.top;
        } else {
          player1.current.style.top = quad2pos.top;
          player2.current.style.top = quad3pos.top;
        }
      }
    }

    setGameState(copiedGameState);
    setTimeout(() => {
      if (faultButton.current) {
        faultButton.current.style.pointerEvents = "all";
      }
    }, 1000);
  };

  useEffect(() => {
    // if (true) {

    let copiedGameState = deepCopyFunction(gameState);
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

    copiedGameState.players.player1.color = color1;
    copiedGameState.players.player2.color = color2;
    copiedGameState.players.player3.color = color3;
    copiedGameState.players.player4.color = color4;
    setGameState(copiedGameState);
    // }
  }, [confirmPosition]);

  const switchPlayers = (e) => {
    let copiedGameState = deepCopyFunction(gameState);
    let tempGameState = deepCopyFunction(gameState);

    if (e.target.id === "switch-players-left") {
      copiedGameState.players.player1 = tempGameState.players.player2;
      copiedGameState.players.player2 = tempGameState.players.player1;
    } else {
      copiedGameState.players.player3 = tempGameState.players.player4;
      copiedGameState.players.player4 = tempGameState.players.player3;
    }

    setGameState(copiedGameState);
  };

  const switchSides = (e) => {
    let copiedGameState = deepCopyFunction(gameState);
    let tempGameState = deepCopyFunction(gameState);

    if (copiedGameState.teams === "doubles") {
      copiedGameState.players.player1 = tempGameState.players.player3;
      copiedGameState.players.player2 = tempGameState.players.player4;
      copiedGameState.players.player3 = tempGameState.players.player1;
      copiedGameState.players.player4 = tempGameState.players.player2;
    } else {
      copiedGameState.players.player1 = tempGameState.players.player2;
      copiedGameState.players.player2 = tempGameState.players.player1;
    }
    setGameState(copiedGameState);
  };

  const switchServer = () => {
    const copiedGameState = deepCopyFunction(gameState);
    if (copiedGameState.teams === "doubles") {
      if (copiedGameState.serving === "player1") {
        copiedGameState.serving = "player4";
        copiedGameState.servingSide = "right";
      } else {
        copiedGameState.serving = "player1";
        copiedGameState.servingSide = "left";
      }
    } else {
      if (copiedGameState.serving === "player1") {
        copiedGameState.serving = "player2";
        copiedGameState.servingSide = "right";
      } else {
        copiedGameState.serving = "player1";
        copiedGameState.servingSide = "left";
      }
    }
    setGameState(copiedGameState);
  };

  useEffect(() => {
    let copiedGameState = deepCopyFunction(gameState);
    copiedGameState.playToScore = parseInt(finishScore);
    setGameState(copiedGameState);
  }, [finishScore]);

  return (
    <div className="pickle-container">
      {/* <div className="sidebar">wat</div> */}
      {console.log("%ccopiedGameState: ", "color:ree", gameState)}
      <div className="content">
        {!gameOver && (
          <>
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

            {gameState.teams !== "" && !confirmPosition && (
              <div className="players-input">
                <div className="flex-container">
                  <div className="name-color">
                    <input
                      onChange={(e) => debounce(e)}
                      placeholder="Player 1"
                      id="player1"
                    ></input>
                    <input
                      type="color"
                      className="color-input"
                      id="player1-color"
                      value={color1}
                      onChange={(e) => setColor1(e.target.value)}
                    ></input>
                  </div>
                  {gameState.teams === "singles" && <p>Vs.</p>}
                  <div className="name-color">
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
                </div>
                {/* Doubles Name Input*/}
                {gameState.teams === "doubles" && (
                  <>
                    <p className="flex-container">Vs.</p>

                    <div className="flex-container">
                      <div className="name-color">
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
                      </div>
                      <div className="name-color">
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
                    </div>
                  </>
                )}
                <div className="flex-container back-next">
                  <button
                    onClick={(e) => handleInput(e)}
                    id="back-to-team-choice"
                  >
                    Back
                  </button>
                  <button id="confirmPosition" onClick={(e) => handleInput(e)}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {confirmPosition && (
              <div className="confirm-start">
                {confirmPosition && !startTheGame && (
                  <>
                    <div className="top-row-position-options">
                      <button
                        className="switch-sides"
                        onClick={() => switchSides()}
                      >
                        Switch Sides
                      </button>
                      <button
                        className="play-ball"
                        onClick={() => setStartTheGame(true)}
                      >
                        Play Ball!
                      </button>
                      <button
                        className="switch-server"
                        onClick={() => switchServer()}
                      >
                        Switch Server
                      </button>
                      {/* <div className="play-up-to">
                        <h2>Play up to</h2>
                        <input
                          onChange={(e) => setFinishScore(e.target.value)}
                          value={finishScore}
                          type="number"
                        ></input>
                        <h2>points</h2>
                      </div> */}
                    </div>

                    {gameState.teams === "doubles" && (
                      <>
                        {" "}
                        <button
                          className="switch-players-left"
                          id="switch-players-left"
                          onClick={(e) => switchPlayers(e)}
                        >
                          Switch Players
                        </button>
                        <button
                          className="switch-players-right"
                          id="switch-players-right"
                          onClick={(e) => switchPlayers(e)}
                        >
                          Switch Players
                        </button>
                      </>
                    )}
                  </>
                )}

                {startTheGame && (
                  <div className="top-row">
                    <button
                      className={`green-button ${
                        gameState.servingSide === "right"
                          ? " button-on-right"
                          : " button-on-left"
                      }`}
                      id="score-button"
                      onClick={(e) => calcScore(e)}
                      ref={scoreButton}
                    >
                      Score
                    </button>
                    <div className="game-stats">
                      {(gameState.teams === "doubles" &&
                        gameState.servingSide === "right") ||
                      (gameState.teams === "singles" &&
                        gameState.serving === "player2") ? (
                        <>
                          {" "}
                          <span>{gameState.scoreSide2}-</span>
                          <span>{gameState.scoreSide1}</span>
                          {gameState.teams === "doubles" && (
                            <span className="serve-number">
                              -{gameState.serverNumber}
                            </span>
                          )}
                        </>
                      ) : (
                        <>
                          {" "}
                          <span>{gameState.scoreSide1}-</span>
                          <span>{gameState.scoreSide2}</span>
                          {gameState.teams === "doubles" && (
                            <span className="serve-number">
                              -{gameState.serverNumber}
                            </span>
                          )}
                        </>
                      )}
                    </div>

                    <button
                      className={`red-button ${
                        gameState.servingSide === "right"
                          ? " button-on-left"
                          : " button-on-right"
                      }`}
                      id="fault-button"
                      onClick={(e) => calcFault(e)}
                      ref={faultButton}
                    >
                      Fault
                    </button>
                  </div>
                )}

                <div className="court">
                  <div className="left-court">
                    <div className="quads quad-1" ref={quad1}></div>
                    <div className="quads quad-2" ref={quad2}></div>
                  </div>
                  <div className="kitchen">
                    <div className="net"></div>
                  </div>
                  <div className="right-court">
                    <div className="quads quad-3" ref={quad3}></div>
                    <div className="quads quad-4" ref={quad4}></div>
                  </div>
                </div>

                <div
                  className={`players player1${
                    gameState.serving === "player1" ? " serving" : ""
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
                    gameState.serving === "player2" ? " serving" : ""
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
                        gameState.serving === "player3" ? " serving" : ""
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
                        gameState.serving === "player4" ? " serving" : ""
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
          </>
        )}
        {gameOver && (
          <div className="game-over-congrats">
            <h1>A winner is you!</h1>
            {gameState.teams === "doubles" && (
              <p className="a-winner-is-you">
                {winners.player1.name} &amp; {winners.player2.name}
              </p>
            )}
            {gameState.teams === "singles" && (
              <p className="a-winner-is-you">{winners.name}</p>
            )}

            <button onClick={() => reset()}>New Game</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pickleball;

// Still having issues deploying
