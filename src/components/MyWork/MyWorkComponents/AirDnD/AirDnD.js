import React, { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import "./AirDnD.css"
import { myWorkFunc } from "../../../store/myWork";
import airDnd_1 from "./airdDnD_preview.jpg"
import airDnd_2 from "./airdDnD_preview2.jpg"
import airDnd_3 from "./airdDnD_preview3.jpg"
import {css_png, express_png, html5_png, js_png, illustrator_png, photoshop_png, react_png, redux_png, sequelize_png } from "../../ImageExport.js"




function AirDnD() {
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
            <div className="airDnDPreview previewHide" ref={preview}>
                <div className="close_X" id="close_X">X</div>

                <div className="airDnDImages">
                    {/* <div className="airDnDLeftImage"> */}
                    <img src={airDnd_1} className="airDnd_mainImg" alt=""></img>
                    {/* </div> */}
                    <div className="airDnDRightImages">
                        <img src={airDnd_3} className="airDnDTopRight" alt=""></img>
                        <img src={airDnd_2} alt=""></img>
                    </div>
                </div>

                <div>
                    <h2>Air D&amp;D</h2>
                    <div className="airDnd_text">
                        <p>
                            Air D&amp;D is a clone of AirBnB set in the magical world of Faer&#251;n. Say goodbye to camping under the stars where owlbears may hunt you down in the middle of the night! No longer do you need to worry whether the denizens of the cabin in the woods are friendly or if it's actually a coven for hags&#40;unless that's what you're into&#41;. Find a location, pick a date, go on an adventure!
                        </p>
                        <a href="https://airdnd-kb.herokuapp.com/" className="link" target="_blank" rel="noreferrer"> Live Demo =&gt; AirD&amp;D.com</a>
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
                    <img className="preview_skill" src={photoshop_png} alt="Photoshop"></img>
                    <img className="preview_skill" src={illustrator_png} alt="Illustrator"></img>
                </div>




            </div>
        </div>
    )
}

export default AirDnD
