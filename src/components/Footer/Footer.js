import React from "react"
import "./Footer.css"
import gitHub from "./images/gitHubLogo.png"
import linkedIn from "./images/linkedin.png"
import angelList from "./images/angelList.png"

function Footer(){
    return(
        <div className="footer">
            <a href="https://github.com/kbetker" target="_blank" rel="noreferrer"><img src={gitHub} className="footerImage" alt="GitHub" ></img></a>
            <a href="https://www.linkedin.com/in/kevin-betker-878505128/" target="_blank" rel="noreferrer"><img src={linkedIn} className="footerImage" alt="LinkedIn" ></img></a>
            <a href="https://angel.co/u/kevin-betker" target="_blank" rel="noreferrer"><img src={angelList} className="footerImage" alt="Angel List" ></img></a>
        </div>

    )
}

export default Footer
