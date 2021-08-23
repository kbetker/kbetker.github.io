import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { waitAMoment } from "../MiscComponents/MiscComponents"
import "./MyWork.css"
import airDnDThumb from "./images/airDnD_thumb.jpg"
import BBBThumb from "./images/BBB_thumb.jpg"
import idThumb from "./images/id_thumb.jpg"
import jfElectricThumb from "./images/jfelectric_thumb.jpg"
import john1Thumb from "./images/john1_thumb.jpg"
import nevcoThumb from "./images/nevco_thumb.jpg"
import pixel8Thumb from "./images/pixel8_thumb.jpg"
import soundBlenderThumb from "./images/soundBlenderThumb.jpg"
import printThumb from "./images/print_thumb.jpg"

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


                <div className="thumbnail transparent" onClick={() => dispatch(myWorkFunc("soundblender"))} style={{ backgroundImage: `url(${soundBlenderThumb})` }}>
                <div className="thumb_content">
                        <div className="thumbnail_skills">
                            <div className="thumbnail_skill"></div>
                            <div className="thumbnail_skill"></div>
                            <div className="thumbnail_skill"></div>
                            <div className="thumbnail_skill"></div>
                            <div className="thumbnail_skill"></div>
                        </div>
                        <div className="thumb_title">SoundBlender</div>
                        <div className="thumbnail_skills">
                        <div className="thumbnail_skill"></div>
                            <div className="thumbnail_skill"></div>
                            <div className="thumbnail_skill"></div>
                            <div className="thumbnail_skill"></div>
                            <div className="thumbnail_skill"></div>
                        </div>
                    </div>


                </div>



                <div className="thumbnail transparent" onClick={() => dispatch(myWorkFunc("airdnd"))} style={{ backgroundImage: `url(${airDnDThumb})` }}>
                    <div className="thumb_content">
                        <div className="thumbnail_skills">
                            <div className="thumbnail_skill"></div>
                            <div className="thumbnail_skill"></div>
                            <div className="thumbnail_skill"></div>
                            <div className="thumbnail_skill"></div>
                            <div className="thumbnail_skill"></div>
                        </div>
                        <div className="thumb_title">Air D&amp;D</div>
                        <div className="thumbnail_skills"></div>
                    </div>
                </div>



                <div className="thumbnail transparent" onClick={() => dispatch(myWorkFunc("pixel8"))} style={{ backgroundImage: `url(${pixel8Thumb})` }}>Pixel8</div>
                <div className="thumbnail transparent" onClick={() => dispatch(myWorkFunc("jfelectric"))} style={{ backgroundImage: `url(${jfElectricThumb})` }}>JF Electric</div>
                <div className="thumbnail transparent" onClick={() => dispatch(myWorkFunc("nevco"))} style={{ backgroundImage: `url(${nevcoThumb})` }}>Nevco</div>
                <div className="thumbnail transparent" onClick={() => dispatch(myWorkFunc("john1"))} style={{ backgroundImage: `url(${john1Thumb})` }}>John 1</div>
                <div className="thumbnail transparent" onClick={() => dispatch(myWorkFunc("investigation"))} style={{ backgroundImage: `url(${idThumb})` }}>Investigation Destination</div>
                <div className="thumbnail transparent" onClick={() => dispatch(myWorkFunc("bbb"))} style={{ backgroundImage: `url(${BBBThumb})` }}>Born to be a Betker</div>
                <div className="thumbnail transparent" onClick={() => dispatch(myWorkFunc("print"))} style={{ backgroundImage: `url(${printThumb})` }}>Print Material</div>

            </div>
        </div>
    )
}
export default MyWork
