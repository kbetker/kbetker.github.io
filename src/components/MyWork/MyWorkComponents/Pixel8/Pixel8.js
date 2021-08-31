import React, { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import "./Pixel8.css"
import { myWorkFunc } from "../../../store/myWork";
import pixel8_1 from "./pixel8_preview.jpg"
import pixel8_2 from "./pixel8_preview2.jpg"
import pixel8_3 from "./pixel8_preview3.jpg"
import {airDnDThumb, BBBThumb, idThumb, jfElectricThumb, john1Thumb, nevcoThumb, pixel8Thumb, soundBlenderThumb, printThumb, afterEffects_png, AWS_png, audacity_png, blender_png, css_png, express_png, flask_png, garageBand_png, html5_png, js_png, illustrator_png, inDesign_png, MIDI_png, mocha_png, mochaAE_png, nodeJs_png, photoshop_png, postgresql_png, premiere_png, python_png, pug_png, react_png, redux_png, sequelize_png, sqla_png} from "../../ImageExport.js"



function Pixel8(){
    const darkBackground = useRef()
    const preview = useRef()

    function closePage(e){
        if(e.target.id.startsWith("close")){
            darkBackground.current.classList.add("transparent")
        preview.current.classList.add("previewHide")
        setTimeout(() => {
            dispatch(myWorkFunc(""))
        }, 1000);
       }
    }

    useEffect(()=>{
            darkBackground.current.classList.remove("transparent")
            preview.current.classList.remove("previewHide")
    },[])



    const dispatch = useDispatch();
    return(
        <div className="darkBackground transparent" onClick={(e) => closePage(e)} ref={darkBackground} id="close-background">
        <div className="pixel8Preview previewHide" ref={preview}>
            <div className="close_X" id="close_X">X</div>

                <div className="pixel8Images">
                    {/* <div className="pixel8LeftImage"> */}
                        <img src={pixel8_1} className="pixel8MainImg"></img>
                        {/* </div> */}
                    <div className="pixel8RightImages">
                        <img src={pixel8_3} className="pixel8TopRight"></img>
                        <img src={pixel8_2}></img>
                    </div>
                </div>


                <div>
                        <h2>Pixel8</h2>
                        <div className="pixel8Text">
                        <p>
                        Pixel8 is a full stack application designed for all game-related articles, where you can read reviews, opinions, walkthroughs, and receive news about the latest and greatest in the gaming world. Read all about upcoming games and honest reviews by users that will help you decide if you would like to buy your next game!
                        </p>
                        <a href="https://bestpixel8.herokuapp.com/" className="link" target="_blank"> Live Demo =&gt; pixel8.com</a>
                        </div>
                    </div>

                    <div className="preview_skills">
                            <img className="preview_skill" src={js_png}></img>
                            <img className="preview_skill" src={css_png}></img>
                            <img className="preview_skill" src={html5_png}></img>
                            <img className="preview_skill" src={express_png}></img>
                            <img className="preview_skill" src={sequelize_png}></img>
                            <img className="preview_skill" src={photoshop_png}></img>
                            <img className="preview_skill" src={illustrator_png}></img>
                            <img className="preview_skill" src={pug_png}></img>
                    </div>


        </div>
    </div>
    )
}

export default Pixel8
