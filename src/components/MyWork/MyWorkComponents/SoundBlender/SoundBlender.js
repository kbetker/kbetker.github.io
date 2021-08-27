import React, { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import "../../MyWork.css"
import "./SoundBlender.css"
import { myWorkFunc } from "../../../store/myWork";
import sb_1 from "./soundBlender_preview.jpg"
import sb_2 from "./soundBlender_preview2.jpg"
import sb_3 from "./soundBlender_preview3.jpg"






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
                            <img src={sb_1} className="sb_mainImg"></img>
                            </div>
                        <div className="soundBlenderRightImages">
                            <img src={sb_3} className="soundBlenderTopRight"></img>
                            <img src={sb_2}></img>
                        </div>
                    </div>


                    <div>
                        <h2>SoundBlender</h2>
                        <div className="sb_text">
                        <p>
                            Soundblender allows users to upload audio files to create soundscapes for roleplaying games or any type of interactive story telling. SoundBlender offers plenty of options to organize and customize sounds to optimize the user's experience. Users can interact with the sounds using the app's built-in buttons and sliders or even connect to an external MIDI device for precision control.
                        </p>
                        <a href="https://soundblender.herokuapp.com/" className="link" target="_blank"> Click here to view the site live =&gt; SoundBlender.com</a>
                        </div>
                    </div>




            </div>
        </div>
    )
}

export default SoundBlender
