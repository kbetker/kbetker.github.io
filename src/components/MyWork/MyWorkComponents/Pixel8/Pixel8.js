import React, { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import "./Pixel8.css"
import { myWorkFunc } from "../../../store/myWork";
import pixel8_1 from "./pixel8_preview.jpg"
import pixel8_2 from "./pixel8_preview2.jpg"
import pixel8_3 from "./pixel8_preview3.jpg"




function Pixel8(){
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
        <div className="darkBackground transparent" onClick={(e) => closePage(e)} ref={darkBackground} id="close-background">
        <div className="pixel8Preview previewHide" ref={preview}>
            <div className="close_X" id="close_X">X</div>

                <div className="pixel8Images">
                    <div className="pixel8LeftImage">
                        <img src={pixel8_1} className="pixel8_mainImg"></img>
                        </div>
                    <div className="pixel8RightImages">
                        <img src={pixel8_3} className="pixel8TopRight"></img>
                        <img src={pixel8_2}></img>
                    </div>
                </div>


                <div>

                    <h2>pixel8</h2>
                    <div className="pixel8_text">
                    <p>
                        pixel8 is a skdf ladsnf ndsla lfsdf f afsd sadfm dsmfl mdsfm sdamf ;lmsadlf ndsanf lkndslfn ldsank fndksankl cmldmskfnkj ndsnf sdkcodskjnfn kdsjaf nd,snfkln dscnds nc ,dslaf ndskfnm, dsnfndsanfdsnf
                    </p>
                    <a href="https://pixel8.herokuapp.com/" className="link" target="_blank">pixel8.com</a>
                    </div>
                </div>




        </div>
    </div>
    )
}

export default Pixel8
