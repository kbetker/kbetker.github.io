import { numberToArray } from "../utilities";

const ActiveCourt = ({
  gameState,
  handleDragOver,
  dropToCourt,
  doubleTouched,
  handleDragEnd,
  handleDragStart,
  handleDoubleTouch,
  selectPlayerToMove,
  handleWinner,
  quad2,
  quad4,
  quad1,
  quad3,
  courtNumber,
}) => {
  return (
    <div className="active-court">
      <h1>Court #{courtNumber}</h1>
      <div className="court-quads-container">
        {numberToArray(4).map((quadNumber) => {
          const quad =
            gameState.courts[courtNumber][`quad${quadNumber}`] ?? null;
          return (
            <div
              onDragOver={handleDragOver}
              onDrop={(e) => dropToCourt(e, "quad")}
              onClick={(e) => (doubleTouched ? dropToCourt(e, "quad") : null)}
              className={`court-quad ${courtNumber}-${quadNumber} ${
                !quad?.name && doubleTouched?.name
                  ? "highlight-empty-court"
                  : ""
              }`}
              key={`quad-num-${quadNumber}`}
            >
              {quad?.name && (
                <p
                  className={`${
                    doubleTouched?.name === quad?.name
                      ? " highlight-player-queue"
                      : ""
                  }`}
                  draggable={true}
                  onDragEnd={handleDragEnd}
                  onDragStart={handleDragStart}
                  onTouchStart={handleDoubleTouch}
                  onDoubleClick={selectPlayerToMove}
                  data-player={JSON.stringify(quad)}
                  data-current-location={`quad-${courtNumber}-${quadNumber}`}
                >
                  {quad.name}
                </p>
              )}
            </div>
          );
        })}

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
              courtNum: courtNumber,
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
              courtNum: courtNumber,
            })
          }
        >
          Winner
        </button>
      </div>
    </div>
  );
};
export default ActiveCourt;
