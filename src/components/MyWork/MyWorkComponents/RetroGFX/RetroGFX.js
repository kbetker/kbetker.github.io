import React, { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import { myWorkFunc } from "../../../store/myWork";
import colorSlider from "./colorSlider2.png"
import drawingApp from "./drawingApp.png"
import homepage01 from "./homepage01.png"
import homepage02 from "./homepage02.png"
import "./retrogfx2.css"

import {css_png, express_png, html5_png, js_png, react_png, redux_png, sequelize_png } from "../../ImageExport.js"




function RetroGFX() {
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
            <div className="retroGFXPreview previewHide" ref={preview}>
                <div className="close_X" id="close_X">X</div>

                <div className="retroGFXImages">
                    {/* <div className="retroGFXLeftImage"> */}
                    <img src={homepage01} className="retroGFX_mainImg" alt=""></img>
                    {/* </div> */}
                    <div className="retroGFXRightImages">
                        <img src={colorSlider} className="retroGFXTopRight" alt=""></img>
                        <img src={drawingApp} alt=""></img>
                    </div>
                </div>

                <div>
                    <h2>RetroGFX</h2>
                    <div className="retroGFX_text">
                        <p>
                        It started when I saw a React color slider component. I thought it would be a good &ldquo;Front-end JavaScript DOM Manipulation&rdquo; exercise and I think it turned out quite well. React's ability to have variables and conditionals inside the styles attribute made life easier.... but then I thought it would also be cool to try to recreate a drawing pad.. and drawing tools... maybe users... and before long, it turned into a full-stack drawing app complete with styles borrowed from the 90's. Feel free to check it out and draw a picture or two. My kids are using it, so maybe keep it clean? Zach - I'm talking to you. Also, please keep in mind it is a work in progress, so more features will likely come soon.
                        </p>
                        <a href="https://mycodepen.herokuapp.com/" className="link" target="_blank" rel="noreferrer"> Live Demo =&gt; RetroGFX</a>
                    </div>
                </div>

                <div className="preview_skills">
                    <img className="preview_skill" src={js_png} alt="JavaScript"></img>
                    <img className="preview_skill" src={react_png} alt="React"></img>
                    <img className="preview_skill" src={redux_png} alt="Redux"></img>
                    <img className="preview_skill" src={sequelize_png} alt="Sequelize"></img>
                    <img className="preview_skill" src={express_png} alt="Express"></img>
                    <img className="preview_skill" src={html5_png} alt="HTML5" ></img>
                    <img className="preview_skill" src={css_png} alt="CSS"></img>

                </div>




            </div>
        </div>
    )
}

export default RetroGFX
