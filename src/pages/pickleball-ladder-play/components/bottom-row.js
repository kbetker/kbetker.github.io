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
}) => {
  return (
    <div
      className={`bottom-row${windowWidth < 400 && showqueue ? " span-1" : ""}`}
    >
      <>
        {windowWidth >= 400 && (
          <button className="help" onClick={handleHelp}>
            <HelpSVG />
          </button>
        )}
        <button
          className={`${undoHistory.length > 2 ? "" : "disabled"}`}
          onClick={handleUndo}
        >
          Undo
        </button>
        <button
          className={`${redoHistory.length > 0 ? "" : "disabled"}`}
          onClick={handleRedo}
        >
          Redo
        </button>
        {windowWidth < 800 && (
          <button onClick={() => setShowQueue(!showqueue)}>queue</button>
        )}
        {windowWidth >= 800 && (
          <div className="leader-board-container">
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
                        <div className="leaderStats">losses: {totalLosses}</div>
                        <div className="leaderStats">total: {totalScore}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="leader-fade"> </div>
          </div>
        )}
      </>
    </div>
  );
};

export default BottomRow;
