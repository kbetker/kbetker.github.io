import React, { useEffect } from "react";
import "./tetris.css";
import { useState } from "react";
import { useRef } from "react";

const Tetris = () => {
  const shapes = {
    0: { t: ["0-12", "0-11", "0-13", "1-12"] },
    1: { o: ["0-12", "0-13", "1-12", "1-13"] },
    2: { l: ["0-12", "1-12", "2-12", "3-12"] },
    3: { s: ["1-11", "1-12", "0-12", "0-13"] },
    4: { L: ["0-12", "1-12", "2-12", "2-13"] },
    5: { J: ["0-12", "1-12", "2-12", "2-11"] },
  };
  const colors = {
    0: "red",
    1: "lime",
    2: "magenta",
    3: "cyan",
    4: "yellow",
    5: "orange",
  };
  const rows = [...Array(25).keys()];
  const columns = [...Array(37).keys()];
  const [matrix, setMatrix] = useState([[]]);
  const matrixArray = [];
  const tetrisWrapper = useRef(null);

  function getRandomInt() {
    return Math.floor(Math.random() * 6);
  }

  const randDomInt = getRandomInt();
  console.log("%crandDomInt:", "color: lime", randDomInt);

  const currentShape = useRef(...Object.values(shapes[randDomInt]));

  useEffect(() => {
    for (let i = 0; i < columns.length; i++) {
      matrixArray.push({ [i]: rows });
    }
    setMatrix(matrixArray);
  }, []);

  useEffect(() => {
    const wat = setInterval(() => {
      const newShape = [];
      currentShape.current.forEach((coord) => {
        const [col, row] = coord.split("-");
        const removeSquare = document.getElementById(
          `${parseInt(col - 1)}-${row}`
        );
        if (removeSquare) {
          removeSquare.style.backgroundColor = "#333333";
          removeSquare.classList.remove("tetris-shape");
        }
      });

      currentShape.current.forEach((coord) => {
        const [col, row] = coord.split("-");
        const addSquare = document.getElementById(`${parseInt(col)}-${row}`);
        if (addSquare) {
          addSquare.style.backgroundColor = colors[randDomInt];
          addSquare.classList.add("tetris-shape");
        }
        newShape.push(`${parseInt(col) + 1}-${row}`);
      });

      currentShape.current = newShape;
    }, 1000);
    return () => {
      clearInterval(wat);
    };
  }, []);

  return (
    <div className="tetris-wrapper" ref={tetrisWrapper}>
      <div className="tetris-matrix-container">
        {matrix?.map((col, colIndex) => {
          return (
            <ul className="tetris-column" id={`col-${colIndex}`}>
              {col[colIndex]?.map((rowIndex) => {
                return (
                  <li
                    className="tetris-row"
                    id={`${colIndex}-${rowIndex}`}
                  ></li>
                );
              })}
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export default Tetris;
