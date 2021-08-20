import React, { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import "./JFElectric.css"
import { myWorkFunc } from "../../../store/myWork";



function JFElectric(){
    const darkBackground = useRef()
    const preview = useRef()

    function closePage(e){
       if(e.target.id === "close"){
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
        <div className="darkBackground transparent" onClick={(e)=> closePage(e)} ref={darkBackground} id="close">
            <div className="preview previewHide" ref={preview}>

            <iframe width="560" height="315" src="https://www.youtube.com/embed/VmZPzDeiV_A" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

            </div>
        </div>
    )
}

export default JFElectric
