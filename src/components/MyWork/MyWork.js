import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { waitAMoment } from "../MiscComponents/MiscComponents"
import "./MyWork.css"
import soundBlenderThumb from "./images/soundBlenderThumb.jpg"
import { myWorkFunc } from "../store/myWork"


function MyWork() {
  const pageNum = useSelector(state => state.pageNum)
  const dispatch = useDispatch()

  async function fade() {
    let thumbDivs = document.querySelectorAll(".thumbnail")
    for (let i = 0; i < thumbDivs.length; i++) {
      await waitAMoment(200)
      if (pageNum === "page-2") {
        thumbDivs[i].classList.remove("transparent")
      } else {
        thumbDivs[i].classList.add("transparent")
      }
    }
  }

  useEffect(() => {
    fade()
  }, [pageNum])

  return (
    <div className="page_element" style={{ width: `${window.innerWidth}px` }} id="page-2" >
      <div className="MyWork">
        <div className="thumbnail transparent" onClick={()=>dispatch(myWorkFunc("soundblender"))} style={{backgroundImage: `url(${soundBlenderThumb})`}}></div>
        <div className="thumbnail transparent" onClick={()=>dispatch(myWorkFunc("airdnd"))}>Air D&amp;D</div>
        <div className="thumbnail transparent" onClick={()=>dispatch(myWorkFunc("pixel8"))}>Pixel8</div>
        <div className="thumbnail transparent" onClick={()=>dispatch(myWorkFunc("jfelectric"))}>JF Electric</div>
        <div className="thumbnail transparent" onClick={()=>dispatch(myWorkFunc("nevco"))}>Nevco</div>
        <div className="thumbnail transparent" onClick={()=>dispatch(myWorkFunc("john1"))}>John 1</div>
        <div className="thumbnail transparent" onClick={()=>dispatch(myWorkFunc("investigation"))}>Investigation Destination</div>
        <div className="thumbnail transparent" onClick={()=>dispatch(myWorkFunc("bbb"))}>Born to be a Betker</div>
        <div className="thumbnail transparent" onClick={()=>dispatch(myWorkFunc("print"))}>Print Material</div>

      </div>
    </div>
  )
}
export default MyWork
