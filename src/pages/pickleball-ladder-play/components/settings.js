const Settings = ({
  tempSettingObj,
  updateSettings,
  confirmCourtReduction,
  // setTempSettingsObj,
  // setEditSettings,
  closeModal,
  // gameState,
  // tempShowScoreCheck,
  // tempSettingsCheck,
}) => {
  return (
    <div className="settings-container">
      <div className="input-container">
        <input
          type="checkbox"
          id="cycleKings"
          name="cycle-kings"
          value={tempSettingObj?.cycleKings}
          checked={tempSettingObj?.cycleKings}
          onChange={updateSettings}
        />
        <label htmlFor="cycle-kings">Cycle Kings?</label>
      </div>
      <div className="input-container">
        <input
          type="checkbox"
          id="showScore"
          name="show-score"
          value={tempSettingObj?.showScore}
          checked={tempSettingObj?.showScore}
          onChange={updateSettings}
        />
        <label htmlFor="show-score">Show score?</label>
      </div>
      <div className="input-container">
        <input
          type="number"
          value={tempSettingObj?.numToCycleOut}
          onChange={updateSettings}
          id="numToCycleOut"
        />
        <span># to cycle</span>
      </div>
      <div className="input-container">
        <input
          type="number"
          value={tempSettingObj?.numOfCourts}
          onChange={updateSettings}
          id="numOfCourts"
        />
        <span># of courts</span>
      </div>
      <div className="input-container">
        <input
          type="number"
          value={tempSettingObj?.crownValue}
          onChange={updateSettings}
          id="crownValue"
        />
        <span>Crown value</span>
      </div>
      <button onClick={confirmCourtReduction}>Submit</button>
      <button
        onClick={() => [
          // setTempSettingsObj({
          //   cycleKings: tempSettingsCheck,
          //   showScore: tempShowScoreCheck,
          //   numToCycleOut: gameState.numToCycleOut,
          //   numOfCourts: Object.keys(gameState.courts).length,
          // }),
          // setEditSettings(false),
          closeModal("modal-container"),
        ]}
      >
        Cancel
      </button>
    </div>
  );
};

export default Settings;
