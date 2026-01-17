import React, { useRef, useState } from "react";
import "./teleprompter.css";
import { scripts } from "./scripts";
import { waitAMoment } from "../MiscComponents/MiscComponents";

const Teleprompter = () => {
  const [fontSize, setFontSize] = useState(108);
  const [scrollSpeed, setScrollSpeed] = useState(30);
  const [script, setScript] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  //   const [scripts, setScripts] = useState(null);
  //   const [addNewScript, setAddNewScript] = useState(false);
  const scriptRef = useRef(null);

  const scrollTheScript = () => {
    const scriptHeight = scriptRef.current.offsetHeight;
    const weirdOffset = scriptHeight * 0.1;
    scriptRef.current.style.transition = `all ${scrollSpeed}s linear`;

    scriptRef.current.style.bottom = `-${scriptHeight + weirdOffset}px`;
    setIsPlaying(true);
  };

  const stopScrolling = async () => {
    if (scriptRef.current) {
      scriptRef.current.style.transition = `all 0s ease-in-out`;
      await waitAMoment(50);
      scriptRef.current.style.bottom = `10rem`;
      setIsPlaying(false);
    }
  };

  //   const submitScript = (e) => {
  //     e.preventDefault();
  //     const name = e.target[0].value;
  //     const scriptText = e.target[1].value;

  //     const newScript = {
  //       name: name,
  //       script: scriptText,
  //     };
  //   };

  //   Maybe add CRUD functional in the future.
  //   useEffect(() => {
  //     const storedScripts = localStorage.getItem("scripts");
  //     if (storedScripts) {
  //       setScripts(JSON.parse(storedScripts));
  //     }
  //   }, []);

  return (
    <div className="tele-wrapper">
      <div className="tele-container">
        {!script && (
          <div className="tele-button-container">
            {scripts.map((el, i) => (
              <button
                key={`${el.name}-${i}`}
                onClick={() => setScript(el.script)}
              >
                {el.name}
              </button>
            ))}
            {/* <button onClick={() => setAddNewScript(true)}>+</button> */}
          </div>
        )}

        {/* May add CRUD functional in the future. */}
        {/* {addNewScript && (
          <div className="adding-new-script">
            <form onSubmit={submitScript}>
              <input type="text" placeholder="Script Name" />
              <textarea placeholder="Script Text"></textarea>
              <button type="submit">Add Script</button>
              <button onClick={() => setAddNewScript(false)}>Cancel</button>
            </form>
          </div>
        )} */}

        {script && (
          <p
            className="the-script"
            style={{
              fontSize: `${fontSize}px`,
            }}
            ref={scriptRef}
          >
            {script}
          </p>
        )}
      </div>
      {script && (
        <div className="tele-controls">
          {isPlaying ? (
            <button onClick={stopScrolling}>stop</button>
          ) : (
            <button onClick={scrollTheScript}>play</button>
          )}

          {/* Button Controls */}
          <div className="button-controls">
            <span>Font size</span>
            <button onClick={() => setFontSize(fontSize + 6)}>+</button>
            <button onClick={() => setFontSize(fontSize - 6)}>-</button>
            <span>{fontSize}px</span>
          </div>
          <div className="button-controls">
            <span>Scroll speed</span>
            <button onClick={() => setScrollSpeed(scrollSpeed + 1)}>+</button>
            <button onClick={() => setScrollSpeed(scrollSpeed - 1)}>-</button>
            <span>{scrollSpeed}s</span>
          </div>
          <button onClick={() => [setScript(null), setIsPlaying(false)]}>
            back
          </button>
        </div>
      )}
    </div>
  );
};

export default Teleprompter;
