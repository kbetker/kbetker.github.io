import React from "react";
import { numberToArray } from "../utilities";

const WaitingRoom = ({
  waitStatus,
  gameState,
  handleDragOver,
  dropToCourt,
  doubleTouched,
  handleDragEnd,
  handleDragStart,
  handleDoubleTouch,
  selectPlayerToMove,
  courtNumber,
  handleStartGame,
  courtNum,
}) => {
  return (
    <div className="court-waiting">
      <h1>{waitStatus}</h1>
      <div className={`court-waiting-area ${courtNumber}`}>
        {numberToArray(4).map((waitNumber) => {
          const wait =
            gameState.courts[courtNumber][`wait${waitNumber}`] ?? null;
          return (
            <div
              key={`wait-room-${courtNumber}-${waitNumber}`}
              onDragOver={handleDragOver}
              onDrop={(e) => dropToCourt(e, "wait")}
              onClick={(e) => (doubleTouched ? dropToCourt(e, "wait") : null)}
              className={`wait-room ${courtNumber}-${waitNumber} ${
                doubleTouched?.name && !wait?.name ? "highlight-empty-wait" : ""
              }`}
            >
              {wait?.name && (
                <p
                  className={`${
                    doubleTouched?.name === wait?.name
                      ? " highlight-player-queue"
                      : ""
                  }`}
                  draggable={true}
                  onDragEnd={handleDragEnd}
                  onDragStart={handleDragStart}
                  onTouchStart={handleDoubleTouch}
                  onDoubleClick={selectPlayerToMove}
                  data-player={JSON.stringify(wait)}
                  data-current-location={`wait-${courtNumber}-${waitNumber}`}
                >
                  {wait.name}
                </p>
              )}
            </div>
          );
        })}
      </div>
      <button onClick={() => handleStartGame(courtNum)}>Start Game</button>
    </div>
  );
};
export default WaitingRoom;
