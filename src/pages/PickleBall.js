/*
 *    _   _       _       _
 *   | \ | |     | |     | |
 *   |  \| | ___ | |_ ___| |
 *   | . ` |/ _ \| __/ _ \ |
 *   | |\  | (_) | ||  __/_|
 *   |_| \_|\___/ \__\___(_)
 *
 * This code was rushed to have it ready for the weekend. Please excuse the hard coded mess. */

import { useEffect, useRef, useState } from "react";
import "./pickleball.css";
import useSound from "use-sound";
import beep1 from "../sounds/beep1.mp3";
import beep2 from "../sounds/beep2.mp3";
import beep3 from "../sounds/beep3.mp3";

const Pickleball = () => {
  const [play1] = useSound(beep1);
  const [play2] = useSound(beep2);
  const [play3] = useSound(beep3);

  const gameInitialState = [
    {
      teams: "",
      players: {
        player1: {
          name: "",
          color: "#835020",
          serving: true,
          left: "2%",
          top: "75%",
        },
        player2: {
          name: "",
          color: "#145022",
          serving: false,
          left: "2%",
          top: "35%",
        },
        player3: {
          name: "",
          color: "#466cb9",
          serving: false,
          left: "88%",
          top: "75%",
        },
        player4: {
          name: "",
          color: "#a4a43d",
          serving: false,
          left: "88%",
          top: "35%",
        },
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
  const timeOut = useRef(null);
  const [gameState, setGameState] = useState(gameInitialState);
  const [confirmFinishScore, setConfirmFinishScore] = useState(false);
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
    setConfirmFinishScore(false);
  };

  const playAgain = () => {
    let copiedGameState = deepCopyFunction(gameState);
    let lastState = copiedGameState[copiedGameState.length - 1];
    lastState.scoreSide1 = 0;
    lastState.scoreSide2 = 0;
    lastState.serverNumber = 2;
    lastState.players.player1.serving = true;
    lastState.players.player2.serving = false;
    lastState.players.player3.serving = false;
    lastState.players.player4.serving = false;
    lastState.servingSide = "left";

    lastState.players.player1.top = "75%";
    lastState.players.player2.top = "35%";
    lastState.players.player3.top = "75%";
    lastState.players.player4.top = "35%";

    setGameOver(false);
    setStartTheGame(false);
    setConfirmPositions(true);
    setWinners({});
    setGameState(copiedGameState);
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
    let last = [copiedGameState.length - 1];
    const input = e.target?.id || e.name;

    switch (input) {
      case "doubles-button":
        copiedGameState[last].teams = "doubles";
        break;
      case "singles-button":
        copiedGameState[last].teams = "singles";
        copiedGameState[last].players.player2.top = "35%";
        copiedGameState[last].players.player2.left = "88%";
        break;
      case "player1":
        copiedGameState[last].players.player1.name = e.target.value;
        break;
      case "player2":
        copiedGameState[last].players.player2.name = e.target.value;
        break;
      case "player3":
        copiedGameState[last].players.player3.name = e.target.value;
        break;
      case "player4":
        copiedGameState[last].players.player4.name = e.target.value;
        break;
      case "back-to-team-choice":
        copiedGameState = gameInitialState;
        break;
      case "back-to-choose-points":
        setConfirmFinishScore(false);
        break;
      case "confirmPoints":
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
      case "confirmPosition":
        const singlesNames =
          copiedGameState[last].players.player1.name.length >= 1 &&
          copiedGameState[last].players.player2.name.length >= 1;
        const doublesNames =
          copiedGameState[last].players.player3.name.length >= 1 &&
          copiedGameState[last].players.player4.name.length >= 1;

        if (
          copiedGameState[last].teams === "doubles" &&
          singlesNames &&
          doublesNames
        ) {
          setConfirmPositions(true);
          setGameState(copiedGameState);
        } else if (copiedGameState[last].teams === "singles" && singlesNames) {
          setConfirmPositions(true);
          setGameState(copiedGameState);
        } else {
          alert("Give me some names!!!");
        }

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
        <span>{name.slice(1)}</span>
      </>
    );
  };

  const checkScore = (gameState) => {
    let copiedGameState = deepCopyFunction(gameState);

    if (copiedGameState.servingSide === "left") {
      if (
        copiedGameState.scoreSide1 >= copiedGameState.playToScore &&
        copiedGameState.scoreSide1 - copiedGameState.scoreSide2 >= 2
      ) {
        setGameOver(true);
        setWinners({
          winner1: copiedGameState.players.player1.name,
          winner2: copiedGameState.players.player2.name,
        });
      }
    } else {
      if (
        copiedGameState.scoreSide2 >= copiedGameState.playToScore &&
        copiedGameState.scoreSide2 - copiedGameState.scoreSide1 >= 2
      ) {
        setGameOver(true);
        setWinners({
          winner1: copiedGameState.players.player3.name,
          winner2: copiedGameState.players.player4.name,
        });
      }
    }
  };

  const addScoreDoubles = (gameState) => {
    let copiedGameState = deepCopyFunction(gameState);

    if (
      copiedGameState.players.player1.serving ||
      copiedGameState.players.player2.serving
    ) {
      copiedGameState.scoreSide1++;
    } else {
      copiedGameState.scoreSide2++;
    }
    return copiedGameState;
  };

  const switchPlayerPositionDoubles = (gameState) => {
    let copiedGameState = deepCopyFunction(gameState);

    if (
      copiedGameState.players.player1.serving ||
      copiedGameState.players.player2.serving
    ) {
      if (copiedGameState.players.player1.top === "75%") {
        copiedGameState.players.player1.top = quad2pos.top;
        copiedGameState.players.player2.top = quad1pos.top;
      } else {
        copiedGameState.players.player1.top = quad1pos.top;
        copiedGameState.players.player2.top = quad2pos.top;
      }
    } else {
      if (copiedGameState.players.player3.top === "75%") {
        copiedGameState.players.player3.top = quad4pos.top;
        copiedGameState.players.player4.top = quad3pos.top;
      } else {
        copiedGameState.players.player3.top = quad3pos.top;
        copiedGameState.players.player4.top = quad4pos.top;
      }
    }
    return copiedGameState;
  };

  const handleScoreButton = () => {
    let copiedGameState = deepCopyFunction(gameState);
    let lastState = deepCopyFunction(
      copiedGameState[copiedGameState.length - 1]
    );
    // prevent double click of score button
    if (scoreButton.current) {
      scoreButton.current.style.pointerEvents = "none";
    }

    if (lastState.teams === "doubles") {
      let switchedPlayers = switchPlayerPositionDoubles(lastState);
      lastState = addScoreDoubles(switchedPlayers);
      checkScore(lastState);
    } else {
      if (lastState.players.player1.serving) {
        lastState.scoreSide1++;
        if (lastState.scoreSide1 % 2 === 0) {
          lastState.players.player1.top = quad1pos.top;
          lastState.players.player2.top = quad4pos.top;
        } else {
          lastState.players.player1.top = quad2pos.top;
          lastState.players.player2.top = quad3pos.top;
        }
        if (
          lastState.scoreSide1 >= lastState.playToScore &&
          lastState.scoreSide1 - lastState.scoreSide2 >= 2
        ) {
          setGameOver(true);
          setStartTheGame(false);
          setWinners(lastState.players.player1);
        }
      } else {
        lastState.scoreSide2++;
        if (lastState.scoreSide2 % 2 === 0) {
          lastState.players.player1.top = quad1pos.top;
          lastState.players.player2.top = quad4pos.top;
        } else {
          lastState.players.player1.top = quad2pos.top;
          lastState.players.player2.top = quad3pos.top;
        }
        if (
          lastState.scoreSide2 >= lastState.playToScore &&
          lastState.scoreSide2 - lastState.scoreSide1 >= 2
        ) {
          setGameOver(true);
          setStartTheGame(false);
          setWinners(lastState.players.player2);
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
    let copiedGameState = deepCopyFunction(gameState);
    let lastState = deepCopyFunction(
      copiedGameState[copiedGameState.length - 1]
    );
    if (faultButton.current) {
      faultButton.current.style.pointerEvents = "none";
    }

    lastState.players.player1.serving = false;
    lastState.players.player2.serving = false;
    lastState.players.player3.serving = false;
    lastState.players.player4.serving = false;

    if (gameState[gameState.length - 1].teams === "doubles") {
      if (lastState.serverNumber === 1) {
        lastState.serverNumber++;
        if (lastState.servingSide === "left") {
          if (gameState[gameState.length - 1].players.player1.serving) {
            lastState.players.player2.serving = true;
          } else {
            lastState.players.player1.serving = true;
          }
        } else {
          // if right
          if (gameState[gameState.length - 1].players.player3.serving) {
            lastState.players.player4.serving = true;
          } else {
            lastState.players.player3.serving = true;
          }
        }
      } else {
        //switch sides
        lastState.serverNumber = 1;
        if (lastState.servingSide === "left") {
          lastState.servingSide = "right";
        } else {
          lastState.servingSide = "left";
        }

        if (lastState.servingSide === "left") {
          if (lastState.players.player1.top === "75%") {
            lastState.players.player1.serving = true;
          } else {
            lastState.players.player2.serving = true;
          }
        } else {
          //if right
          if (lastState.players.player3.top === "35%") {
            lastState.players.player3.serving = true;
          } else {
            lastState.players.player4.serving = true;
          }
        }
      }
    } else {
      //singles

      if (gameState[gameState.length - 1].players.player1.serving) {
        lastState.players.player2.serving = true;
        lastState.players.player1.serving = false;
        lastState.servingSide = "right";
      } else {
        lastState.players.player1.serving = true;
        lastState.players.player2.serving = false;
        lastState.servingSide = "left";
      }

      if (lastState.players.player1.serving) {
        if (lastState.scoreSide1 % 2 === 0) {
          lastState.players.player1.top = quad1pos.top;
          lastState.players.player2.top = quad4pos.top;
        } else {
          lastState.players.player1.top = quad2pos.top;
          lastState.players.player2.top = quad3pos.top;
        }
      } else {
        if (gameState[gameState.length - 1].scoreSide2 % 2 === 0) {
          lastState.players.player1.top = quad1pos.top;
          lastState.players.player2.top = quad4pos.top;
        } else {
          lastState.players.player1.top = quad2pos.top;
          lastState.players.player2.top = quad3pos.top;
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

  const setColors = () => {
    let copiedGameState = deepCopyFunction(gameState);
    copiedGameState[copiedGameState.length - 1].players.player1.color = color1;
    copiedGameState[copiedGameState.length - 1].players.player2.color = color2;
    copiedGameState[copiedGameState.length - 1].players.player3.color = color3;
    copiedGameState[copiedGameState.length - 1].players.player4.color = color4;
    setGameState(copiedGameState);
  };

  // const setPositions = () => {
  //   if (gameState.teams === "doubles") {
  //     gameState.players.player1.left = quad1pos.left;
  //     gameState.players.player1.top = quad1pos.top;

  //     gameState.players.player2.left = quad2pos.left;
  //     gameState.players.player2.top = quad2pos.top;

  //     gameState.players.player3.left = quad3pos.left;
  //     gameState.players.player3.top = quad3pos.top;

  //     gameState.players.player4.left = quad4pos.left;
  //     gameState.players.player4.top = quad4pos.top;
  //   } else if (player1.current) {
  //     gameState.players.player1.left = quad1pos.left;
  //     gameState.players.player1.top = quad1pos.top;

  //     gameState.players.player2.left = quad4pos.left;
  //     gameState.players.player2.top = quad4pos.top;
  //   }
  // };

  useEffect(() => {
    // setPositions();
    setColors();
  }, [confirmPosition]);

  const switchPlayers = (e) => {
    let copiedGameState = deepCopyFunction(gameState);
    let tempGameState = deepCopyFunction(gameState);
    let lastState = copiedGameState[copiedGameState.length - 1];
    let lastStateTemp = tempGameState[tempGameState.length - 1];

    lastStateTemp.players.player1.top = quad2pos.top;
    lastStateTemp.players.player2.top = quad1pos.top;
    lastStateTemp.players.player3.top = quad4pos.top;
    lastStateTemp.players.player4.top = quad3pos.top;

    if (lastStateTemp.players.player1.serving) {
      lastStateTemp.players.player1.serving = false;
      lastStateTemp.players.player2.serving = true;
    } else if (lastStateTemp.players.player2.serving) {
      lastStateTemp.players.player1.serving = true;
      lastStateTemp.players.player2.serving = false;
    } else if (lastStateTemp.players.player3.serving) {
      lastStateTemp.players.player3.serving = false;
      lastStateTemp.players.player4.serving = true;
    } else {
      lastStateTemp.players.player3.serving = true;
      lastStateTemp.players.player4.serving = false;
    }

    if (e.target.id === "switch-players-left") {
      lastState.players.player1 = lastStateTemp.players.player2;
      lastState.players.player2 = lastStateTemp.players.player1;
    } else {
      lastState.players.player3 = lastStateTemp.players.player4;
      lastState.players.player4 = lastStateTemp.players.player3;
    }

    setGameState(copiedGameState);
  };

  const switchSides = (e) => {
    let copiedGameState = deepCopyFunction(gameState);
    let tempGameState = deepCopyFunction(gameState);
    let lastState = copiedGameState[copiedGameState.length - 1];
    let lastStateTemp = tempGameState[tempGameState.length - 1];

    lastStateTemp.players.player1.serving = false;
    lastStateTemp.players.player2.serving = false;
    lastStateTemp.players.player3.serving = false;
    lastStateTemp.players.player4.serving = false;

    if (lastState.teams === "doubles") {
      lastStateTemp.players.player1.left = quad3pos.left;
      lastStateTemp.players.player1.top = quad1pos.top;
      lastStateTemp.players.player2.left = quad4pos.left;
      lastStateTemp.players.player2.top = quad2pos.top;
      lastStateTemp.players.player3.left = quad1pos.left;
      lastStateTemp.players.player3.top = quad3pos.top;
      lastStateTemp.players.player4.left = quad2pos.left;
      lastStateTemp.players.player4.top = quad4pos.top;

      lastState.players.player1 = lastStateTemp.players.player3;
      lastState.players.player2 = lastStateTemp.players.player4;
      lastState.players.player3 = lastStateTemp.players.player1;
      lastState.players.player4 = lastStateTemp.players.player2;
    } else {
      lastStateTemp.players.player1.left = quad4pos.left;
      lastStateTemp.players.player1.top = quad4pos.top;
      lastStateTemp.players.player2.left = quad1pos.left;
      lastStateTemp.players.player2.top = quad1pos.top;

      lastState.players.player1 = lastStateTemp.players.player2;
      lastState.players.player2 = lastStateTemp.players.player1;
    }

    if (lastState.teams === "doubles") {
      if (lastState.servingSide === "left") {
        lastState.servingSide = "right";
        lastState.players.player4.serving = true;
      } else {
        lastState.servingSide = "left";
        lastState.players.player1.serving = true;
      }
    } else {
      if (lastState.servingSide === "left") {
        lastState.servingSide = "right";
        lastState.players.player2.serving = true;
      } else {
        lastState.servingSide = "left";
        lastState.players.player1.serving = true;
      }
    }

    setGameState(copiedGameState);
  };

  const switchServer = () => {
    const copiedGameState = deepCopyFunction(gameState);
    let lastState = copiedGameState[copiedGameState.length - 1];

    if (lastState.teams === "doubles") {
      if (lastState.players.player1.serving) {
        lastState.players.player4.serving = true;
        lastState.players.player1.serving = false;
        lastState.servingSide = "right";
      } else {
        lastState.players.player1.serving = true;
        lastState.players.player4.serving = false;
        lastState.servingSide = "left";
      }
    } else {
      if (lastState.players.player1.serving) {
        lastState.players.player2.serving = true;
        lastState.players.player1.serving = false;
        lastState.servingSide = "right";
      } else {
        lastState.players.player2.serving = false;
        lastState.players.player1.serving = true;
        lastState.servingSide = "left";
      }
    }
    setGameState(copiedGameState);
  };

  const undo = () => {
    if (gameState.length > 1) {
      let copiedGameState = deepCopyFunction(gameState);
      copiedGameState.pop();
      setGameState(copiedGameState);
    }
  };

  const handleClick = (e) => {
    clickCount.current = clickCount.current + 1;
    clearTimeout(mouseClickTimeout.current);

    if (clickCount.current === 1) {
      play1();
    }
    if (clickCount.current === 2) {
      play2();
    }
    if (clickCount.current === 3) {
      play3();
    }

    mouseClickTimeout.current = setTimeout(() => {
      if (clickCount.current === 1) {
        handleScoreButton();
      } else if (clickCount.current === 2) {
        handleFaultButton();
      } else {
        undo();
      }
      clickCount.current = 0;
    }, 500);
  };

  const startTheGameAlready = () => {
    let copiedGameState = deepCopyFunction(gameState);
    setGameState(copiedGameState);
    setStartTheGame(true);
  };

  return (
    <div
      className="pickle-container"
      onClick={(e) => (startTheGame && !gameOver ? handleClick(e) : null)}
    >
      {/* <div className="sidebar">wat</div> */}
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

            {confirmFinishScore && !confirmPosition && (
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
                  {gameState[gameState.length - 1].teams === "singles" && (
                    <p>Vs.</p>
                  )}
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
                {gameState[gameState.length - 1].teams === "doubles" && (
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
                    id="back-to-choose-points"
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
                        <span className="swith-players-text">Switch</span> Sides
                      </button>
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
                        <span className="swith-players-text">Switch</span>{" "}
                        Server
                      </button>
                    </div>

                    {gameState[gameState.length - 1].teams === "doubles" && (
                      <>
                        {" "}
                        <button
                          className="switch-players-left"
                          id="switch-players-left"
                          onClick={(e) => switchPlayers(e)}
                        >
                          <span className="swith-players-text">
                            Switch Players
                          </span>
                        </button>
                        <button
                          className="switch-players-right"
                          id="switch-players-right"
                          onClick={(e) => switchPlayers(e)}
                        >
                          <span className="swith-players-text">
                            Switch Players
                          </span>
                        </button>
                      </>
                    )}
                  </>
                )}

                {startTheGame && (
                  <div className="top-row">
                    {/* <button
                      className={`green-button ${
                        gameState[gameState.length - 1].servingSide === "right"
                          ? " button-on-right"
                          : " button-on-left"
                      }`}
                      id="score-button"
                      onClick={(e) => handleScoreButton(e)}
                      ref={scoreButton}
                    >
                      Score
                    </button> */}
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

                    {/* <button
                      className={`red-button ${
                        gameState[gameState.length - 1].servingSide === "right"
                          ? " button-on-left"
                          : " button-on-right"
                      }`}
                      id="fault-button"
                      onClick={(e) => handleFaultButton(e)}
                      ref={faultButton}
                    >
                      Fault
                    </button> */}
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
                    gameState[gameState.length - 1].players.player1.serving
                      ? " serving"
                      : ""
                  }`}
                  style={{
                    backgroundColor:
                      gameState[gameState.length - 1].players.player1.color,
                    top: gameState[gameState.length - 1].players.player1.top,
                    left: gameState[gameState.length - 1].players.player1.left,
                  }}
                  ref={player1}
                >
                  {styleName(
                    gameState[gameState.length - 1].players.player1.name
                  )}
                </div>

                <div
                  className={`players player2${
                    gameState[gameState.length - 1].players.player2.serving
                      ? " serving"
                      : ""
                  }`}
                  style={{
                    backgroundColor:
                      gameState[gameState.length - 1].players.player2.color,
                    top: gameState[gameState.length - 1].players.player2.top,
                    left: gameState[gameState.length - 1].players.player2.left,
                  }}
                  ref={player2}
                >
                  {styleName(
                    gameState[gameState.length - 1].players.player2.name
                  )}
                </div>

                {gameState[gameState.length - 1].teams === "doubles" && (
                  <>
                    {" "}
                    <div
                      className={`players player3${
                        gameState[gameState.length - 1].players.player3.serving
                          ? " serving"
                          : ""
                      }`}
                      style={{
                        backgroundColor:
                          gameState[gameState.length - 1].players.player3.color,
                        top: gameState[gameState.length - 1].players.player3
                          .top,
                        left: gameState[gameState.length - 1].players.player3
                          .left,
                      }}
                      ref={player3}
                    >
                      {styleName(
                        gameState[gameState.length - 1].players.player3.name
                      )}
                    </div>
                    <div
                      className={`players player4${
                        gameState[gameState.length - 1].players.player4.serving
                          ? " serving"
                          : ""
                      }`}
                      style={{
                        backgroundColor:
                          gameState[gameState.length - 1].players.player4.color,
                        top: gameState[gameState.length - 1].players.player4
                          .top,
                        left: gameState[gameState.length - 1].players.player4
                          .left,
                      }}
                      ref={player4}
                    >
                      {styleName(
                        gameState[gameState.length - 1].players.player4.name
                      )}
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
