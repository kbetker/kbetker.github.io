import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import img0 from "./images/myProfileLaser.jpg";
import img1 from "./images/fullStack.jpg";
import img2 from "./images/graphicDesigner.jpg";
import img3 from "./images/animater2.gif";
import img4 from "./images/photographer2.jpg";
import img5 from "./images/silly.jpg";
import img6 from "./images/Musician.jpg";
import img7 from "./images/videographer.jpg";
import img8 from "./images/dungeonMaster.jpg";

import {
  titlesArray,
  waitAMoment,
  colors,
} from "../MiscComponents/MiscComponents.js";

function Home() {
  const title = useRef("");
  const homeImage = useRef();
  const titleDiv = useRef();
  const backGroundImage = useRef();
  const [opacity, setOpacity] = useState(1);
  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img0];

  let count = 0;

  const clearTitle = async (temp) => {
    // const titleDiv = document.getElementById("colors")

    while (temp.length) {
      await waitAMoment(5);
      if (temp[temp.length - 1] === ">") {
        let i = temp.lastIndexOf("<");
        temp = temp.slice(0, i);
      } else {
        temp = temp.slice(0, temp.length - 1);
      }
      title.current = temp;
      if (titleDiv.current) {
        titleDiv.current.innerHTML = `${title.current}`;
      }
    }

    setTimeout(async () => {
      changeTitle();
    }, 500);
  };

  const changeTitle = async () => {
    let currTitle = titlesArray[count];
    homeImage.current.src = images[count];
    homeImage.current.classList.remove("hidden");

    // const titleDiv = document.getElementById("colors")
    for (let i = 0; i < currTitle.length; i++) {
      let char = currTitle[i];
      await waitAMoment(30);
      if (char === "<") {
        title.current += `<span style="color: ${colors[count]}">`;
      } else if (char === ">") {
        title.current += "</span>";
      } else {
        title.current += char;
      }
      titleDiv.current.innerHTML = `${title.current}`;
    }

    if (count === titlesArray.length - 1) {
      count = 0;
      setTimeout(async () => {
        backGroundImage.current.style.backgroundImage = `url(${img0})`;
        homeImage.current.classList.add("hidden");
        clearTitle(title.current);
      }, 3000);
    } else {
      count++;
      setTimeout(() => {
        homeImage.current.classList.add("hidden");
        backGroundImage.current.style.backgroundImage = `url(${
          images[count - 1]
        })`;
      }, 2000);

      setTimeout(async () => {
        changeTitle();
      }, 3000);
    }
  };

  // gets the loop going!
  useEffect(() => {
    setTimeout(async () => {
      changeTitle();
    }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // cool blinky effect
  useEffect(() => {
    let blink = setInterval(() => {
      if (opacity === 1) {
        setOpacity(0);
      } else if (opacity === 0) {
        setOpacity(1);
      }
      clearInterval(blink);
    }, 500);
  }, [opacity]);

  return (
    <div
      className="page_element"
      style={{ width: `${window.innerWidth}px` }}
      id="page-1"
    >
      <div className="homeContainter">
        <div
          className="homeImage"
          style={{ backgroundImage: `url(${img0})` }}
          ref={backGroundImage}
        >
          <img src={img2} className="image hidden" ref={homeImage} alt=""></img>
        </div>

        <div className="homeText">
          <div>
            Hi, my name is <span className="highlightColor">Kevin Betker</span>.
            I am ...
          </div>
          <div>
            <span className="highlightColor" ref={titleDiv} id="colors"></span>{" "}
            <span style={{ opacity: `${opacity}` }}>|</span>
          </div>
        </div>
      </div>
      <div className="spacer"></div>
    </div>
  );
}
export default Home;

// why you no deploy Github?!?!? >:(
