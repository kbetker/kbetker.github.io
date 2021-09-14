import React, { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import "../../MyWork.css"
import "./SoundBlender.css"
import { myWorkFunc } from "../../../store/myWork";
import sb_1 from "./soundBlender_preview.jpg"
import sb_2 from "./soundBlender_preview2.jpg"
import sb_3 from "./soundBlender_preview3.jpg"
import {afterEffects_png, AWS_png, css_png, flask_png, html5_png, illustrator_png, MIDI_png, photoshop_png, python_png, react_png, redux_png, sqla_png} from "../../ImageExport.js"






function SoundBlender() {
    // let darkBackground = document.getElementById("darkBackground")
    // let preview = document.getElementById("preview")
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
        <div className="darkBackground transparent" onClick={(e) => closePage(e)} ref={darkBackground} id="close-background">
            <div className="soundBlenderPreview previewHide" ref={preview}>
                <div className="close_X" id="close_X">X</div>

                    <div className="soundBlenderImages">
                        <div className="soundblenderLeftImage">
                            <img src={sb_1} className="soundBlenderMainImg" alt=""></img>
                            </div>
                        <div className="soundBlenderRightImages">
                            <img src={sb_3} className="soundBlenderTopRight" alt=""></img>
                            <img src={sb_2} alt=""></img>
                        </div>
                    </div>


                    <div>
                        <h2>SoundBlender</h2>
                        <div className="soundBlenderText">
                        <p>
                            Soundblender allows users to upload audio files to create soundscapes for roleplaying games or any type of interactive storytelling. SoundBlender offers plenty of options to organize and customize sounds to optimize the user's experience. Users can interact with the sounds using the app's built-in buttons and sliders or even connect to an external MIDI device for precision control.
                        </p>
                        <a href="https://soundblender.herokuapp.com/" className="link" target="_blank" rel="noreferrer"> Live Demo =&gt; SoundBlender.com</a>
                        </div>
                    </div>

                    <div className="preview_skills">
                            <img className="preview_skill" src={react_png} alt="React"></img>
                            <img className="preview_skill" src={redux_png} alt="Redux"></img>
                            <img className="preview_skill" src={flask_png} alt=""Flask></img>
                            <img className="preview_skill" src={sqla_png} alt="SQLA"></img>
                            <img className="preview_skill" src={html5_png} alt="HTML5" ></img>
                            <img className="preview_skill" src={AWS_png} alt="AWS"></img>
                            <img className="preview_skill" src={python_png} alt="Python"></img>
                            <img className="preview_skill" src={css_png} alt="CSS"></img>
                            <img className="preview_skill" src={photoshop_png} alt="Photoshop"></img>
                            <img className="preview_skill" src={illustrator_png} alt="Illustrator"></img>
                            <img className="preview_skill" src={afterEffects_png} alt="After Effects"></img>
                            <img className="preview_skill" src={MIDI_png} alt="MIDI"></img>
                    </div>


            </div>
        </div>
    )
}

export default SoundBlender
