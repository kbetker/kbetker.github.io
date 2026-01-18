import React, { useRef, useState, useEffect } from "react";
import "./teleprompter.css";
// import { scripts } from "./scripts";
import { waitAMoment } from "../MiscComponents/MiscComponents";

const Teleprompter = () => {
  const [fontSize, setFontSize] = useState(108);
  const [scrollSpeed, setScrollSpeed] = useState(30);
  const [script, setScript] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [scripts, setScripts] = useState({});
  const [addingNewScript, setAddingNewScript] = useState(false);
  const [editingScript, setEditingScript] = useState(false);
  const [editName, setEditName] = useState("");
  const [editScript, setEditScript] = useState("");
  const scriptRef = useRef(null);
  const isEmpty = (obj) => Object.keys(obj).length === 0;

  /**
   * Scroll the script
   */
  const scrollTheScript = () => {
    const scriptHeight = scriptRef.current.offsetHeight;
    const weirdOffset = scriptHeight * 0.1;
    scriptRef.current.style.transition = `all ${scrollSpeed}s linear`;
    scriptRef.current.style.bottom = `-${scriptHeight + weirdOffset}px`;
    setIsPlaying(true);
  };

  /**
   * Stop scrolling
   */
  const stopScrolling = async () => {
    if (scriptRef.current) {
      scriptRef.current.style.transition = `all 0s ease-in-out`;
      await waitAMoment(50);
      scriptRef.current.style.bottom = `10rem`;
      setIsPlaying(false);
    }
  };

  /**
   * Submit new script
   */
  const submitScript = (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const scriptText = e.target[1].value;
    const scriptsCopy = JSON.parse(JSON.stringify(scripts));

    if (!isEmpty(scriptsCopy) && name in scriptsCopy) {
      alert("A script with this name already exists.");
      return;
    } else {
      scriptsCopy[name] = scriptText;
      setScripts(scriptsCopy);
      localStorage.setItem("scripts", JSON.stringify(scriptsCopy));
      setAddingNewScript(false);
    }
  };

  /**
   * Edit script
   */
  const submitUpdateScript = (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const scriptText = e.target[1].value;
    const scriptsCopy = JSON.parse(JSON.stringify(scripts));

    // If the name has changed and the new name already exists
    if (name !== script.name && name in scriptsCopy) {
      alert("A script with this name already exists.");
      return;
    } else {
      // Remove old script if name has changed
      if (name !== script.name) {
        delete scriptsCopy[script.name];
      }
      scriptsCopy[name] = scriptText;
      setScripts(scriptsCopy);
      localStorage.setItem("scripts", JSON.stringify(scriptsCopy));
      setEditingScript(false);
      setScript({ name: name, text: scriptText });
    }
  };

  /**
   *   Delete script
   */
  const deleteScript = () => {
    const scriptsCopy = JSON.parse(JSON.stringify(scripts));
    delete scriptsCopy[script.name];
    setScripts(scriptsCopy);
    localStorage.setItem("scripts", JSON.stringify(scriptsCopy));
    setEditingScript(false);
    setScript(null);
  };

  //   Maybe add CRUD functional in the future.
  useEffect(() => {
    const storedScripts = localStorage.getItem("scripts");
    if (storedScripts) {
      setScripts(JSON.parse(storedScripts));
    }
  }, []);

  /**
   * Render
   */
  return (
    <div className="tele-wrapper">
      <div className="tele-container">
        {/* Exactly what and how much of it did I drink when I made this!??! */}
        {!script && (
          <div className="tele-button-container">
            {!isEmpty(scripts) &&
              !addingNewScript &&
              !editingScript &&
              Object.keys(scripts).map((el, i) => (
                <button
                  key={`${el}-${i}`}
                  onClick={() => setScript({ name: el, text: scripts[el] })}
                >
                  {el}
                </button>
              ))}
            {!addingNewScript && !editingScript && (
              <button onClick={() => setAddingNewScript(true)}>+</button>
            )}
          </div>
        )}

        {/* May add CRUD functional in the future. */}
        {addingNewScript && (
          <div className="adding-new-script">
            <form onSubmit={submitScript} className="script-form">
              <input type="text" placeholder="Script Name" />
              <textarea placeholder="Script Text"></textarea>
              <button type="submit">Add Script</button>
              <button onClick={() => setAddingNewScript(false)}>Cancel</button>
            </form>
          </div>
        )}

        {editingScript && (
          <div className="updating-new-script">
            <form onSubmit={submitUpdateScript} className="script-form">
              <input
                type="text"
                placeholder="Script Name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
              <textarea
                placeholder="Script Text"
                value={editScript}
                onChange={(e) => setEditScript(e.target.value)}
              ></textarea>
              <button type="submit">Update Script</button>
              <button onClick={() => setEditingScript(false)}>Cancel</button>
              <button onClick={deleteScript}>Delete Script</button>
            </form>
          </div>
        )}

        {script && !editingScript && (
          <p
            className="the-script"
            style={{
              fontSize: `${fontSize}px`,
            }}
            ref={scriptRef}
          >
            {script.text}
          </p>
        )}
      </div>
      {script && !editingScript && (
        <div className="tele-controls">
          {isPlaying ? (
            <button onClick={stopScrolling}>stop</button>
          ) : (
            <button onClick={scrollTheScript}>play</button>
          )}

          {/* Button Controls */}
          <div className="button-controls">
            <span className="big-a">A</span>
            <span className="little-a">A</span>
            <button onClick={() => setFontSize(fontSize + 6)}>+</button>
            <button onClick={() => setFontSize(fontSize - 6)}>-</button>
            <span>{fontSize}px</span>
          </div>
          <div className="button-controls">
            <span>Speed</span>
            <button onClick={() => setScrollSpeed(scrollSpeed + 1)}>+</button>
            <button onClick={() => setScrollSpeed(scrollSpeed - 1)}>-</button>
            <input
              onChange={(e) => setScrollSpeed(Number(e.target.value))}
              value={scrollSpeed}
            ></input>
          </div>
          <button
            onClick={() => [
              setEditingScript(true),
              setEditName(script.name),
              setEditScript(script.text),
            ]}
          >
            edit
          </button>
          <button onClick={() => [setScript(null), setIsPlaying(false)]}>
            back
          </button>
        </div>
      )}
    </div>
  );
};

export default Teleprompter;
