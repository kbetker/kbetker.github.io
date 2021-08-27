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
                        <h2>Pixel8</h2>
                        <div className="airDnd_text">
                        <p>
                        Pixel8 is a full stack application designed for all game-related articles, where you can read reviews, opinions, walkthroughs, and receive news about the latest and greatest in the gaming world. Read all about upcoming games and honest reviews by users that will help you decide if you would like to buy your next game!
                        </p>
                        <a href="https://bestpixel8.herokuapp.com/" className="link" target="_blank"> Click here to view the site live =&gt; bestpixel8.herokuapp.com</a>
                        </div>
                    </div>




        </div>
    </div>
    )
}

export default Pixel8
