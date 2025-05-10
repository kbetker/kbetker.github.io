import React, { useEffect, useRef, useState } from "react";
import "./pickleball-ladder-play.css";
import DeletedComponent from "./svgs/deleted-svg";
import Edit from "./svgs/edit-svg";
import SettingsSVG from "./svgs/settings-svg";
import HelpSVG from "./svgs/help-svg";
import { initialGameState, deepCopy, isEmpty } from "./utilities";
import AddPlayers from "./components/add-players";
import WaitingRoom from "./components/waiting-room";
import BottomRow from "./components/bottom-row";
import ActiveCourt from "./components/active-court";
import Settings from "./components/settings";
//todo: Refactor the #@$&! out of this spaghetti mess

const PickleBallLaderPlay = () => {
  const [redoHistory, setRedoHistory] = useState([]);
  const [playerInput, setPlayerInput] = useState("");
  const [random, setRandom] = useState(true);
  const [courtNumInput, setCourtNumInput] = useState(2);
  const ladderContainer = useRef(null);
  const [keypressed, setKeyPressed] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalJsx, setModalJsx] = useState(<></>);
  const [editPlayerData, setEditPlayerData] = useState(null);
  const [editSettings, setEditSettings] = useState(false);
  const [tempSettingObj, setTempSettingsObj] = useState(null);
  const [tempSettingsCheck, setTempSettingsCheck] = useState(false);
  const [leaderDataCount, setLeaderDataCount] = useState(0);
  const currentLeaderCount = useRef(0);
  const [gameState, setGameState] = useState(initialGameState);
  const [undoHistory, setUndoHistory] = useState([gameState]);
  const [dragging, setDragging] = useState({
    isDragging: false,
    playerData: "",
  });
  const touchCount = useRef(0);
  const doubleTouchCountdown = useRef(null);
  const [doubleTouched, setDoubleTouched] = useState(null);
  const windowWidthDebounce = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showqueue, setShowQueue] = useState(true);

  /**
   * Handle Drag End
   */
  function handleDragEnd() {
    // may not need this function
    setDragging({ isDragging: false, playerData: "", draggingFrom: "" });
  }

  /**
   *  Sets windowWidth
   */
  function handleWindowResize() {
    clearTimeout(windowWidthDebounce.current);
    windowWidthDebounce.current = setTimeout(() => {
      if (window.innerWidth >= 800) {
        setShowQueue(true);
      }
      setWindowWidth(window.innerWidth);
    }, 300);
  }

  useEffect(() => {
    window.addEventListener("resize", () => {
      handleWindowResize();
    });
    return () => {
      window.removeEventListener("resize", () => {
        handleWindowResize();
      });
    };
  }, []);

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
    resetDoubleTouch();
    const copiedGameState = deepCopy(gameState);
    const copiedDragging = deepCopy(dragging);
    const courtNum = dragging.draggingFrom.split("-")[1];

    // Moving from court to non-specific order in queue (last place)
    if (!e.target.dataset?.player && copiedDragging.draggingFrom !== "queue") {
      copiedGameState.queue.push(copiedDragging.playerData);
      deletePlayerForReal(copiedDragging, copiedGameState, courtNum);
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
        handleDragEnd();
        deletePlayerForReal(copiedDragging, copiedGameState, courtNum);
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
    if (e.target.tagName !== "DIV") return; //fix this?
    const copiedGameState = deepCopy(gameState);
    const copiedDragging = deepCopy(dragging);
    copiedGameState.currentMenu = "game-on";
    const getQuad = e.target.className.split(" ")[1];
    const [court, quad] = getQuad.split("-");
    const empty = isEmpty(copiedGameState.courts[court][`${type}${quad}`]);
    if (empty && dragging.playerData?.name) {
      copiedGameState.courts[court][`${type}${quad}`] =
        copiedDragging.playerData;
      deletePlayerForReal(dragging, copiedGameState, court);
    }
    handleDragEnd();
    resetDoubleTouch();
    clearTimeout(doubleTouchCountdown.current);
  }

  /**
   * Handle History
   */
  function handleHistory(copiedGameState) {
    const copiedUndoHistory = deepCopy(undoHistory);
    if (copiedUndoHistory.length > 50) {
      copiedUndoHistory.shift();
    }
    copiedUndoHistory.push(copiedGameState);
    setUndoHistory(copiedUndoHistory);
    setRedoHistory([]);
  }

  /**
   * Handle undo
   */
  function handleUndo() {
    if (undoHistory.length < 3) return;
    const copiedUndoHistory = deepCopy(undoHistory);
    const lastState = copiedUndoHistory.pop();

    const copiedRedoHistory = deepCopy(redoHistory);
    copiedRedoHistory.unshift(lastState);

    setGameState(copiedUndoHistory[copiedUndoHistory.length - 1]);
    setUndoHistory(copiedUndoHistory);
    setRedoHistory(copiedRedoHistory);
  }

  /**
   * Handle Redo
   */

  function handleRedo() {
    if (redoHistory.length > 0) {
      const copiedRedoHistory = deepCopy(redoHistory);
      const lastState = copiedRedoHistory.shift();
      const copiedUndoHistory = deepCopy(undoHistory);

      copiedUndoHistory.push(lastState);

      setGameState(lastState);
      setUndoHistory(copiedUndoHistory);
      setRedoHistory(copiedRedoHistory);
    }
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
    if (courtNumInput < 1) {
      alert("Minimum of 1 court needed");
      setCourtNumInput(1);
    }
    buildCourts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    //for testing
    // const emojis = [
    //   "Kevin Beeeeee",
    //   "Zhen",
    //   "Dan",
    //   "Eric",
    //   "Jason",
    //   "YiFie",
    //   "Mike",
    //   "Bernie",
    //   "Elrond",
    //   "Kevin Yu",
    //   "Desheng",
    //   "Bobert",
    //   "Vladimir",
    //   "Ack",
    //   "Dillup",
    //   "Johl",
    //   "Lollerp",
    //   "Yabble",
    //   "Wonka",
    //   "Derf",
    //   "Muthro",
    //   "Jammit",
    // ];

    // for testing
    // if (copiedGameState.queue.length === 0) {
    //   for (let i = 0; i < emojis.length; i++) {
    //     copiedGameState.queue.push({
    //       name: emojis[i],
    //       quad: 0,
    //       numToCycleOut: 0,
    //       crowns: 0,
    //       totalWins: 0,
    //       totalLosses: 0,
    //       totalScore: 0,
    //     });
    //   }
    // }

    // check if name exists
    const alreadyExists = copiedGameState.queue.filter(
      (player) => player.name === playerInput
    );
    if (alreadyExists.length > 0) {
      alert("Player already exists.");
      return;
    }

    copiedGameState.queue.push({
      name: playerInput,
      quad: 0,
      numToCycleOut: 0,
      crowns: 0,
      totalWins: 0,
      totalLosses: 0,
      totalScore: 0,
    });
    setPlayerInput("");

    setGameState(copiedGameState);
    handleHistory(copiedGameState);
  }

  /**
   * Handle Delete Player (for real)
   */
  function deletePlayerForReal(playerToDelete, copiedState, courtNum = null) {
    const copiedGameState = copiedState ?? deepCopy(gameState);
    const courts = copiedGameState.courts;

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
    if (courtNum) {
      courts[courtNum].waitStatus = getCourtStatus(courtNum, copiedGameState);
      if (courts[courtNum - 1]) {
        courts[courtNum - 1].waitStatus = getCourtStatus(
          courtNum - 1,
          copiedGameState
        );
      }
      if (courts[courtNum + 1]) {
        courts[courtNum + 1].waitStatus = getCourtStatus(
          courtNum + 1,
          copiedGameState
        );
      }
    }

    const leaders = buildLeaderBoard(copiedGameState);
    copiedGameState.leaderBoard = leaders;
    setTimeout(() => {
      handleDragEnd();
    }, 300);
    setGameState(copiedGameState);
    handleHistory(copiedGameState);
  }

  /**
   * Are you sure you want to delete player
   */
  function deletePlayer(e) {
    const data = e ? e : dragging;
    if (gameState.currentMenu !== "add-players") {
      const jsx = (
        <div className="delete-player-container">
          <h1>Delete player?</h1>
          <button onClick={() => closeModal("modal-container")}>
            Cancel
          </button>{" "}
          <button
            onClick={() => [
              deletePlayerForReal(data),
              closeModal("modal-container"),
            ]}
          >
            Delete
          </button>
        </div>
      );
      setModalJsx(jsx);
      setShowModal(true);
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
   * Build leader boaard
   */

  function buildLeaderBoard(copiedGameState) {
    const courtNum = Object.keys(copiedGameState.courts).length;
    const allPlayers = [];
    allPlayers.push(...copiedGameState.queue);

    for (let court = 1; court <= courtNum; court++) {
      for (let area = 1; area <= 4; area++) {
        const quad = copiedGameState.courts[court][`quad${area}`];
        const waiter = copiedGameState.courts[court][`wait${area}`];
        if (!isEmpty(quad)) {
          allPlayers.push(quad);
        }

        if (!isEmpty(waiter)) {
          allPlayers.push(waiter);
        }
      }
    }

    allPlayers.forEach((player) => {
      const { totalWins, totalLosses, crowns } = player;
      player.totalScore = totalWins - totalLosses + crowns / 2;
    });

    const playersOnTheBoard = allPlayers.filter(
      (player) => player.totalScore > 0
    );

    const leaders = playersOnTheBoard.sort(
      (a, b) => b.totalScore - a.totalScore
    );

    return leaders;
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

    //  Check waiting area empty in higher court
    if (higherCourts) {
      for (let i = 1; i <= 4; i++) {
        const emptyCourt = isEmpty(higherCourts[`wait${i}`]);
        if (courtNum - 1 === 1) {
          if ((i === 3 || i === 4) && !emptyCourt) {
            alert("Players still in waiting area");
            return;
          }
        } else {
          if ((i === 1 || i === 2) && !emptyCourt) {
            alert(
              `Players still in court #${courtData.courtNum - 1} waiting area`
            );
            return;
          }
        }
      }
    }

    //  Check waiting area empty in lower court
    if (lowerCourts) {
      for (let i = 3; i <= 4; i++) {
        const emptyCourt = isEmpty(lowerCourts[`wait${i}`]);
        if (!emptyCourt) {
          alert(
            `Players still in court #${courtData.courtNum + 1} waiting area`
          );
          return;
        }
      }
    }

    //Check #1 court
    if (courtNum === 1) {
      for (let i = 1; i <= 2; i++) {
        const emptyCourt = isEmpty(courts[`wait${i}`]);
        if (!emptyCourt) {
          alert("Players in winner's waiting area");
          return;
        }
      }
    }

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
          copiedGameState,
          courtNum
        );

      //helper function: add winner to top court
      const addWinnerToTopCourt = (court) => {
        if (index === 0 && isEmpty(court.wait1)) {
          court.wait1 = winner;
          winner.totalWins++;
          delTacoed();
        }
        if (index === 1 && isEmpty(court.wait2)) {
          court.wait2 = winner;
          winner.totalWins++;
          delTacoed();
        }
      };

      //helper function: add winner to bottom court
      const addWinnerToBottomCourts = (court) => {
        if (index === 0 && isEmpty(court.wait3)) {
          court.wait3 = winner;
          winner.totalWins++;
          delTacoed();
        }
        if (index === 1 && isEmpty(court.wait4)) {
          court.wait4 = winner;
          winner.totalWins++;
          delTacoed();
        }
      };

      if (courtNum === 1 && !isEmpty(winner)) {
        winner.numToCycleOut++;
        winner.crowns++;

        if (
          copiedGameState.cycleKings &&
          winner.numToCycleOut >= copiedGameState.numToCycleOut
        ) {
          winner.numToCycleOut = 0;
          copiedGameState.queue.push(winner);
          delTacoed();
        } else {
          addWinnerToTopCourt(courts);
        }
      } else if (!isEmpty(winner)) {
        if (courtNum - 1 === 1) {
          addWinnerToBottomCourts(higherCourts);
        } else {
          addWinnerToTopCourt(higherCourts);
        }
      }
    });

    // Handle losers
    theLosers.forEach((loserQuad, index) => {
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
          copiedGameState,
          courtNum
        );

      //helper function: add loser to bottom court
      const addLosersToBottomCourts = (court, player) => {
        if (index === 0 && isEmpty(court.wait3)) {
          court.wait3 = player;
          loser.totalLosses++;
          delTacoed(player);
        }
        if (index === 1 && isEmpty(court.wait4)) {
          court.wait4 = player;
          loser.totalLosses++;
          delTacoed(player);
        }
      };

      //helper function: add newcomer to bottom court
      const addNewcomerToTop = (court, newComer) => {
        if (index === 0 && isEmpty(court.wait1)) {
          court.wait1 = newComer;
        }
        if (index === 1 && isEmpty(court.wait2)) {
          court.wait2 = newComer;
        }
      };

      if (courtNum === totalNumOfCourts && !isEmpty(loser)) {
        if (copiedGameState.queue.length >= 1) {
          const newComer = copiedGameState.queue.shift();
          addNewcomerToTop(courts, newComer);
          loser.totalLosses++;
          copiedGameState.queue.push(loser);
        } else {
          addNewcomerToTop(courts, loser);
        }
        delTacoed(loser);
      } else if (!isEmpty(loser)) {
        addLosersToBottomCourts(lowerCourts, loser);
      }
    });
  }

  /**
   * Get court status
   */
  function getCourtStatus(courtNum, copiedGameState) {
    const courts = copiedGameState.courts[courtNum];
    const spots = [1, 2, 3, 4].map((num) => !isEmpty(courts[`wait${num}`]));
    let courtStatus = "waiting";

    const isSingles = () => {
      return (
        (spots[0] && spots[1] && !spots[2] && !spots[3]) ||
        (spots[0] && spots[3] && !spots[2] && !spots[1]) ||
        (spots[2] && spots[1] && !spots[0] && !spots[3]) ||
        (spots[2] && spots[3] && !spots[0] && !spots[1])
      );
    };

    const isCutthroat = () => {
      return (
        (spots[0] && spots[2] && spots[1] && !spots[3]) ||
        (spots[0] && spots[2] && !spots[1] && spots[3]) ||
        (spots[1] && spots[3] && !spots[0] && spots[2]) ||
        (spots[1] && spots[3] && spots[0] && !spots[2])
      );
    };

    if (isSingles()) {
      courtStatus = "singles?";
    } else if (isCutthroat()) {
      courtStatus = "cut-throat?";
    } else if (spots.every(Boolean)) {
      courtStatus = "doubles?";
    }

    return courtStatus;
  }

  /**
   * Handle start
   */
  function handleStart() {
    const copiedGameState = deepCopy(gameState);

    if (random) {
      shufflePlayers(copiedGameState.queue);
    }

    copiedGameState.currentMenu = "game-on";
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
          copiedGameState.courts[courtKey][quadKey] = player;
        }
      }
    }
    setShowQueue(false);
    setGameState(copiedGameState);
    handleHistory(copiedGameState);
  }

  /**
   *
   * Submit edit player
   */
  function submitEditPlayer() {
    const copiedGameState = deepCopy(gameState);
    let index = -1;

    const filter = copiedGameState.queue.filter(
      (player) =>
        player.name === editPlayerData.name &&
        player.name !== editPlayerData.originalName
    );

    if (filter.length > 0) {
      alert("Name already exists");
      return;
    }

    for (let i = 0; i < copiedGameState.queue.length; i++) {
      const player = copiedGameState.queue[i];
      if (player.name === editPlayerData.originalName) {
        index = i;
      }
    }

    if (index >= 0) {
      copiedGameState.queue.splice(index, 1, editPlayerData);
      setGameState(copiedGameState);
      handleHistory(copiedGameState);
      setEditPlayerData(null);
      closeModal("modal-container");
    }
  }

  /**
   * Handle start game
   */

  function handleStartGame(courtNum) {
    const copiedGameState = deepCopy(gameState);
    const courts = copiedGameState.courts[courtNum];
    let count = 0;

    Object.keys(courts).forEach((court) => {
      const quad = court.startsWith("quad");
      if (quad && isEmpty(courts[court])) {
        count++;
      }
    });

    if (courts.waitStatus === "waiting") {
      alert("Need more players bruh");
      return;
    }
    if (count !== 4) {
      alert("Someone is still on the court");
      return;
    }

    for (let i = 1; i <= 4; i++) {
      if (!isEmpty(courts[`wait${i}`]) && isEmpty(courts[`quad${i}`])) {
        courts[`quad${i}`] = courts[`wait${i}`];
        courts[`wait${i}`] = {};
      }
    }

    courts.waitStatus = "waiting";
    setGameState(copiedGameState);
    handleHistory(copiedGameState);
    // do stuff
  }

  useEffect(() => {
    if (keypressed) {
      if (
        (keypressed.key === "z" || keypressed.key === "Z") &&
        (keypressed.ctrlKey || keypressed.metaKey) &&
        keypressed.shiftKey
      ) {
        handleRedo();
      } else if (
        keypressed.key === "z" &&
        (keypressed.ctrlKey || keypressed.metaKey)
      ) {
        handleUndo();
      } else if (keypressed.key === "Escape") {
        closeModal("modal-container");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keypressed]);

  useEffect(() => {
    window.addEventListener("keydown", (e) => setKeyPressed(e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function closeModal(targetId) {
    if (targetId === "modal-container") {
      setEditPlayerData(null);
      setShowModal(false);
    }
  }

  function helpEditPlayer(e) {
    const id = e.target.id.split("-")[1];
    const value = e.target.value;
    const playerData = deepCopy(editPlayerData);
    playerData[id] = value;
    setEditPlayerData(playerData);
  }

  /**
   *  Edit player
   */
  function editPlayer() {
    if (!editPlayerData) return;
    const jsx = (
      <div className="edit-fields">
        <h1>Edit player</h1>
        <div className="input-container">
          Name:
          <input
            onChange={helpEditPlayer}
            value={editPlayerData?.name}
            id="edit-name"
          />
        </div>
        <div className="input-container">
          Total wins:
          <input
            onChange={helpEditPlayer}
            value={editPlayerData?.totalWins}
            id="edit-totalWins"
            type="number"
          />
        </div>
        <div className="input-container">
          Crowns:
          <input
            onChange={helpEditPlayer}
            value={editPlayerData?.crowns}
            id="edit-crowns"
            type="number"
          />
        </div>
        <div className="input-container">
          Total losses:
          <input
            onChange={helpEditPlayer}
            value={editPlayerData?.totalLosses}
            id="edit-totalLosses"
            type="number"
          />
        </div>
        <div className="input-container">
          # to cycle out:
          <input
            onChange={helpEditPlayer}
            value={editPlayerData?.numToCycleOut}
            id="edit-numToCycleOut"
            name="cycle-out"
          />
        </div>
        <button onClick={submitEditPlayer}>Submit</button>
        <button onClick={() => closeModal("modal-container")}>Cancel</button>
      </div>
    );

    setModalJsx(jsx);
  }

  function handleEditClick(player) {
    if (!editPlayerData) {
      setEditPlayerData({
        crowns: player.crowns,
        name: player.name,
        numToCycleOut: player.numToCycleOut,
        quad: player.quad,
        totalLosses: player.totalLosses,
        totalWins: player.totalWins,
        originalName: player.name,
      });
    }
  }

  /**
   * Set edit player data
   */

  useEffect(() => {
    editPlayer();
  }, [editPlayerData]);

  // submit Settings Data
  // jsx
  // set Settings data
  // useEffect listen to set Settins Data

  function handleEditSettings() {
    setTempSettingsObj({
      cycleKings: tempSettingsCheck,
      numToCycleOut: gameState.numToCycleOut,
      numOfCourts: Object.keys(gameState.courts).length,
    });
    // setEditSettings(true);
    setEditSettings(!editSettings);
  }

  function updateSettings(e) {
    const tempObjCopy = deepCopy(tempSettingObj);
    const id = e.target.id;
    const value = e.target.value;
    if (id === "cycleKings") {
      tempObjCopy[id] = !tempSettingsCheck;
    } else {
      tempObjCopy[id] = parseInt(value);
    }
    setTempSettingsObj(tempObjCopy);
    setTempSettingsCheck(!tempSettingsCheck);
  }

  function confirmCourtReduction(num) {
    const { numOfCourts: newNumOfCourts } = tempSettingObj;
    const numOfCourts = Object.keys(gameState.courts).length;

    if (newNumOfCourts !== numOfCourts) {
      setModalJsx(
        <div className="confirm-setting">
          <h2>Players may lose their position on court</h2>
          <button onClick={submitUpdateSettings}>Proceed</button>
          <button onClick={() => closeModal("modal-container")}>Cancel</button>
        </div>
      );
      setShowModal(true);
    } else {
      submitUpdateSettings();
    }
  }

  function submitUpdateSettings() {
    const newNumOfCourts = tempSettingObj.numOfCourts;
    if (newNumOfCourts < 2) {
      alert("Nope");
      return;
    }
    const copiedGameState = deepCopy(gameState);
    let numOfCourts = Object.keys(copiedGameState.courts).length;
    //todo: add cycle kings + number - not sure what this means
    if (newNumOfCourts < numOfCourts) {
      while (numOfCourts > newNumOfCourts) {
        for (let i = 1; i <= 4; i++) {
          const player = copiedGameState.courts[numOfCourts][`quad${i}`];
          const waiter = copiedGameState.courts[numOfCourts][`wait${i}`];

          if (!isEmpty(player)) {
            copiedGameState.queue.push(player);
          }
          if (!isEmpty(waiter)) {
            copiedGameState.queue.push(waiter);
          }

          copiedGameState.courts[numOfCourts][`quad${i}`] = {};
          copiedGameState.courts[numOfCourts][`wait${i}`] = {};
        }
        delete copiedGameState.courts[numOfCourts];
        numOfCourts--;
      }
    } else if (newNumOfCourts > numOfCourts) {
      for (let i = numOfCourts; i < newNumOfCourts; i++) {
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
    }

    copiedGameState.cycleKings = tempSettingObj.cycleKings;
    copiedGameState.numToCycleOut = tempSettingObj.numToCycleOut;

    setGameState(copiedGameState);
    handleHistory(copiedGameState);
    closeModal("modal-container");
    setTempSettingsObj(null);
    setEditSettings(false);
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentLeaderCount.current === 3) {
        setLeaderDataCount(0);
        currentLeaderCount.current = 0;
      } else {
        setLeaderDataCount((prevCount) => prevCount + 1);
        currentLeaderCount.current = currentLeaderCount.current + 1;
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  function handleHelp() {
    setShowModal(true);
    setModalJsx(
      <div className="help-info">
        <h1>Pickleball Ladder Play</h1>
        <p>
          Pickleball ladder play is a system where players are ranked on a
          ladder based on their win/loss record or points won. Players move up
          or down the ladder based on their performance in matches, and are
          typically grouped with players of similar skill levels for play.
        </p>
        <p>
          Scores in this app are based off wins - losses + additional points for
          winning on the #1 court (crowns). Players can also be cycled out of
          court #1 after a set number of wins to cycle the queue faster.
        </p>
      </div>
    );
  }

  /**
   * Selecte Player to Move
   */
  function selectPlayerToMove(e) {
    clearTimeout(doubleTouchCountdown.current);
    const playerData = JSON.parse(e.target.dataset.player);
    setDoubleTouched(playerData);

    const wat = {
      isDragging: true,
      playerData,
      draggingFrom: e.target.dataset.currentLocation,
    };
    setDragging(wat);
    setTimeout(() => {
      setShowQueue(false);
    }, 500);

    // reset
    doubleTouchCountdown.current = setTimeout(() => {
      resetDoubleTouch();
    }, 5000);
  }

  /**
   * Handle Double Touch
   */
  function handleDoubleTouch(e) {
    clearTimeout(doubleTouchCountdown.current);
    doubleTouchCountdown.current = setTimeout(() => {
      touchCount.current = 0;
      setDoubleTouched(null);
    }, 500);

    touchCount.current = touchCount.current + 1;
    if (touchCount.current === 2) {
      clearTimeout(doubleTouchCountdown.current);
      selectPlayerToMove(e);
    }
  }

  /**
   * Reset Double Touch
   */
  function resetDoubleTouch() {
    touchCount.current = 0;
    setDoubleTouched(null);
  }

  // Somehow fixes a minor bug where queue doesn't show
  function returnQueueTitle() {
    return "Queue";
  }

  /**
   * Render
   */
  // Help modal
  return (
    <div
      className={`pickelball-ladder-play${showqueue ? " show-queue" : ""}`}
      ref={ladderContainer}
    >
      {showModal && (
        <div
          className="modal-container"
          id="modal-container"
          onClick={(e) => closeModal(e.target.id)}
        >
          <div className="modal-inner-container">{modalJsx}</div>
        </div>
      )}
      {!showqueue && (
        <div
          className={`compact-queue${
            doubleTouched !== null ? " highlight-queue" : ""
          }`}
          onDragOver={handleDragOver}
          onDrop={(e) => dropToQueue(e)}
          onClick={(e) =>
            doubleTouched
              ? [
                  dropToQueue(e),
                  setDragging({
                    isDragging: true,
                    playerData: doubleTouched,
                    draggingFrom: "queue",
                  }),
                ]
              : null
          }
        >
          QUEUE
        </div>
      )}
      {showqueue && (
        <div
          className="queue"
          onDragOver={handleDragOver}
          onDrop={(e) => dropToQueue(e)}
          onClick={(e) =>
            doubleTouched
              ? [
                  dropToQueue(e),
                  setDragging({
                    isDragging: true,
                    playerData: doubleTouched,
                    draggingFrom: "queue",
                  }),
                ]
              : null
          }
        >
          {gameState.currentMenu !== "set-court-num" && (
            <h1>{returnQueueTitle()}</h1>
          )}

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
            gameState.currentMenu === "game-on") && (
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
                    className={`player-name${
                      doubleTouched?.name === name
                        ? " highlight-player-queue"
                        : ""
                    }`}
                    key={`${player}-${i}`}
                    onDragEnd={handleDragEnd}
                    onDragStart={handleDragStart}
                    data-player={playerData}
                    data-current-location={"queue"}
                    onTouchStart={handleDoubleTouch}
                    onDoubleClick={selectPlayerToMove}
                    id={name}
                  >
                    <span>{name}</span>
                    {!dragging.isDragging && (
                      <>
                        <div className="button-container">
                          <button
                            className="delete-button"
                            onClick={() => [
                              handleEditClick(player),
                              setShowModal(true),
                            ]}
                          >
                            <Edit />
                          </button>
                          <button
                            className="delete-button"
                            onClick={() => deletePlayer(deleteData)}
                          >
                            <DeletedComponent />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
              {gameState.currentMenu === "add-players" && (
                <AddPlayers
                  gameState={gameState}
                  setRandom={setRandom}
                  handleStart={handleStart}
                  random={random}
                />
              )}

              {gameState.currentMenu === "game-on" && (
                <div
                  className={`settings-button-container${
                    editSettings ? " disabled" : ""
                  }`}
                >
                  <SettingsSVG />
                  <button onClick={handleEditSettings}>Settings</button>
                </div>
              )}

              {editSettings && tempSettingObj !== null && (
                <Settings
                  tempSettingObj={tempSettingObj}
                  updateSettings={updateSettings}
                  confirmCourtReduction={confirmCourtReduction}
                />
              )}
            </div>
          )}
        </div>
      )}

      <div className="courts">
        {Object.keys(gameState?.courts).map((courtNum) => {
          const { quad1, quad2, quad3, quad4, waitStatus } =
            gameState.courts[courtNum];
          const courtNumber = parseInt(courtNum);
          return (
            <div
              key={`court-key-${courtNumber}`}
              className="court-outer-container"
            >
              <ActiveCourt
                gameState={gameState}
                handleDragOver={handleDragOver}
                dropToCourt={dropToCourt}
                doubleTouched={doubleTouched}
                handleDragEnd={handleDragEnd}
                handleDragStart={handleDragStart}
                handleDoubleTouch={handleDoubleTouch}
                selectPlayerToMove={selectPlayerToMove}
                handleWinner={handleWinner}
                quad2={quad2}
                quad4={quad4}
                quad1={quad1}
                quad3={quad3}
                courtNumber={courtNumber}
              />

              {/* 
              Waiting Room 
              */}
              <WaitingRoom
                gameState={gameState}
                waitStatus={waitStatus}
                courtNumber={courtNumber}
                handleDragOver={handleDragOver}
                handleDragEnd={handleDragEnd}
                handleDragStart={handleDragStart}
                handleDoubleTouch={handleDoubleTouch}
                selectPlayerToMove={selectPlayerToMove}
                handleStartGame={handleStartGame}
                doubleTouched={doubleTouched}
                dropToCourt={dropToCourt}
                courtNum={courtNum}
              />
            </div>
          );
        })}
      </div>
      <BottomRow
        handleHelp={handleHelp}
        HelpSVG={HelpSVG}
        undoHistory={undoHistory}
        handleUndo={handleUndo}
        redoHistory={redoHistory}
        handleRedo={handleRedo}
        setShowQueue={setShowQueue}
        showqueue={showqueue}
        windowWidth={windowWidth}
        gameState={gameState}
        leaderDataCount={leaderDataCount}
      />
    </div>
  );
};

export default PickleBallLaderPlay;
