import React, { useEffect, useRef, useState } from "react"
import "./Home.css"
import { titlesArray, waitAMoment, colors } from "../MiscComponents/MiscComponents.js"


function Home() {
  // const [title, setTitle] = useState('')
  const title = useRef('')
  const [opacity, setOpacity] = useState(1)


  let count = 0;

  const clearTitle = async (temp) => {

    const titleDiv = document.getElementById("colors")

    while (temp.length) {
      await waitAMoment(5)
      if (temp[temp.length - 1] === ">") {
        let i = temp.lastIndexOf("<")
        temp = temp.slice(0, i)
      } else {
        temp = temp.slice(0, temp.length - 1)
      }
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
    for (let i = 0; i < currTitle.length; i++) {
      let char = currTitle[i]
      await waitAMoment(30)
      if (char === "<") {
        title.current += `<span style="color: ${colors[count]}">`
      } else if (char === ">") {
        title.current += "</span>"
      } else {
        title.current += char
      }
      titleDiv.innerHTML = `${title.current}`
    }

    if (count === titlesArray.length - 1) {
      count = 0;
      setTimeout(async () => {
        clearTitle(title.current)
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
        <div>Hi, my name is <span className="highlightColor">Kevin Betker</span>. I am ...</div>
        <div><span className="highlightColor" id="colors"></span> <span style={{ opacity: `${opacity}` }}>|</span></div>
      </div>
    </div>
  )
}
export default Home
