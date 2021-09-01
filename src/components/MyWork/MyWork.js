import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { waitAMoment } from "../MiscComponents/MiscComponents"
import "./MyWork.css"
import { myWorkFunc } from "../store/myWork"
import {airDnDThumb, BBBThumb, jfElectricThumb, john1Thumb, nevcoThumb, pixel8Thumb, soundBlenderThumb, printThumb, afterEffects_png, AWS_png, audacity_png, blender_png, css_png, express_png, flask_png, garageBand_png, html5_png, js_png, illustrator_png, inDesign_png, MIDI_png, mochaAE_png, photoshop_png, premiere_png, python_png, pug_png, react_png, redux_png, sequelize_png, sqla_png} from "./ImageExport.js"


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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNum])

    return (
        <div className="page_element" style={{ width: `${window.innerWidth}px` }} id="page-2" >
            <div className="MyWork">


                <div className="thumbnail transparent" onClick={() => dispatch(myWorkFunc("soundblender"))} style={{ backgroundImage: `url(${soundBlenderThumb})` }}>
                    <div className="thumb_content">
                        <div className="thumbnail_skills">
                            <img className="thumbnail_skill" src={js_png} alt="JavaScript"></img>
                            <img className="thumbnail_skill" src={react_png} alt="React"></img>
                            <img className="thumbnail_skill" src={redux_png} alt="Redux"></img>
                            <img className="thumbnail_skill" src={flask_png} alt="Flask"></img>
                            <img className="thumbnail_skill" src={sqla_png} alt="SQLA"></img>
                            <img className="thumbnail_skill" src={html5_png} alt="HTML5" ></img>
                            <img className="thumbnail_skill" src={AWS_png} alt="AWS"></img>
                        </div>

                        <div className="thumb_titles">
                            <div className="thumb_title">SoundBlender</div>
                            <div className="thumb_subtitle">Fullstack Web App</div>
                        </div>

                        <div className="thumbnail_skills">
                            <img className="thumbnail_skill" src={python_png} alt="Python"></img>
                            <img className="thumbnail_skill" src={css_png} alt="CSS"></img>
                            <img className="thumbnail_skill" src={photoshop_png} alt="Photoshop"></img>
                            <img className="thumbnail_skill" src={illustrator_png} alt="Illustrator"></img>
                            <img className="thumbnail_skill" src={afterEffects_png} alt="After Effects"></img>
                            <img className="thumbnail_skill" src={MIDI_png} alt="MIDI"></img>
                        </div>
                    </div>
                </div>



                <div className="thumbnail transparent" onClick={() => dispatch(myWorkFunc("airdnd"))} style={{ backgroundImage: `url(${airDnDThumb})` }}>
                    <div className="thumb_content">
                        <div className="thumbnail_skills">
                            <img className="thumbnail_skill" src={js_png} alt="JavaScript"></img>
                            <img className="thumbnail_skill" src={react_png} alt="React"></img>
                            <img className="thumbnail_skill" src={redux_png} alt="Redux"></img>
                            <img className="thumbnail_skill" src={sequelize_png} alt="Sequelize"></img>
                            <img className="thumbnail_skill" src={express_png} alt="Express"></img>
                        </div>

                        <div className="thumb_titles">
                            <div className="thumb_title">Air D&amp;D</div>
                            <div className="thumb_subtitle">Fullstack Web App</div>
                        </div>
                        <div className="thumbnail_skills">
                            <img className="thumbnail_skill" src={html5_png} alt="HTML5" ></img>
                            <img className="thumbnail_skill" src={css_png} alt="CSS"></img>
                            <img className="thumbnail_skill" src={photoshop_png} alt="Photoshop"></img>
                            <img className="thumbnail_skill" src={illustrator_png} alt="Illustrator"></img>
                        </div>
                    </div>
                </div>



                <div className="thumbnail transparent" onClick={() => dispatch(myWorkFunc("pixel8"))} style={{ backgroundImage: `url(${pixel8Thumb})` }}>
                    <div className="thumb_content">
                        <div className="thumbnail_skills">
                            <img className="thumbnail_skill" src={js_png} alt="JavaScript"></img>
                            <img className="thumbnail_skill" src={css_png} alt="CSS"></img>
                            <img className="thumbnail_skill" src={html5_png} alt="HTML5" ></img>
                            <img className="thumbnail_skill" src={express_png} alt="Express"></img>
                        </div>

                        <div className="thumb_titles">
                            <div className="thumb_title">Pixel8</div>
                            <div className="thumb_subtitle">Fullstack Web App</div>
                        </div>
                        <div className="thumbnail_skills">
                            <img className="thumbnail_skill" src={sequelize_png} alt="Sequelize"></img>
                            <img className="thumbnail_skill" src={photoshop_png} alt="Photoshop"></img>
                            <img className="thumbnail_skill" src={illustrator_png} alt="Illustrator"></img>
                            <img className="thumbnail_skill" src={pug_png} alt="Pug"></img>
                        </div>
                    </div>
                </div>



                <div className="thumbnail transparent" onClick={() => dispatch(myWorkFunc("jfelectric"))} style={{ backgroundImage: `url(${jfElectricThumb})` }}>
                    <div className="thumb_content">
                        <div className="thumbnail_skills">
                            <img className="thumbnail_skill" src={afterEffects_png} alt="After Effects"></img>
                            <img className="thumbnail_skill" src={premiere_png} alt="Premiere"></img>
                            <img className="thumbnail_skill" src={blender_png} alt="Blender"></img>
                        </div>

                        <div className="thumb_titles">
                            <div className="thumb_title"> JF Electric</div>
                            <div className="thumb_subtitle">Video</div>
                        </div>
                        <div className="thumbnail_skills">
                            <img className="thumbnail_skill" src={mochaAE_png} alt="Mocha AE"></img>
                            <img className="thumbnail_skill" src={audacity_png} alt="Audacity"></img>
                            <img className="thumbnail_skill" src={photoshop_png} alt="Photoshop"></img>
                        </div>

                    </div>
                </div>


                <div className="thumbnail transparent" onClick={() => dispatch(myWorkFunc("nevco"))} style={{ backgroundImage: `url(${nevcoThumb})` }}>
                    <div className="thumb_content">
                        <div className="thumbnail_skills">
                            <img className="thumbnail_skill" src={afterEffects_png} alt="After Effects"></img>
                            <img className="thumbnail_skill" src={premiere_png} alt="Premiere"></img>
                            <img className="thumbnail_skill" src={blender_png} alt="Blender"></img>
                        </div>

                        <div className="thumb_titles">
                            <div className="thumb_title"> Nevco</div>
                            <div className="thumb_subtitle">Video</div>
                        </div>
                        <div className="thumbnail_skills">
                            <img className="thumbnail_skill" src={audacity_png} alt="Audacity"></img>
                            <img className="thumbnail_skill" src={photoshop_png} alt="Photoshop"></img>
                            <img className="thumbnail_skill" src={illustrator_png} alt="Illustrator"></img>
                        </div>
                    </div>
                </div>


                <div className="thumbnail transparent" onClick={() => dispatch(myWorkFunc("john1"))} style={{ backgroundImage: `url(${john1Thumb})` }}>
                    <div className="thumb_content">
                        <div className="thumbnail_skills">
                            <img className="thumbnail_skill" src={afterEffects_png} alt="After Effects"></img>
                            <img className="thumbnail_skill" src={premiere_png} alt="Premiere"></img>
                            <img className="thumbnail_skill" src={blender_png} alt="Blender"></img>
                        </div>

                        <div className="thumb_titles">
                            <div className="thumb_title"> John 1</div>
                            <div className="thumb_subtitle">Video</div>
                        </div>
                        <div className="thumbnail_skills">
                            <img className="thumbnail_skill" src={audacity_png} alt="Audacity"></img>
                            <img className="thumbnail_skill" src={photoshop_png} alt="Photoshop"></img>
                            <img className="thumbnail_skill" src={garageBand_png} alt="Garage Band"></img>
                        </div>
                    </div>
                </div>


                {/* <div className="thumbnail transparent" onClick={() => dispatch(myWorkFunc("investigation"))} style={{ backgroundImage: `url(${idThumb})` }}>Investigation Destination</div> */}
                <div className="thumbnail transparent" onClick={() => dispatch(myWorkFunc("bbb"))} style={{ backgroundImage: `url(${BBBThumb})` }}>
                    <div className="thumb_content">
                        <div className="thumbnail_skills">
                            <img className="thumbnail_skill" src={afterEffects_png} alt="After Effects"></img>
                            <img className="thumbnail_skill" src={premiere_png} alt="Premiere"></img>
                            <img className="thumbnail_skill" src={blender_png} alt="Blender"></img>
                        </div>

                        <div className="thumb_titles">
                            <div className="thumb_title"> Born to be a Betker</div>
                            <div className="thumb_subtitle">Video</div>
                        </div>
                        <div className="thumbnail_skills">
                            <img className="thumbnail_skill" src={audacity_png} alt="Audacity"></img>
                            <img className="thumbnail_skill" src={photoshop_png} alt="Photoshop"></img>
                        </div>
                    </div>
                </div>

                <div className="thumbnail transparent" onClick={() => dispatch(myWorkFunc("print"))} style={{ backgroundImage: `url(${printThumb})` }}>
                    <div className="thumb_content">
                        <div className="thumbnail_skills">
                            <img className="thumbnail_skill" src={photoshop_png} alt="Photoshop"></img>
                            <img className="thumbnail_skill" src={illustrator_png} alt="Illustrator"></img>
                            <img className="thumbnail_skill" src={inDesign_png} alt="inDesign"></img>
                        </div>

                        <div className="thumb_titles">
                            <div className="thumb_title"> Print Materials</div>
                            {/* <div className="thumb_subtitle">Video</div> */}
                        </div>
                        <div className="thumbnail_skills">
                            <img className="thumbnail_skill" src={blender_png} alt="Blender"></img>
                            <img className="thumbnail_skill" src={photoshop_png} alt="Photoshop"></img>
                        </div>
                    </div>
                </div>




                <div id="spacer" style={{height: "70px", width: "100%"}}></div>
            </div>
        </div>
    )
}
export default MyWork
