import Visible from "../svgs/visible-svg";
import Hidden from "../svgs/hidden-svg";
import SettingsSVG from "../svgs/settings-svg";
import Redo from "../svgs/redo";
import Undo from "../svgs/undo";

const BottomRow = ({
  handleHelp,
  HelpSVG,
  undoHistory,
  handleUndo,
  redoHistory,
  handleRedo,
  setShowQueue,
  showqueue,
  windowWidth,
  gameState,
  leaderDataCount,
  handleEditSettings,
}) => {
  return (
    <div
      className={`bottom-row${windowWidth < 400 && showqueue ? " span-1" : ""}`}
    >
      <>
        <button className="help" onClick={handleHelp}>
          <HelpSVG />
        </button>
        {gameState.currentMenu !== "set-court-num" && (
          <button className={`bottom-button`} onClick={handleEditSettings}>
            <SettingsSVG />
          </button>
        )}
        <button
          className={`bottom-button${
            undoHistory.length > 2 ? "" : " disabled"
          }`}
          onClick={handleUndo}
        >
          {windowWidth < 500 ? <Undo /> : "Undo"}
        </button>
        <button
          className={`bottom-button${
            redoHistory.length > 0 ? "" : " disabled"
          }`}
          onClick={handleRedo}
        >
          {windowWidth < 500 ? <Redo /> : "Redo"}
        </button>
        {windowWidth < 800 && (
          <button onClick={() => setShowQueue(!showqueue)}>
            {showqueue ? <Hidden /> : <Visible />} queue
          </button>
        )}
        {windowWidth >= 800 && (
          <div className="leader-board-container">
            {gameState.showScore && (
              <div className="leader-name-container">
                {gameState.leaderBoard.map((player, rank) => {
                  const { crowns, name, totalLosses, totalScore, totalWins } =
                    player;

                  return (
                    <div
                      className="player-leaderboard"
                      key={`key-leaderboard-${rank}`}
                    >
                      <div className="player-rank">{rank + 1}: </div>
                      <div className="bolder leader-name">{name}</div> -{" "}
                      <div className="stats-outer-container">
                        <div
                          className={`player-stats-container position-${leaderDataCount}`}
                        >
                          <div className="leaderStats">wins: {totalWins}</div>
                          <div className="leaderStats">crowns: {crowns}</div>
                          <div className="leaderStats">
                            losses: {totalLosses}
                          </div>
                          <div className="leaderStats">total: {totalScore}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            <div className="leader-fade"> </div>
          </div>
        )}
      </>
    </div>
  );
};

export default BottomRow;
