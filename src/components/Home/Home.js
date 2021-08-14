import React, { useEffect, useRef, useState } from "react"
import "./Home.css"
import {titlesArray, fullDescription, waitAMoment} from "../MiscComponents/MiscComponents.js"


function Home(){
    // const [title, setTitle] = useState('')
    const title = useRef('')
    const [opacity, setOpacity] = useState(1)


    let count = 0;

    const clearTitle = async () => {
      let temp = fullDescription
      while (temp.length) {
        const titleDiv = document.getElementById("colors")
        await waitAMoment(5)
        temp = temp.slice(0, temp.length - 1)
        title.current = temp
        titleDiv.innerHTML = `${title.current}`
      }
      setTimeout(async () => {
        changeTitle()
      }, 500);
    }


    const changeTitle = async () => {
      let currTitle = titlesArray[count];
      const titleDiv = document.getElementById("colors")
      for (const char of currTitle) {
        await waitAMoment(30)
        // setTitle(prev => prev + char)
        title.current += char
        titleDiv.innerHTML = `${title.current}`
      }

      if (count === titlesArray.length - 1) {
        count = 0;
        setTimeout(async () => {
          clearTitle(fullDescription)
        }, 3000);
      } else {
        count++
        setTimeout(async () => {
          changeTitle()
        }, 3000);
      }
    }






  // gets the loop going!
    useEffect(() => {
      setTimeout(async () => {
        changeTitle()
      }, 3000);
    }, [])


  // cool blinky effect
    useEffect(() => {
      let blink = setInterval(() => {
        if (opacity === 1) {
          setOpacity(0)
        } else if (opacity === 0) {
          setOpacity(1)
        }
        clearInterval(blink)
      }, 500)
    }, [opacity])




    return (
        <div className="page_element" style={{ width: `${window.innerWidth}px` }} id="page-1" >
        <div className="homeText">
          <div>Hi, my name is <span className="highlightColor">Kevin Betker</span>.</div>
          <div>I am <span className="highlightColor" id="colors"></span> <span style={{ opacity: `${opacity}` }}>|</span></div>
        </div>
      </div>
    )
}
export default Home
