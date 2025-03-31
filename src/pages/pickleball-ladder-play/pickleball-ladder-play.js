import React, { useEffect, useState } from "react";
import "./pickleball-ladder-play.css";

const PickleBallLaderPlay = () => {
  // const [players, setPlayers] = useState([]);
  // const [masterPlayerList, setMasterPlayerList] = useState([1]); //???? may not need

  // const [redoHistory, setRedoHistory] = useState([]);
  const [playerInput, setPlayerInput] = useState("");
  const [gameState, setGameState] = useState({
    cycleKings: false,
    numOfKingCyckes: 0,
    currentMenu: "set-court-num",
    queue: [],
    courts: {},
  });

  const [undoHistory, setUndoHistory] = useState([gameState]);
  const [dragging, setDragging] = useState({
    isDragging: false,
    playerData: "",
  });

  // player input
  // add new, delete, edit

  // 1: Eric & Dan vs Tombil & Troman <gameOn>    //   1: waiting area Tombil & Troman vs Domish & Lemoo
  // 2: Domish & Lemoo vs Garin & Michup  //   2: waiting area Eric & Dan Willgo & Karn
  // 3: Willgo & Karn vs Lif & Yomo       //   3: waiting area  Garin & Michup vs New opponents, Lif Tomo back to queue

  // function randomizePlayerList() {
  //   //do stuff
  // }

  // function checkIfPlayedWith() {
  //   //do stuff
  // }

  // function pairPlayers() {
  //   //do stuff
  // }

  /**
   * Deep Copy
   */
  function handleDragEnd(e) {
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
    // may not need this function
    e.preventDefault();
    e.stopPropagation();
  }

  /**
   * Handle Court Drop
   */
  function dropToCourt(e, type) {
    e.preventDefault();
    e.stopPropagation();
    if (e.target.tagName !== "DIV") return; //fix this
    const copiedGameState = deepCopy(gameState);
    const getQuad = e.target.className.split(" ")[1];
    const [court, quad] = getQuad.split("-");
    // const player = copiedGameState.queue.filter(
    //   (player) => player.name === dragging.playerData
    // );
    //
    const isEmpty =
      Object.keys(copiedGameState.courts[court][`${type}${quad}`]).length === 0;

    if (isEmpty && dragging.playerData?.name) {
      copiedGameState.courts[court][`${type}${quad}`] = dragging.playerData;
      deletePlayerForReal(dragging, copiedGameState);
    }
    // todo: stuff
  }

  /**
   * Deep Copy
   */
  function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
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
  function handleNumOfCourts(e) {
    const number = parseInt(e.target.value);
    const copiedGameState = deepCopy(gameState);

    copiedGameState.courts = {};

    for (let i = 0; i < number; i++) {
      copiedGameState.courts[i + 1] = {
        wait1: {},
        wait2: {},
        wait3: {},
        wait4: {},
        quad1: {},
        quad2: {},
        quad3: {},
        quad4: {},
      };
    }
    setGameState(copiedGameState);
    handleHistory(copiedGameState);
  }

  /**
   * Handle Number of Courts
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
    const copiedGameState = deepCopy(gameState);
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
   * Handle Delete Player
   */

  function deletePlayerForReal(playerToDelete, copiedState) {
    console.log("%cplayerToDelete:", "color: orange", playerToDelete);
    const copiedGameState = copiedState ?? deepCopy(gameState);

    if (playerToDelete.draggingFrom === "queue") {
      const newQueue = copiedGameState.queue.filter(
        (el) => el.name !== playerToDelete.playerData.name
      );
      copiedGameState.queue = newQueue;
    } else {
      const [location, courtNum, quadNum] =
        playerToDelete.draggingFrom.split("-");
      copiedGameState.courts[courtNum][`${location}${quadNum}`] = {};
    }

    setGameState(copiedGameState);
    handleHistory(copiedGameState);
  }

  /**
   * Are you sure you want to delete player
   */

  function deletePlayer(e) {
    // const playerToDelete = e.target.parentNode.childNodes[0]?.innerText;
    if (gameState.currentMenu !== "add-players") {
      // todo: add logic to confirm (for when the game actually starts)
    } else {
      deletePlayerForReal(dragging);
    }
  }

  /**
   * Render
   */
  return (
    <div className="pickelball-ladder-play">
      <div className="queue">
        {gameState.currentMenu !== "set-court-num" && <h1>Queue</h1>}

        {/* 
      Set Number of Courts 
      */}
        {gameState.currentMenu === "set-court-num" && (
          <div className="set-court-num">
            <h1 className="size-sm"># of courts</h1>
            <input type="number" onChange={handleNumOfCourts} />
            <button onClick={handleCourtSubmit}>Submit</button>
          </div>
        )}

        {/* 
      Add Players 
      */}
        {gameState.currentMenu === "add-players" && (
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
                    <button onClick={deletePlayer}></button>
                  )}
                </div>
              );
            })}
            {gameState.queue?.length >= 8 && (
              <>
                <button>Start</button>
                <span>(or manually place players)</span>
              </>
            )}
          </div>
        )}
      </div>

      <div className="courts">
        {Object.keys(undoHistory[undoHistory.length - 1].courts).map((e) => {
          const { quad1, quad2, quad3, quad4, wait1, wait2, wait3, wait4 } =
            undoHistory[undoHistory.length - 1].courts[e];

          const num = parseInt(e);
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
                  <button className="winner-button">Winner</button>
                  <button className="winner-button">Winner</button>
                </div>
              </div>

              {/* 
              Waiting Room 
              */}
              <div className="court-waiting">
                <h1>waiting</h1>
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
                <button>Start Game</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PickleBallLaderPlay;
