import React, { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import "./BBB.css"
import { myWorkFunc } from "../../../store/myWork";
import { blender_png, afterEffects_png, premiere_png, photoshop_png, audacity_png } from "../../ImageExport"


function BBB() {
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
            <div className="BBBPreview previewHide" ref={preview}>
                <div className="close_X" id="close_X">X</div>
                <div className="BBBContent">
                    <iframe width="660" height="315" src="https://www.youtube.com/embed/QnZonceoDeM" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" style={{ borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }} allowFullScreen></iframe>
                </div>
                <h2>Born to be a Betker</h2>
                <div className="BBBText">
                    This was my first project while still learning Blender where I incorporated live action keyed out on a green screen in After Effects. My skills have grown significantly since this project, but given the short time I had to learn Blender, it shows my ability to pick up on new software. However, I really wanted to showcase this piece in my portfolio because, well just look how cute my boy is!
                </div>

                <div className="preview_skills">
                    <img className="preview_skill" src={blender_png} alt="Sequelize"></img>
                    <img className="preview_skill" src={afterEffects_png} alt="JavaScript"></img>
                    <img className="preview_skill" src={premiere_png} alt="React"></img>
                    <img className="preview_skill" src={photoshop_png} alt="Redux"></img>
                    <img className="preview_skill" src={audacity_png} alt="HTML5" ></img>

                </div>
            </div>
        </div>
    )
}

export default BBB
