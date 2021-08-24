import React, { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import "./AirDnD.css"
import { myWorkFunc } from "../../../store/myWork";
import airDnd_1 from "./airdDnD_preview.jpg"
import airDnd_2 from "./airdDnD_preview2.jpg"
import airDnd_3 from "./airdDnD_preview3.jpg"




function AirDnD(){
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
            <div className="airDnDPreview previewHide" ref={preview}>
                <div className="close_X" id="close_X">X</div>

                    <div className="airDnDImages">
                        <div className="airDnDLeftImage">
                            <img src={airDnd_1} className="airDnd_mainImg"></img>
                            </div>
                        <div className="airDnDRightImages">
                            <img src={airDnd_3} className="airDnDTopRight"></img>
                            <img src={airDnd_2}></img>
                        </div>
                    </div>


                    <div>

                        <h2>airDnD</h2>
                        <div className="airDnd_text">
                        <p>
                            airDnD is a skdf ladsnf ndsla lfsdf f afsd sadfm dsmfl mdsfm sdamf ;lmsadlf ndsanf lkndslfn ldsank fndksankl cmldmskfnkj ndsnf sdkcodskjnfn kdsjaf nd,snfkln dscnds nc ,dslaf ndskfnm, dsnfndsanfdsnf
                        </p>
                        <a href="https://airDnD.herokuapp.com/" className="link" target="_blank">airDnD.com</a>
                        </div>
                    </div>




            </div>
        </div>
    )
}

export default AirDnD
