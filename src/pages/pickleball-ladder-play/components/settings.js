const Settings = ({
  tempSettingObj,
  updateSettings,
  confirmCourtReduction,
  setTempSettingsObj,
  setEditSettings,
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
      <button onClick={confirmCourtReduction}>Submit</button>
      <button
        onClick={() => [setTempSettingsObj(null), setEditSettings(false)]}
      >
        Cancel
      </button>
    </div>
  );
};

export default Settings;
