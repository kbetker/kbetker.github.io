const AddPlayers = ({ gameState, setRandom, handleStart, random }) => {
  //   console.log("%cprops:", "color: lime", props);
  return (
    <>
      <div
        className={`random-checkbox-container${
          gameState.queue?.length < 5 ? " disabled" : ""
        }`}
      >
        <input
          type="checkbox"
          value={random}
          onClick={() => {
            setRandom(false);
          }}
          defaultChecked={true}
          id="random-start"
          name="random-start"
        />
        <label htmlFor="random-start">Random start</label>
      </div>
      <button
        className="start-button"
        onClick={handleStart}
        disabled={gameState.queue?.length < 5}
      >
        {gameState.queue?.length < 5 ? "Need at least 5 players" : "Start"}
      </button>
      <span className="manual-text">
        {!(gameState.queue?.length < 5) && "(or manually place players)"}
      </span>
    </>
  );
};

export default AddPlayers;
