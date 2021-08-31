import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { waitAMoment } from "../MiscComponents/MiscComponents"
import "./MyWork.css"
import { myWorkFunc } from "../store/myWork"
import {airDnDThumb, BBBThumb, idThumb, jfElectricThumb, john1Thumb, nevcoThumb, pixel8Thumb, soundBlenderThumb, printThumb, afterEffects_png, AWS_png, audacity_png, blender_png, css_png, express_png, flask_png, garageBand_png, html5_png, js_png, illustrator_png, inDesign_png, MIDI_png, mocha_png, mochaAE_png, nodeJs_png, photoshop_png, postgresql_png, premiere_png, python_png, pug_png, react_png, redux_png, sequelize_png, sqla_png} from "./ImageExport.js"


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




                <div id="spacer" style={{height: "70px", width: "100%"}}></div>
            </div>
        </div>
    )
}
export default MyWork
