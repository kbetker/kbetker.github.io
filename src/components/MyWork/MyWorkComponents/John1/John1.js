import React, { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import "./John1.css"
import { myWorkFunc } from "../../../store/myWork";
import prompt from "./telePrompter.jpg"
import {  afterEffects_png, premiere_png, garageBand_png, blender_png, photoshop_png, audacity_png } from "../../ImageExport"


function John1() {
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
            <div className="john1Preview previewHide" ref={preview}>
                <div className="close_X" id="close_X">X</div>
                <div className="john1Content">
                    <iframe width="660" height="315" src="https://www.youtube.com/embed/CtiTpMzobZc" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" style={{ borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }} allowFullScreen></iframe>
                </div>
                <h2>John 1</h2>
                <div className="john1Description">
                    <div className="john1Text">
                        I have produced quite a few videos for STLCGC over the years. One recurring problem I've faced is short time constraints. Having to ask people to stare into the camera and recite a script they were given last minute is not an easy thing to do. A simple solution&#40;being on a strict budget&#41; was to create my own teleprompter. John1 was the first video I produced using my new hardware and the results turned out well.
                    </div>
                    <img src={prompt} className="prompt" alt="My Teleprompter"></img>
                </div>

                <div className="preview_skills">
                    <img className="preview_skill" src={afterEffects_png} alt="JavaScript"></img>
                    <img className="preview_skill" src={premiere_png} alt="React"></img>
                    <img className="preview_skill" src={photoshop_png} alt="Redux"></img>
                    <img className="preview_skill" src={blender_png} alt="Sequelize"></img>
                    <img className="preview_skill" src={audacity_png} alt="HTML5" ></img>
                    <img className="preview_skill" src={garageBand_png} alt="HTML5" ></img>
                </div>
            </div>
        </div>
    )
}

export default John1
