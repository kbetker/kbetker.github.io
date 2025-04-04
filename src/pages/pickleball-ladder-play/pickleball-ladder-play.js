import React, { useEffect, useState } from "react";
import "./pickleball-ladder-play.css";

const PickleBallLaderPlay = () => {
  // const [redoHistory, setRedoHistory] = useState([]);
  const [playerInput, setPlayerInput] = useState("");
  const isEmpty = (obj) => Object.keys(obj).length === 0;
  const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));
  const [random, setRandom] = useState(true);
  const [courtNumInput, setCourtNumInput] = useState(2);
  const [gameState, setGameState] = useState({
    cycleKings: true,
    numOfKingCycles: 3,
    currentMenu: "set-court-num",
    queue: [],
    courts: {},
  });

  const [undoHistory, setUndoHistory] = useState([gameState]);
  const [dragging, setDragging] = useState({
    isDragging: false,
    playerData: "",
  });

  /**
   * Handle Drag End
   */
  function handleDragEnd() {
    // may not need this function
    setDragging({ isDragging: false, playerData: "", draggingFrom: "" });
  }

  /**
   * Handle Drag Start
   */
  function handleDragStart(e) {
    const playerDataString = e.target.dataset;
    const playerData = JSON.parse(playerDataString.player);
    setDragging({
      isDragging: true,
      playerData,
      draggingFrom: playerDataString.currentLocation,
    });
  }

  /**
   * Handle mouse up
   */
  function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  /**
   * Handle Queue Drop
   */
  function dropToQueue(e) {
    const copiedGameState = deepCopy(gameState);
    const copiedDragging = deepCopy(dragging);
    const numOfCourts = Object.keys(copiedGameState.courts).length + 1;
    copiedDragging.playerData.level = numOfCourts;

    // Moving from court to non-specific order in queue (last place)
    if (!e.target.dataset?.player && copiedDragging.draggingFrom !== "queue") {
      copiedGameState.queue.push(copiedDragging.playerData);
      deletePlayerForReal(copiedDragging, copiedGameState);
    }
    // Move to specific order in queue
    if (e.target.dataset?.player) {
      const playerData = JSON.parse(e.target.dataset.player);
      //get player index
      let index;
      for (let i = 0; i < copiedGameState.queue.length; i++) {
        const name = copiedGameState.queue[i].name;
        if (playerData.name === name) {
          index = i;
        }
      }

      // Remove player from current location if already in queue
      if (copiedDragging.draggingFrom === "queue") {
        const filteredArray = copiedGameState.queue.filter(
          (el) => el.name !== copiedDragging.playerData.name
        );
        copiedGameState.queue = filteredArray;
      }

      // add player to specified queue order
      copiedGameState.queue.splice(index, 0, copiedDragging.playerData);

      // remove player from current location if in court
      if (copiedDragging.draggingFrom !== "queue") {
        deletePlayerForReal(copiedDragging, copiedGameState);
        handleDragEnd();
        return;
      }

      handleDragEnd();
      setGameState(copiedGameState);
      handleHistory(copiedGameState);
    }
  }

  /**
   * Handle Court Drop
   */
  function dropToCourt(e, type) {
    e.preventDefault();
    e.stopPropagation();
    if (e.target.tagName !== "DIV") return; //fix this
    const copiedGameState = deepCopy(gameState);
    const copiedDragging = deepCopy(dragging);
    copiedGameState.currentMenu = "game-start";
    const getQuad = e.target.className.split(" ")[1];
    const [court, quad] = getQuad.split("-");
    const empty = isEmpty(copiedGameState.courts[court][`${type}${quad}`]);
    copiedDragging.playerData.level = court;

    if (empty && dragging.playerData?.name) {
      copiedGameState.courts[court][`${type}${quad}`] =
        copiedDragging.playerData;
      deletePlayerForReal(dragging, copiedGameState);
    }
    handleDragEnd();
  }

  /**
   * Handle History
   */
  function handleHistory(copiedGameState) {
    const copiedUndoHistory = deepCopy(undoHistory);
    copiedUndoHistory.push(copiedGameState);
    setUndoHistory(copiedUndoHistory);
  }

  /**
   * Handle Number of Courts
   */
  function buildCourts() {
    // const number = parseInt(e.target.value);
    const copiedGameState = deepCopy(gameState);

    copiedGameState.courts = {};

    for (let i = 0; i < courtNumInput; i++) {
      copiedGameState.courts[i + 1] = {
        wait1: {},
        wait2: {},
        wait3: {},
        wait4: {},
        quad1: {},
        quad2: {},
        quad3: {},
        quad4: {},
        waitStatus: "waiting",
      };
    }
    setGameState(copiedGameState);
    handleHistory(copiedGameState);
  }

  useEffect(() => {
    // / numOfCourts
    if (courtNumInput < 2) {
      alert("Minimum of 2 courts needed");
      setCourtNumInput(2);
    }
    buildCourts();
  }, [courtNumInput]);

  /**
   * Handle Court Submit
   */
  function handleCourtSubmit() {
    const copiedGameState = deepCopy(gameState);
    copiedGameState.currentMenu = "add-players";
    setGameState(copiedGameState);
    handleHistory(copiedGameState);
  }

  /**
   * Handle Add Player
   */
  function handleAddPlayer(e) {
    if (playerInput === "") {
      alert("Name too short");
      return;
    }
    const copiedGameState = deepCopy(gameState);
    const numOfCourts = Object.keys(copiedGameState.courts).length + 1;

    // for testing
    // if (copiedGameState.queue.length === 0) {
    for (let i = 0; i < 18; i++) {
      copiedGameState.queue.push({
        name: `Player-${i}`,
        level: numOfCourts,
        quad: 0,
        kingWins: 0,
        kingWinsTotal: 0,
      });
    }
    // }

    // todo: check if name exists
    copiedGameState.queue.push({
      name: playerInput,
      level: 0,
      quad: 0,
      kingWins: 0,
      kingWinsTotal: 0,
    });
    setPlayerInput("");

    setGameState(copiedGameState);
    handleHistory(copiedGameState);
  }

  /**
   * Handle Delete Player (for real)
   */

  function deletePlayerForReal(playerToDelete, copiedState) {
    const copiedGameState = copiedState ?? deepCopy(gameState);

    if (playerToDelete.draggingFrom === "queue") {
      const newQueue = copiedGameState.queue.filter(
        (el) => el.name !== playerToDelete.playerData.name
      );
      copiedGameState.queue = newQueue;
    } else {
      // console.log("%cplayerToDelete:", "color: red", playerToDelete);
      const [location, courtNum, quadNum] =
        playerToDelete.draggingFrom.split("-");
      copiedGameState.courts[courtNum][`${location}${quadNum}`] = {};
    }
    handleDragEnd();
    setGameState(copiedGameState);
    handleHistory(copiedGameState);
  }

  /**
   * Are you sure you want to delete player
   */
  function deletePlayer(e) {
    const data = e ? e : dragging;
    if (gameState.currentMenu !== "add-players") {
      // todo: add logic to confirm (for when the game actually starts)
      deletePlayerForReal(data);
    } else {
      deletePlayerForReal(data);
    }
  }

  /**
   * Handle start
   */
  function shufflePlayers(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  /**
   * Handle Winner
   */
  function handleWinner(courtData) {
    const copiedGameState = deepCopy(gameState);
    const { courtNum, winners, losers } = courtData;
    const totalNumOfCourts = Object.keys(copiedGameState.courts).length;
    const theWinners = shufflePlayers(Object.keys(winners));
    const theLosers = shufflePlayers(Object.keys(losers));
    const courts = copiedGameState.courts[courtData.courtNum];
    const higherCourts = copiedGameState.courts[courtData.courtNum - 1];
    const lowerCourts = copiedGameState.courts[courtData.courtNum + 1];

    // Handle winners
    theWinners.forEach((winnerQuad, index) => {
      const winner = copiedGameState.courts?.[courtData.courtNum]?.[winnerQuad];
      const quadNum = winnerQuad.split("quad")[1];

      // helper function. not the best name
      const delTacoed = () =>
        deletePlayerForReal(
          {
            draggingFrom: `quad-${courtNum}-${quadNum}`,
            isDragging: true,
            playerData: winner,
          },
          copiedGameState
        );

      //helper function: add winner to top court
      const addWinnerToTopCourt = (court) => {
        if (index === 0 && isEmpty(court.wait1)) {
          court.wait1 = winner;
          delTacoed();
        }
        if (index === 1 && isEmpty(court.wait2)) {
          court.wait2 = winner;
          delTacoed();
        }
      };

      //helper function: add winner to bottom court
      const addWinnerToBottomCourts = (court) => {
        if (index === 0 && isEmpty(court.wait3)) {
          court.wait3 = winner;
          delTacoed();
        }
        if (index === 1 && isEmpty(court.wait4)) {
          court.wait4 = winner;
          delTacoed();
        }
      };

      if (courtNum === 1 && !isEmpty(winner)) {
        winner.kingWins++;
        if (
          copiedGameState.cycleKings &&
          winner.kingWins >= copiedGameState.numOfKingCycles
        ) {
          winner.level = totalNumOfCourts;
          winner.kingWins = 0;
          winner.kingWinsTotal++;
          copiedGameState.queue.push(winner);
          delTacoed();
        } else {
          addWinnerToTopCourt(courts);
        }
      } else {
        winner.level--;
        if (winner.level === 1) {
          addWinnerToBottomCourts(higherCourts);
        } else {
          addWinnerToTopCourt(higherCourts);
        }
      }
    });

    // Handle losers
    theLosers.forEach((loserQuad, index) => {
      // console.log(`I'm a loser baby: ${loser}`);
      const loser = copiedGameState.courts?.[courtData.courtNum]?.[loserQuad];
      const quadNum = loserQuad.split("quad")[1];

      // helper function. not the best name
      const delTacoed = (player) =>
        deletePlayerForReal(
          {
            draggingFrom: `quad-${courtNum}-${quadNum}`,
            isDragging: true,
            playerData: player,
          },
          copiedGameState
        );

      //helper function: add winner to bottom court
      const addLosersToBottomCourts = (court, player) => {
        if (index === 0 && isEmpty(court.wait3)) {
          court.wait3 = player;
          delTacoed(player);
        }
        if (index === 1 && isEmpty(court.wait4)) {
          court.wait4 = player;
          delTacoed(player);
        }
      };

      //helper function: add winner to bottom court
      const addNewcomerToTop = (court, newComer) => {
        if (index === 0 && isEmpty(court.wait1)) {
          court.wait1 = newComer;
        }
        if (index === 1 && isEmpty(court.wait2)) {
          court.wait2 = newComer;
        }
      };

      if (courtNum === totalNumOfCourts) {
        if (copiedGameState.queue.length > 0) {
          const newComer = copiedGameState.queue.shift();
          addNewcomerToTop(courts, newComer);
        }
        // todo: logic if no need for queue
        copiedGameState.queue.push(loser);
        delTacoed(loser);
      } else {
        addLosersToBottomCourts(lowerCourts, loser);
      }
    });
  }

  /**
   * Handle start
   */
  function handleStart() {
    const copiedGameState = deepCopy(gameState);

    if (random) {
      shufflePlayers(copiedGameState.queue);
    }

    copiedGameState.currentMenu = "game-start";
    const courtKeys = Object.keys(copiedGameState.courts);
    for (let i = 0; i < courtKeys.length; i++) {
      const courtKey = courtKeys[i];
      const court = copiedGameState.courts[courtKey];

      const quadKeys = Object.keys(court);
      for (let j = 0; j < quadKeys.length; j++) {
        const quadKey = quadKeys[j];
        const quad = copiedGameState.courts[courtKey][quadKey];
        if (
          quadKey.startsWith("quad") &&
          isEmpty(quad) &&
          copiedGameState.queue.length > 0
        ) {
          const player = copiedGameState.queue.shift();
          player.level = parseInt(courtKey);
          copiedGameState.courts[courtKey][quadKey] = player;
        }
      }
    }
    setGameState(copiedGameState);
    handleHistory(copiedGameState);
  }

  /**
   * Handle start game
   */

  function handleStartGame(courtNum) {
    console.log("%ccourtNum:", "color: lime", courtNum);
  }
  /**
   * Render
   */
  return (
    <div className="pickelball-ladder-play">
      <div
        className="queue"
        onDragOver={handleDragOver}
        onDrop={(e) => dropToQueue(e)}
      >
        {gameState.currentMenu !== "set-court-num" && <h1>Queue</h1>}

        {/* 
      Set Number of Courts 
      */}
        {gameState.currentMenu === "set-court-num" && (
          <div className="set-court-num">
            <h1 className="size-sm"># of courts</h1>
            <input
              type="number"
              value={courtNumInput}
              onChange={(e) => setCourtNumInput(e.target.value)}
            />
            <button onClick={handleCourtSubmit}>Submit</button>
          </div>
        )}

        {/* 
      Add Players 
      */}
        {(gameState.currentMenu === "add-players" ||
          gameState.currentMenu === "game-start") && (
          <div className="add-players">
            <div className="add-player-input">
              <input
                onChange={(e) => setPlayerInput(e.target.value)}
                value={playerInput}
              />
              <button onClick={handleAddPlayer}>add</button>
            </div>
            {gameState.queue.map((player, i) => {
              const playerData = JSON.stringify(player);
              const { name } = player;
              const deleteData = {
                isDragging: false,
                playerData: player,
                draggingFrom: "queue",
              };
              return (
                <div
                  draggable={true}
                  className="player-name"
                  key={`${player}-${i}`}
                  onDragEnd={handleDragEnd}
                  onDragStart={handleDragStart}
                  data-player={playerData}
                  data-current-location={"queue"}
                >
                  <span>{name}</span>
                  {!dragging.isDragging && (
                    <button onClick={() => deletePlayer(deleteData)}></button>
                  )}
                </div>
              );
            })}
            {gameState.currentMenu === "add-players" && (
              <>
                <div
                  className={`random-checkbox-container${
                    gameState.queue?.length < 8 ? " disabled" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    value={random}
                    onClick={() => {
                      setRandom(!random);
                    }}
                    defaultChecked={true}
                  />
                  Randomize players
                </div>
                <button
                  className="start-button"
                  onClick={handleStart}
                  disabled={gameState.queue?.length < 8}
                >
                  {gameState.queue?.length < 8
                    ? "Need at least 8 players"
                    : "Start"}
                </button>
                <span className="manual-text">
                  {!(gameState.queue?.length < 8) &&
                    "(or manually place players)"}
                </span>
              </>
            )}
          </div>
        )}
      </div>

      <div className="courts">
        {Object.keys(undoHistory[undoHistory.length - 1].courts).map(
          (courtNum) => {
            const {
              quad1,
              quad2,
              quad3,
              quad4,
              wait1,
              wait2,
              wait3,
              wait4,
              waitStatus,
            } = undoHistory[undoHistory.length - 1].courts[courtNum];
            const num = parseInt(courtNum);
            return (
              <div key={`court-key-${num}`} className="court-outer-container">
                <div className="active-court">
                  <h1>#{num}</h1>
                  <div className="court-quads-container">
                    <div
                      onDragOver={handleDragOver}
                      onDrop={(e) => dropToCourt(e, "quad")}
                      className={`court-quad ${num}-1`}
                    >
                      {quad1?.name && (
                        <p
                          draggable={true}
                          onDragEnd={handleDragEnd}
                          onDragStart={handleDragStart}
                          data-player={JSON.stringify(quad1)}
                          data-current-location={`quad-${num}-1`}
                        >
                          {quad1?.name}
                        </p>
                      )}
                    </div>
                    <div
                      onDragOver={handleDragOver}
                      onDrop={(e) => dropToCourt(e, "quad")}
                      className={`court-quad ${num}-2`}
                    >
                      {quad2?.name && (
                        <p
                          draggable={true}
                          onDragEnd={handleDragEnd}
                          onDragStart={handleDragStart}
                          data-player={JSON.stringify(quad2)}
                          data-current-location={`quad-${num}-2`}
                        >
                          {quad2?.name}
                        </p>
                      )}
                    </div>
                    <div
                      onDragOver={handleDragOver}
                      onDrop={(e) => dropToCourt(e, "quad")}
                      className={`court-quad ${num}-3`}
                    >
                      {quad3?.name && (
                        <p
                          draggable={true}
                          onDragEnd={handleDragEnd}
                          onDragStart={handleDragStart}
                          data-player={JSON.stringify(quad3)}
                          data-current-location={`quad-${num}-3`}
                        >
                          {quad3?.name}
                        </p>
                      )}
                    </div>
                    <div
                      onDragOver={handleDragOver}
                      onDrop={(e) => dropToCourt(e, "quad")}
                      className={`court-quad ${num}-4`}
                    >
                      {quad4?.name && (
                        <p
                          draggable={true}
                          onDragEnd={handleDragEnd}
                          onDragStart={handleDragStart}
                          data-player={JSON.stringify(quad4)}
                          data-current-location={`quad-${num}-4`}
                        >
                          {quad4?.name}
                        </p>
                      )}
                    </div>
                    <div className="kitchen"></div>
                    <div className="net"></div>
                  </div>
                  <div className="winner-buttons">
                    <button
                      className="winner-button"
                      onClick={() =>
                        handleWinner({
                          winners: { quad1, quad3 },
                          losers: { quad2, quad4 },
                          courtNum: num,
                        })
                      }
                    >
                      Winner
                    </button>
                    <button
                      className="winner-button"
                      onClick={() =>
                        handleWinner({
                          winners: { quad2, quad4 },
                          losers: { quad1, quad3 },
                          courtNum: num,
                        })
                      }
                    >
                      Winner
                    </button>
                  </div>
                </div>

                {/* 
              Waiting Room 
              */}
                <div className="court-waiting">
                  <h1>{waitStatus}</h1>
                  <div className={`court-waiting-area ${num}`}>
                    <div
                      onDragOver={handleDragOver}
                      onDrop={(e) => dropToCourt(e, "wait")}
                      className={`wait-room ${num}-1`}
                    >
                      {wait1?.name && (
                        <p
                          draggable={true}
                          onDragEnd={handleDragEnd}
                          onDragStart={handleDragStart}
                          data-player={JSON.stringify(wait1)}
                          data-current-location={`wait-${num}-1`}
                        >
                          {wait1?.name}
                        </p>
                      )}
                    </div>
                    <div
                      onDragOver={handleDragOver}
                      onDrop={(e) => dropToCourt(e, "wait")}
                      className={`wait-room ${num}-2`}
                    >
                      {wait2?.name && (
                        <p
                          draggable={true}
                          onDragEnd={handleDragEnd}
                          onDragStart={handleDragStart}
                          data-player={JSON.stringify(wait2)}
                          data-current-location={`wait-${num}-2`}
                        >
                          {wait2?.name}
                        </p>
                      )}
                    </div>
                    <div
                      onDragOver={handleDragOver}
                      onDrop={(e) => dropToCourt(e, "wait")}
                      className={`wait-room ${num}-3`}
                    >
                      {wait3?.name && (
                        <p
                          draggable={true}
                          onDragEnd={handleDragEnd}
                          onDragStart={handleDragStart}
                          data-player={JSON.stringify(wait3)}
                          data-current-location={`wait-${num}-3`}
                        >
                          {wait3?.name}
                        </p>
                      )}
                    </div>
                    <div
                      onDragOver={handleDragOver}
                      onDrop={(e) => dropToCourt(e, "wait")}
                      className={`wait-room ${num}-4`}
                    >
                      {wait4?.name && (
                        <p
                          draggable={true}
                          onDragEnd={handleDragEnd}
                          onDragStart={handleDragStart}
                          data-player={JSON.stringify(wait4)}
                          data-current-location={`wait-${num}-4`}
                        >
                          {wait4?.name}
                        </p>
                      )}
                    </div>
                  </div>
                  <button onClick={() => handleStartGame(courtNum)}>
                    Start Game
                  </button>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default PickleBallLaderPlay;
