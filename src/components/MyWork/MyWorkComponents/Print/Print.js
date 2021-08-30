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
                            <img src={print1} className="sb_mainImg"></img>
                            </div>
                        <div className="printRightImages">
                            <img src={print2} className="printTopRight"></img>
                            <img src={print3}></img>
                        </div>
                    </div>


                    <div>
                        <h2>Print Materials</h2>
                        <div className="sb_text">
                        <p>
                            print allows users to upload audio files to create soundscapes for roleplaying games or any type of interactive story telling. print offers plenty of options to organize and customize sounds to optimize the user's experience. Users can interact with the sounds using the app's built-in buttons and sliders or even connect to an external MIDI device for precision control.
                        </p>
                        <a href="https://print.herokuapp.com/" className="link" target="_blank"> Click here to view the site live =&gt; SoundBlender.com</a>
                        </div>
                    </div>


            </div>
        </div>
    )
}

export default Print
