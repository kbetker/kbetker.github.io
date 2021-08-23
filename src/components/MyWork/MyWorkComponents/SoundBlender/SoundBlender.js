import React, { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import "../../MyWork.css"
import { myWorkFunc } from "../../../store/myWork";



function SoundBlender(){
    // let darkBackground = document.getElementById("darkBackground")
    // let preview = document.getElementById("preview")
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
        <div className="darkBackground transparent" onClick={(e)=> closePage(e)} ref={darkBackground} id="close-background">
            <div className="preview previewHide" ref={preview}>
            <div className="close_X" id="close_X">X</div>
            SoundBlender
            </div>
        </div>
    )
}

export default SoundBlender
