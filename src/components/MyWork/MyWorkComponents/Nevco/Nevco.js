import React, { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import "./Nevco.css"
import { myWorkFunc } from "../../../store/myWork";



function Nevco(){
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
            <iframe width="560" height="315" src="https://www.youtube.com/embed/OfALn2ZcInk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </div>
    )
}

export default Nevco
