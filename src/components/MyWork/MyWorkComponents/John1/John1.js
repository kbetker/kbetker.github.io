import React, { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import "./John1.css"
import { myWorkFunc } from "../../../store/myWork";



function John1(){
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
            John 1
            </div>
        </div>
    )
}

export default John1
