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

import afterEffects_png from "./softwareLogos/afterEffects.png"
import AWS_png from "./softwareLogos/AWS.png"
import audacity_png from "./softwareLogos/audacity.png"
import blender_png from "./softwareLogos/blender.png"
import css_png from "./softwareLogos/css.png"
import express_png from "./softwareLogos/express.png"
import flask_png from "./softwareLogos/flask.png"
import garageBand_png from "./softwareLogos/garageBand.png"
import html5_png from "./softwareLogos/html5.png"
import js_png from "./softwareLogos/javaScript.png"
import illustrator_png from "./softwareLogos/illustrator.png"
import inDesign_png from "./softwareLogos/inDesign.png"
import MIDI_png from "./softwareLogos/MIDI.png"
import mocha_png from "./softwareLogos/mocha.png"
import mochaAE_png from "./softwareLogos/mochaAE.png"
import nodeJs_png from "./softwareLogos/nodeJs.png"
import photoshop_png from "./softwareLogos/photoshop.png"
import postgresql_png from "./softwareLogos/postgresql.png"
import premiere_png from "./softwareLogos/premiere.png"
import python_png from "./softwareLogos/python.png"
import pug_png from "./softwareLogos/pug.png"
import react_png from "./softwareLogos/react.png"
import redux_png from "./softwareLogos/redux.png"
import sequelize_png from "./softwareLogos/sequelize.png"
import sqla_png from "./softwareLogos/sqla.png"


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
                            <img className="thumbnail_skill" src={js_png}></img>
                            <img className="thumbnail_skill" src={react_png}></img>
                            <img className="thumbnail_skill" src={redux_png}></img>
                            <img className="thumbnail_skill" src={flask_png}></img>
                            <img className="thumbnail_skill" src={sqla_png}></img>
                            <img className="thumbnail_skill" src={html5_png}></img>
                            <img className="thumbnail_skill" src={AWS_png}></img>
                        </div>

                        <div className="thumb_titles">
                            <div className="thumb_title">SoundBlender</div>
                            <div className="thumb_subtitle">Fullstack Web App</div>
                        </div>

                        <div className="thumbnail_skills">
                            <img className="thumbnail_skill" src={python_png}></img>
                            <img className="thumbnail_skill" src={css_png}></img>
                            <img className="thumbnail_skill" src={photoshop_png}></img>
                            <img className="thumbnail_skill" src={illustrator_png}></img>
                            <img className="thumbnail_skill" src={afterEffects_png}></img>
                            <img className="thumbnail_skill" src={MIDI_png}></img>
                        </div>
                    </div>
                </div>



                <div className="thumbnail transparent" onClick={() => dispatch(myWorkFunc("airdnd"))} style={{ backgroundImage: `url(${airDnDThumb})` }}>
                    <div className="thumb_content">
                        <div className="thumbnail_skills">
                            <img className="thumbnail_skill" src={js_png}></img>
                            <img className="thumbnail_skill" src={react_png}></img>
                            <img className="thumbnail_skill" src={redux_png}></img>
                            <img className="thumbnail_skill" src={sequelize_png}></img>
                            <img className="thumbnail_skill" src={express_png}></img>
                        </div>

                        <div className="thumb_titles">
                            <div className="thumb_title">Air D&amp;D</div>
                            <div className="thumb_subtitle">Fullstack Web App</div>
                        </div>
                        <div className="thumbnail_skills">
                            <img className="thumbnail_skill" src={html5_png}></img>
                            <img className="thumbnail_skill" src={css_png}></img>
                            <img className="thumbnail_skill" src={photoshop_png}></img>
                            <img className="thumbnail_skill" src={illustrator_png}></img>
                        </div>
                    </div>
                </div>



                <div className="thumbnail transparent" onClick={() => dispatch(myWorkFunc("pixel8"))} style={{ backgroundImage: `url(${pixel8Thumb})` }}>
                    <div className="thumb_content">
                        <div className="thumbnail_skills">
                            <img className="thumbnail_skill" src={js_png}></img>
                            <img className="thumbnail_skill" src={css_png}></img>
                            <img className="thumbnail_skill" src={html5_png}></img>
                            <img className="thumbnail_skill" src={express_png}></img>
                        </div>

                        <div className="thumb_titles">
                            <div className="thumb_title">Pixel8</div>
                            <div className="thumb_subtitle">Fullstack Web App</div>
                        </div>
                        <div className="thumbnail_skills">
                            <img className="thumbnail_skill" src={sequelize_png}></img>
                            <img className="thumbnail_skill" src={photoshop_png}></img>
                            <img className="thumbnail_skill" src={illustrator_png}></img>
                            <img className="thumbnail_skill" src={pug_png}></img>
                        </div>
                    </div>
                </div>



                <div className="thumbnail transparent" onClick={() => dispatch(myWorkFunc("jfelectric"))} style={{ backgroundImage: `url(${jfElectricThumb})` }}>
                    <div className="thumb_content">
                        <div className="thumbnail_skills">
                            <img className="thumbnail_skill" src={afterEffects_png}></img>
                            <img className="thumbnail_skill" src={premiere_png}></img>
                            <img className="thumbnail_skill" src={blender_png}></img>
                        </div>

                        <div className="thumb_titles">
                            <div className="thumb_title"> JF Electric</div>
                            <div className="thumb_subtitle">Video</div>
                        </div>
                        <div className="thumbnail_skills">
                            <img className="thumbnail_skill" src={mochaAE_png}></img>
                            <img className="thumbnail_skill" src={audacity_png}></img>
                            <img className="thumbnail_skill" src={photoshop_png}></img>
                        </div>

                    </div>
                </div>


                <div className="thumbnail transparent" onClick={() => dispatch(myWorkFunc("nevco"))} style={{ backgroundImage: `url(${nevcoThumb})` }}>
                    <div className="thumb_content">
                        <div className="thumbnail_skills">
                            <img className="thumbnail_skill" src={afterEffects_png}></img>
                            <img className="thumbnail_skill" src={premiere_png}></img>
                            <img className="thumbnail_skill" src={blender_png}></img>
                        </div>

                        <div className="thumb_titles">
                            <div className="thumb_title"> Nevco</div>
                            <div className="thumb_subtitle">Video</div>
                        </div>
                        <div className="thumbnail_skills">
                            <img className="thumbnail_skill" src={audacity_png}></img>
                            <img className="thumbnail_skill" src={photoshop_png}></img>
                            <img className="thumbnail_skill" src={illustrator_png}></img>
                        </div>
                    </div>
                </div>


                <div className="thumbnail transparent" onClick={() => dispatch(myWorkFunc("john1"))} style={{ backgroundImage: `url(${john1Thumb})` }}>
                    <div className="thumb_content">
                        <div className="thumbnail_skills">
                            <img className="thumbnail_skill" src={afterEffects_png}></img>
                            <img className="thumbnail_skill" src={premiere_png}></img>
                            <img className="thumbnail_skill" src={blender_png}></img>
                        </div>

                        <div className="thumb_titles">
                            <div className="thumb_title"> John 1</div>
                            <div className="thumb_subtitle">Video</div>
                        </div>
                        <div className="thumbnail_skills">
                            <img className="thumbnail_skill" src={audacity_png}></img>
                            <img className="thumbnail_skill" src={photoshop_png}></img>
                            <img className="thumbnail_skill" src={garageBand_png}></img>
                        </div>
                    </div>
                </div>


                {/* <div className="thumbnail transparent" onClick={() => dispatch(myWorkFunc("investigation"))} style={{ backgroundImage: `url(${idThumb})` }}>Investigation Destination</div> */}
                <div className="thumbnail transparent" onClick={() => dispatch(myWorkFunc("bbb"))} style={{ backgroundImage: `url(${BBBThumb})` }}>
                    <div className="thumb_content">
                        <div className="thumbnail_skills">
                            <img className="thumbnail_skill" src={afterEffects_png}></img>
                            <img className="thumbnail_skill" src={premiere_png}></img>
                            <img className="thumbnail_skill" src={blender_png}></img>
                        </div>

                        <div className="thumb_titles">
                            <div className="thumb_title"> Born to be a Betker</div>
                            <div className="thumb_subtitle">Video</div>
                        </div>
                        <div className="thumbnail_skills">
                            <img className="thumbnail_skill" src={audacity_png}></img>
                            <img className="thumbnail_skill" src={photoshop_png}></img>
                        </div>
                    </div>
                </div>

                <div className="thumbnail transparent" onClick={() => dispatch(myWorkFunc("print"))} style={{ backgroundImage: `url(${printThumb})` }}>
                    <div className="thumb_content">
                        <div className="thumbnail_skills">
                            <img className="thumbnail_skill" src={photoshop_png}></img>
                            <img className="thumbnail_skill" src={illustrator_png}></img>
                            <img className="thumbnail_skill" src={inDesign_png}></img>
                        </div>

                        <div className="thumb_titles">
                            <div className="thumb_title"> Print Materials</div>
                            {/* <div className="thumb_subtitle">Video</div> */}
                        </div>
                        <div className="thumbnail_skills">
                            <img className="thumbnail_skill" src={blender_png}></img>
                            <img className="thumbnail_skill" src={photoshop_png}></img>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default MyWork
