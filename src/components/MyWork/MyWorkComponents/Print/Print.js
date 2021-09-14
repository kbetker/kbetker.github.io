import React, { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import "./Print.css"
import { myWorkFunc } from "../../../store/myWork";
import print1 from "./images/print1.jpg"
import print2 from "./images/print2.jpg"
import print3 from "./images/print3.jpg"



function Print(){
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
        <div className="darkBackground transparent" onClick={(e)=> closePage(e)} ref={darkBackground} id="close">
            <div className="printPreview previewHide" ref={preview}>
                <div className="close_X" id="close_X">X</div>

                <div className="printImages">
                        <div className="printLeftImage">
                            <img src={print1} className="sb_mainImg" alt=""></img>
                            </div>
                        <div className="printRightImages">
                            <img src={print2} className="printTopRight" alt=""></img>
                            <img src={print3} alt=""></img>
                        </div>
                    </div>


                    <div>
                        <h2>Print Materials</h2>
                        <div className="sb_text">
                        <p>
                         In addition to being a fullstack developer, I am also highly experienced with all the necessary publishing tools and have worked closely with printers to create a wide range of printed materials from: business cards, letterheads, and all other types of print collateral - to brochures, trade show booths, and full brand identity.
                        </p>
                        </div>
                    </div>




            </div>
        </div>
    )
}

export default Print
