/*
 *    _   _       _       _
 *   | \ | |     | |     | |
 *   |  \| | ___ | |_ ___| |
 *   | . ` |/ _ \| __/ _ \ |
 *   | |\  | (_) | ||  __/_|
 *   |_| \_|\___/ \__\___(_)
 *
 * This code was rushed to have it ready for the weekend. Please excuse the hard coded mess. */

import { useRef, useState } from "react";
// import "./pickleball.css";
import useSound from "use-sound";
import point from "../sounds/point.mp3";
import sideOut from "../sounds/side-out.mp3";
import undoMp3 from "../sounds/undo.mp3";
import secondPlayer from "../sounds/second-server.mp3";

const Pickleball = () => {
  const [play1] = useSound(point);
  const [play2] = useSound(sideOut);
  const [play3] = useSound(undoMp3);
  const [play4] = useSound(secondPlayer);

  const quad1pos = { left: "70%", top: "80%" };
  const quad2pos = { left: "20%", top: "80%" };
  const quad3pos = { left: "70%", top: "18%" };
  const quad4pos = { left: "20%", top: "18%" };

  const gameInitialState = [
    {
      teams: "",
      player1: {
        name: "1",
        color: "lime",
        serving: true,
        left: quad1pos.left,
        top: quad1pos.top,
      },
      player2: {
        name: "2",
        color: "green",
        serving: false,
        left: quad2pos.left,
        top: quad2pos.top,
      },

      player3: {
        name: "3",
        color: "maroon",
        serving: false,
        left: quad3pos.left,
        top: quad3pos.top,
      },
      player4: {
        name: "4",
        color: "red",
        serving: false,
        left: quad4pos.left,
        top: quad4pos.top,
      },

      serving: "player1",
      scoreSide1: 0,
      scoreSide2: 0,
      serverNumber: 2,
      servingSide: "left",
      serveQuadrent: "quadrent1",
      playToScore: 11,
    },
  ];

  const [gameState, setGameState] = useState(gameInitialState);
  const [confirmFinishScore, setConfirmFinishScore] = useState(false);
  const [confirmPosition, setConfirmPositions] = useState(false);
  const [startTheGame, setStartTheGame] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const [winners, setWinners] = useState({});
  const scoreButton = useRef(null);
  const faultButton = useRef(null);
  const [finishScore, setFinishScore] = useState(11);
  const mouseClickTimeout = useRef("");
  const clickCount = useRef(0);

  const quad1 = useRef(null);
  const quad2 = useRef(null);
  const quad3 = useRef(null);
  const quad4 = useRef(null);

  const player1 = useRef(null);
  const player2 = useRef(null);
  const player3 = useRef(null);
  const player4 = useRef(null);

  const reset = () => {
    setGameState(gameInitialState);
    setGameOver(false);
    setStartTheGame(false);
    setConfirmPositions(false);
    setWinners({});
    setFinishScore(11);
    setConfirmFinishScore(false);
  };

  const playAgain = () => {
    let copiedGameState = deepCopy(gameState);
    let lastState = copiedGameState[copiedGameState.length - 1];
    lastState.scoreSide1 = 0;
    lastState.scoreSide2 = 0;
    lastState.serverNumber = 2;
    lastState.player1.serving = true;
    lastState.player2.serving = false;
    lastState.player3.serving = false;
    lastState.player4.serving = false;
    lastState.servingSide = "left";

    lastState.player1.left = quad1pos.left;
    lastState.player2.left = quad2pos.left;
    lastState.player3.left = quad3pos.left;
    lastState.player4.left = quad4pos.left;

    setGameOver(false);
    setStartTheGame(false);
    setConfirmPositions(true);
    setWinners({});
    setGameState(copiedGameState);
  };

  /*
   * Deep Copy Object
   */
  const deepCopy = (inObject) => {
    let outObject, value, key;
    if (typeof inObject !== "object" || inObject === null) {
      return inObject;
    }
    outObject = Array.isArray(inObject) ? [] : {};
    for (key in inObject) {
      value = inObject[key];
      outObject[key] = deepCopy(value);
    }
    return outObject;
  };

  const handleInput = (e) => {
    let copiedGameState = deepCopy(gameState);
    let last = [copiedGameState.length - 1];
    const input = e.target?.id || e.name;

    switch (input) {
      case "doubles-button":
        copiedGameState[last].teams = "doubles";
        break;
      case "singles-button":
        copiedGameState[last].teams = "singles";
        copiedGameState[last].player2.top = "32%";
        copiedGameState[last].player2.left = "20%";
        break;
      case "back-to-team-choice":
        copiedGameState = gameInitialState;
        break;
      case "back-to-choose-points":
        setConfirmFinishScore(false);
        break;
      case "confirmPoints":
        setConfirmPositions(true);
        setGameState(copiedGameState);
        if (finishScore < 0) {
          alert(
            "You can't have negative points in Picklball! What's wrong with you?"
          );
          return;
        } else if (finishScore < 2) {
          alert(
            "You must win by at least 2 points, so it makes sense to at least set the score to 2."
          );

          return;
        }

        copiedGameState[last].playToScore = parseInt(finishScore);
        setConfirmFinishScore(true);
        break;

      default:
        break;
    }

    setGameState(copiedGameState);
  };

  const styleName = (name) => {
    return (
      <>
        <span className="first-letter">{name.slice(0, 1)}</span>
        <span>{name.slice(1)}</span>
      </>
    );
  };

  const checkScore = (gameState) => {
    let copiedGameState = deepCopy(gameState);

    if (copiedGameState.servingSide === "left") {
      if (
        copiedGameState.scoreSide1 >= copiedGameState.playToScore &&
        copiedGameState.scoreSide1 - copiedGameState.scoreSide2 >= 2
      ) {
        setGameOver(true);
        setWinners({
          winner1: copiedGameState.player1.name,
          winner2: copiedGameState.player2.name,
        });
      }
    } else {
      if (
        copiedGameState.scoreSide2 >= copiedGameState.playToScore &&
        copiedGameState.scoreSide2 - copiedGameState.scoreSide1 >= 2
      ) {
        setGameOver(true);
        setWinners({
          winner1: copiedGameState.player3.name,
          winner2: copiedGameState.player4.name,
        });
      }
    }
  };

  const addScoreDoubles = (gameState) => {
    let copiedGameState = deepCopy(gameState);

    if (copiedGameState.player1.serving || copiedGameState.player2.serving) {
      copiedGameState.scoreSide1++;
    } else {
      copiedGameState.scoreSide2++;
    }
    return copiedGameState;
  };

  const switchPlayerPositionDoubles = (gameState) => {
    let copiedGameState = deepCopy(gameState);

    if (copiedGameState.player1.serving || copiedGameState.player2.serving) {
      if (copiedGameState.player1.left === quad1pos.left) {
        copiedGameState.player1.left = quad2pos.left;
        copiedGameState.player2.left = quad1pos.left;
      } else {
        copiedGameState.player1.left = quad1pos.left;
        copiedGameState.player2.left = quad2pos.left;
      }
    } else {
      if (copiedGameState.player3.left === quad3pos.left) {
        copiedGameState.player3.left = quad4pos.left;
        copiedGameState.player4.left = quad3pos.left;
      } else {
        copiedGameState.player3.left = quad3pos.left;
        copiedGameState.player4.left = quad4pos.left;
      }
    }
    return copiedGameState;
  };

  const handleScoreButton = () => {
    let copiedGameState = deepCopy(gameState);
    let lastState = deepCopy(copiedGameState[copiedGameState.length - 1]);
    // prevent double click of score button
    if (scoreButton.current) {
      scoreButton.current.style.pointerEvents = "none";
    }

    if (lastState.teams === "doubles") {
      let switchedPlayers = switchPlayerPositionDoubles(lastState);
      lastState = addScoreDoubles(switchedPlayers);
      checkScore(lastState);
    } else {
      if (lastState.player1.serving) {
        lastState.scoreSide1++;
        if (lastState.scoreSide1 % 2 === 0) {
          lastState.player1.left = quad1pos.left;
          lastState.player2.left = quad4pos.left;
        } else {
          lastState.player1.left = quad2pos.left;
          lastState.player2.left = quad3pos.left;
        }
        if (
          lastState.scoreSide1 >= lastState.playToScore &&
          lastState.scoreSide1 - lastState.scoreSide2 >= 2
        ) {
          setGameOver(true);
          setStartTheGame(false);
          setWinners(lastState.player1);
        }
      } else {
        lastState.scoreSide2++;
        if (lastState.scoreSide2 % 2 === 0) {
          lastState.player1.left = quad1pos.left;
          lastState.player2.left = quad4pos.left;
        } else {
          lastState.player1.left = quad2pos.left;
          lastState.player2.left = quad3pos.left;
        }
        if (
          lastState.scoreSide2 >= lastState.playToScore &&
          lastState.scoreSide2 - lastState.scoreSide1 >= 2
        ) {
          setGameOver(true);
          setStartTheGame(false);
          setWinners(lastState.player2);
        }
      }
    }

    if (copiedGameState.length >= 15) {
      copiedGameState.shift();
    }
    copiedGameState.push(lastState);
    setGameState(copiedGameState);
    // re-enable scoreButton
    setTimeout(() => {
      if (scoreButton.current) {
        scoreButton.current.style.pointerEvents = "all";
      }
    }, 1000);
  };

  const handleFaultButton = (e) => {
    let copiedGameState = deepCopy(gameState);
    let lastState = deepCopy(copiedGameState[copiedGameState.length - 1]);
    if (faultButton.current) {
      faultButton.current.style.pointerEvents = "none";
    }

    lastState.player1.serving = false;
    lastState.player2.serving = false;
    lastState.player3.serving = false;
    lastState.player4.serving = false;

    if (gameState[gameState.length - 1].teams === "doubles") {
      if (lastState.serverNumber === 1) {
        lastState.serverNumber++;
        if (lastState.servingSide === "left") {
          if (gameState[gameState.length - 1].player1.serving) {
            play4();
            lastState.player2.serving = true;
          } else {
            play4();
            lastState.player1.serving = true;
          }
        } else {
          // if right
          if (gameState[gameState.length - 1].player3.serving) {
            play4();
            lastState.player4.serving = true;
          } else {
            play4();
            lastState.player3.serving = true;
          }
        }
      } else {
        //switch sides
        lastState.serverNumber = 1;
        if (lastState.servingSide === "left") {
          lastState.servingSide = "right";
          play2();
        } else {
          lastState.servingSide = "left";
          play2();
        }

        if (lastState.servingSide === "left") {
          if (lastState.player1.left === quad1pos.left) {
            lastState.player1.serving = true;
          } else {
            lastState.player2.serving = true;
          }
        } else {
          //if right
          if (lastState.player3.left === quad4pos.left) {
            lastState.player3.serving = true;
          } else {
            lastState.player4.serving = true;
          }
        }
      }
    } else {
      //singles

      if (gameState[gameState.length - 1].player1.serving) {
        play2();
        lastState.player2.serving = true;
        lastState.player1.serving = false;
        lastState.servingSide = "right";
      } else {
        play2();
        lastState.player1.serving = true;
        lastState.player2.serving = false;
        lastState.servingSide = "left";
      }

      if (lastState.player1.serving) {
        if (lastState.scoreSide1 % 2 === 0) {
          lastState.player1.left = quad1pos.left;
          lastState.player2.left = quad4pos.left;
        } else {
          lastState.player1.left = quad2pos.left;
          lastState.player2.left = quad3pos.left;
        }
      } else {
        if (gameState[gameState.length - 1].scoreSide2 % 2 === 0) {
          lastState.player1.left = quad1pos.left;
          lastState.player2.left = quad4pos.left;
        } else {
          lastState.player1.left = quad2pos.left;
          lastState.player2.left = quad3pos.left;
        }
      }
    }
    if (copiedGameState.length >= 15) {
      copiedGameState.shift();
    }
    copiedGameState.push(lastState);
    setGameState(copiedGameState);
    // setTimeout(() => {
    //   if (faultButton.current) {
    //     faultButton.current.style.pointerEvents = "all";
    //   }
    // }, 1000);
  };

  const switchServer = () => {
    const copiedGameState = deepCopy(gameState);
    let lastState = copiedGameState[copiedGameState.length - 1];

    if (lastState.teams === "doubles") {
      if (lastState.player1.serving) {
        lastState.player4.serving = true;
        lastState.player1.serving = false;
        lastState.servingSide = "right";
      } else {
        lastState.player1.serving = true;
        lastState.player4.serving = false;
        lastState.servingSide = "left";
      }
    } else {
      if (lastState.player1.serving) {
        lastState.player2.serving = true;
        lastState.player1.serving = false;
        lastState.servingSide = "right";
      } else {
        lastState.player2.serving = false;
        lastState.player1.serving = true;
        lastState.servingSide = "left";
      }
    }
    setGameState(copiedGameState);
  };

  const undo = () => {
    if (gameState.length > 1) {
      let copiedGameState = deepCopy(gameState);
      copiedGameState.pop();
      setGameState(copiedGameState);
    }
  };

  const handleClick = (e) => {
    clickCount.current = clickCount.current + 1;
    clearTimeout(mouseClickTimeout.current);

    // if (clickCount.current === 1) {
    //   play1();
    // }
    // if (clickCount.current === 2) {
    //   play2();
    // }
    // if (clickCount.current === 3) {
    //   play3();
    // }

    mouseClickTimeout.current = setTimeout(() => {
      if (clickCount.current === 1) {
        play1();
        handleScoreButton();
      } else if (clickCount.current === 2) {
        // play2();
        handleFaultButton();
      } else {
        play3();
        undo();
      }
      clickCount.current = 0;
    }, 500);
  };

  const startTheGameAlready = () => {
    let copiedGameState = deepCopy(gameState);
    setGameState(copiedGameState);
    setStartTheGame(true);
  };

  return (
    <div
      className="pickle-container"
      onClick={(e) => (startTheGame && !gameOver ? handleClick(e) : null)}
    >
      <div className="content">
        {!gameOver && (
          <>
            {/* Singles or Doubles Selection */}
            {gameState[gameState.length - 1].teams === "" && (
              <div className="teams-or-single">
                <button id="doubles-button" onClick={(e) => handleInput(e)}>
                  Doubles
                </button>
                <button id="singles-button" onClick={(e) => handleInput(e)}>
                  Singles
                </button>
              </div>
            )}
            {gameState[gameState.length - 1].teams !== "" &&
              !confirmFinishScore && (
                <div className="play-up-to-container">
                  <div className="play-up-to">
                    <h2>Play up to</h2>
                    <input
                      onChange={(e) => setFinishScore(e.target.value)}
                      value={finishScore}
                      type="number"
                      className="number-input"
                    ></input>

                    <select
                      name="number-options"
                      className="point-dropdown"
                      defaultValue={11}
                      onChange={(e) => setFinishScore(e.target.value)}
                    >
                      <option value="3">3</option>
                      <option value="5">5</option>
                      <option value="7">7</option>
                      <option value="9">9</option>
                      <option value="11">11</option>
                      <option value="13">13</option>
                      <option value="15">15</option>
                    </select>

                    <h2>points</h2>
                  </div>
                  <div className="flex-container back-next">
                    <button
                      onClick={(e) => handleInput(e)}
                      id="back-to-team-choice"
                    >
                      Back
                    </button>
                    <button id="confirmPoints" onClick={(e) => handleInput(e)}>
                      Next
                    </button>
                  </div>
                </div>
              )}

            {confirmPosition && (
              <div className="confirm-start">
                {confirmPosition && !startTheGame && (
                  <div className="top-row-position-options">
                    <button
                      className="play-ball"
                      onClick={() => startTheGameAlready()}
                    >
                      Play <span className="swith-players-text">Ball!</span>
                    </button>
                    <button
                      className="switch-server"
                      onClick={() => switchServer()}
                    >
                      Switch server
                    </button>
                  </div>
                )}

                {startTheGame && (
                  <div className="top-row">
                    <div className="game-stats">
                      {(gameState[gameState.length - 1].teams === "doubles" &&
                        gameState[gameState.length - 1].servingSide ===
                          "right") ||
                      (gameState[gameState.length - 1].teams === "singles" &&
                        gameState[gameState.length - 1].serving ===
                          "player2") ? (
                        <>
                          {" "}
                          <span>
                            {gameState[gameState.length - 1].scoreSide2}-
                          </span>
                          <span>
                            {gameState[gameState.length - 1].scoreSide1}
                          </span>
                          {gameState[gameState.length - 1].teams ===
                            "doubles" && (
                            <span className="serve-number">
                              -{gameState[gameState.length - 1].serverNumber}
                            </span>
                          )}
                        </>
                      ) : (
                        <>
                          {" "}
                          <span>
                            {gameState[gameState.length - 1].scoreSide1}-
                          </span>
                          <span>
                            {gameState[gameState.length - 1].scoreSide2}
                          </span>
                          {gameState[gameState.length - 1].teams ===
                            "doubles" && (
                            <span className="serve-number">
                              -{gameState[gameState.length - 1].serverNumber}
                            </span>
                          )}
                        </>
                      )}
                    </div>
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
                    gameState[gameState.length - 1].player1.serving
                      ? " serving"
                      : ""
                  }`}
                  style={{
                    backgroundColor:
                      gameState[gameState.length - 1].player1.color,
                    top: gameState[gameState.length - 1].player1.top,
                    left: gameState[gameState.length - 1].player1.left,
                  }}
                  ref={player1}
                >
                  {styleName(gameState[gameState.length - 1].player1.name)}
                </div>

                <div
                  className={`players player2${
                    gameState[gameState.length - 1].player2.serving
                      ? " serving"
                      : ""
                  }`}
                  style={{
                    backgroundColor:
                      gameState[gameState.length - 1].player2.color,
                    top: gameState[gameState.length - 1].player2.top,
                    left: gameState[gameState.length - 1].player2.left,
                  }}
                  ref={player2}
                >
                  {styleName(gameState[gameState.length - 1].player2.name)}
                </div>

                {gameState[gameState.length - 1].teams === "doubles" && (
                  <>
                    {" "}
                    <div
                      className={`players player3${
                        gameState[gameState.length - 1].player3.serving
                          ? " serving"
                          : ""
                      }`}
                      style={{
                        backgroundColor:
                          gameState[gameState.length - 1].player3.color,
                        top: gameState[gameState.length - 1].player3.top,
                        left: gameState[gameState.length - 1].player3.left,
                      }}
                      ref={player3}
                    >
                      {styleName(gameState[gameState.length - 1].player3.name)}
                    </div>
                    <div
                      className={`players player4${
                        gameState[gameState.length - 1].player4.serving
                          ? " serving"
                          : ""
                      }`}
                      style={{
                        backgroundColor:
                          gameState[gameState.length - 1].player4.color,
                        top: gameState[gameState.length - 1].player4.top,
                        left: gameState[gameState.length - 1].player4.left,
                      }}
                      ref={player4}
                    >
                      {styleName(gameState[gameState.length - 1].player4.name)}
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
            {gameState[gameState.length - 1].teams === "doubles" && (
              <p className="a-winner-is-you">
                {winners.winner1} &amp; {winners.winner2}
              </p>
            )}
            {gameState[gameState.length - 1].teams === "singles" && (
              <p className="a-winner-is-you">{winners.name}</p>
            )}
            <button onClick={() => playAgain()}>Play Again</button>
            <button onClick={() => reset()}>New Game</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pickleball;

// Still having issues deploying
