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
    nameDragging: "",
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
    // console.log(e.target.childNodes[0].innerText);
    // may not need this function
    setDragging({ isDragging: false, nameDragging: "" });
  }

  /**
   * Handle Drag Start
   */
  function handleDragStart(e) {
    // may not need this function
    const name = e.target.childNodes[0].innerText;
    setDragging({ isDragging: true, nameDragging: name });
    // console.log("%cname:", "color: lime", name);
  }

  /**
   * Handle mouse up
   */
  function handleDragOver(e) {
    // may not need this function
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    const copiedGameState = deepCopy(gameState);
    const getQuad = e.target.className.split(" ")[1];
    const [court, quad] = getQuad.split("-");
    const player = copiedGameState.queue.filter(
      (player) => player.name === dragging.nameDragging
    );

    const isEmpty =
      Object.keys(copiedGameState.courts[court][`quad${quad}`]).length === 0;

    if (isEmpty) {
      copiedGameState.courts[court][`quad${quad}`] = player[0];
      deletePlayerForReal(player[0].name, copiedGameState);
    }
    console.log("%ccopiedGameState:", "color: red", copiedGameState);
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
        waitingRoom: [],
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
    const copiedGameState = copiedState ?? deepCopy(gameState);
    const newQueue = copiedGameState.queue.filter(
      (el) => el.name !== playerToDelete
    );
    copiedGameState.queue = newQueue;
    setGameState(copiedGameState);
    handleHistory(copiedGameState);
  }

  /**
   * Are you sure you want to delete player
   */

  function deletePlayer(e) {
    const playerToDelete = e.target.parentNode.childNodes[0]?.innerText;
    if (gameState.currentMenu !== "add-players") {
      // todo: add logic to confirm (for when the game actually starts)
    } else {
      deletePlayerForReal(playerToDelete);
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
              const { name } = player;
              return (
                <div
                  draggable={true}
                  className="player-name"
                  key={`${player}-${i}`}
                  onDragEnd={handleDragEnd}
                  onDragStart={handleDragStart}
                >
                  <span>{name}</span>{" "}
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
          const { quad1, quad2, quad3, quad4, waitingRoom } =
            undoHistory[undoHistory.length - 1].courts[e];

          const num = parseInt(e);
          return (
            <div key={`court-key-${num}`} className="court-outer-container">
              <div className="active-court">
                <h1>#{num}</h1>
                <div className="court-quads-container">
                  <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className={`court-quad ${num}-1`}
                  ></div>
                  <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className={`court-quad ${num}-2`}
                  ></div>
                  <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className={`court-quad ${num}-3`}
                  ></div>
                  <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className={`court-quad ${num}-4`}
                  ></div>
                  <div className="kitchen"></div>
                  <div className="net"></div>
                </div>
              </div>
              <div className="court-waiting">
                <h1>waiting</h1>
                <div className="court-waiting-area">
                  {waitingRoom?.length > 0 &&
                    waitingRoom.map((player, i) => {
                      return <p key={`${player}-${i}`}>{player}</p>;
                    })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PickleBallLaderPlay;
