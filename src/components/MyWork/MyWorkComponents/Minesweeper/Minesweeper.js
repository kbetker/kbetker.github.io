import React, { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import { myWorkFunc } from "../../../store/myWork";
import minesweeper_png from "./mineSweeper.png"
import "./minesweeper.css"
import {css_png, express_png, html5_png, js_png, illustrator_png, photoshop_png, react_png, redux_png, sequelize_png } from "../../ImageExport.js"


function Minesweeper() {
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
            <div className="minesweeperPreview previewHide" ref={preview}>
                <div className="close_X" id="close_X">X</div>
                <div className="minesweeperContent">
                    <img src={minesweeper_png} className="mineSweeperImg"></img>
                </div>
                <h2>Minesweeper</h2>
                <div className="minesweeperDescription">
                    <div className="minesweeperText">
                       I remember way back when this game came out... I mean, I'm not that old!!! This is another exercise with &ldquo;Front-end JavaScript DOM Manipulation&rdquo; Click on all the squares that are not mines and you win!!! This is also a work in progress and will likely be updated after more play-testing. I'm pretty sure level 9 is impossible.
                    </div>
                    <a href="https://mycodepen.herokuapp.com/minesweeper" className="link minesweeperLink" target="_blank" rel="noreferrer"> Live Demo =&gt; Minesweeper</a>
                </div>


                <div className="preview_skills">
                    <img className="preview_skill" src={js_png} alt="JavaScript"></img>
                    <img className="preview_skill" src={react_png} alt="React"></img>
                    <img className="preview_skill" src={html5_png} alt="HTML5" ></img>
                    <img className="preview_skill" src={css_png} alt="CSS"></img>
                </div>
            </div>
        </div>
    )
}

export default Minesweeper
