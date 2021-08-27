import React, { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import "./BBB.css"
import { myWorkFunc } from "../../../store/myWork";



function BBB() {
    const darkBackground = useRef()
    const preview = useRef()

    function closePage(e) {
        if (e.target.id.startsWith("close")) {
            darkBackground.current.classList.add("transparent")
            preview.current.classList.add("previewHide")
            setTimeout(() => {
                dispatch(myWorkFunc(""))
            }, 1000);
        }
    }

    useEffect(() => {
        darkBackground.current.classList.remove("transparent")
        preview.current.classList.remove("previewHide")
    }, [])



    const dispatch = useDispatch();
    return (
        <div className="darkBackground transparent" onClick={(e) => closePage(e)} ref={darkBackground} id="close">
            <div className="BBBPreview previewHide" ref={preview}>
                <div className="close_X" id="close_X">X</div>
                <div className="BBBContent">
                    <iframe width="660" height="315" src="https://www.youtube.com/embed/QnZonceoDeM" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" style={{ borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }} allowFullScreen></iframe>
                </div>
                <h2>Born to be a Betker</h2>
                <div className="BBBText">
                     When STLCGC found out about my video editing capabilities, I was often called upon to produce videos for special events. One common issue I found when recording people, is that memorizing lines not long before shooting is not the easiest.
                </div>
            </div>
        </div>
    )
}

export default BBB
