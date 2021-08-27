import React, { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import "./JFElectric.css"
import { myWorkFunc } from "../../../store/myWork";
import slider from "./slider.jpg"



function JFElectric() {
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
            <div className="JFPreview previewHide" ref={preview}>
                <div className="close_X" id="close_X">X</div>
                <div className="JFContent">
                    <iframe width="800" height="315" src="https://www.youtube.com/embed/VmZPzDeiV_A" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{borderTopLeftRadius: "20px", borderTopRightRadius: "20px"}}></iframe>
                </div>
                <h2>J.F. Electric</h2>
                <div className="JFDescription">
                    <div className="JFText">
                    J.F. Electric is an electrical contractor that provides a wide range of services to many surrounding states. Wanting to install and showcase the installation of solar panels on the roof of a GIANT shed at their main location, I was contacted to produce a video documenting the process. Being new to time-lapse photography, I had to research new softwares and hardware to come up with a solution. I am particularly happy with how my DIY-on-a-budget time-lapse slider turned out. Using a motor designed for telescopic photography&#40;meant to counter the earth's rotation&#41;, simple PVC pipes, and wheels from a pair of unused roller blades, I was able to produce dynamic time-lapse footage.
                    </div>
                    <img src={slider} className="slider"></img>
                </div>
            </div>
        </div>
    )
}

export default JFElectric
