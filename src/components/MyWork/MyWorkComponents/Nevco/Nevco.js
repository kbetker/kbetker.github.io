import React, { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import "./Nevco.css"
import { myWorkFunc } from "../../../store/myWork";
import { blender_png, afterEffects_png, photoshop_png, audacity_png, premiere_png, illustrator_png } from "../../ImageExport"



function Nevco() {
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
            <div className="nevcoPreview previewHide" ref={preview}>
                <div className="close_X" id="close_X">X</div>
                <div className="JFContent">
                    <iframe className="nevco_iFrame" src="https://www.youtube.com/embed/OfALn2ZcInk" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"  style={{borderTopLeftRadius: "20px", borderTopRightRadius: "20px"}} allowFullScreen></iframe>
                </div>
                <h2>Nevco</h2>
                <div className="nevcoText">
                     Wait... Is that really how I sound? Nevco is the largest privately-held scoreboard manufacturer in the world and they requested a video showcasing their various models and upgrades. I believe this is the second or possibly third draft? It's definitely before it was sent off for a professional voice over&#40;hence my voice that I'd swear doesn't sound like me&#41; Unfortunately, I was unable to obtain a final version, but I still thought this is a good piece to show my photo, video, and 3d editing capabilities.
                </div>

                <div className="preview_skills">
                    <img className="preview_skill" src={afterEffects_png} alt="JavaScript"></img>
                    <img className="preview_skill" src={premiere_png} alt="React"></img>
                    <img className="preview_skill" src={photoshop_png} alt="Redux"></img>
                    <img className="preview_skill" src={blender_png} alt="Sequelize"></img>
                    <img className="preview_skill" src={audacity_png} alt="HTML5" ></img>
                    <img className="preview_skill" src={illustrator_png} alt="HTML5" ></img>
                </div>

            </div>

        </div>
    )
}

export default Nevco
