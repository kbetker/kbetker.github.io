import React from "react"
import "./Footer.css"
import gitHub from "./images/gitHubLogo.png"
import linkedIn from "./images/linkedin.png"
import angelList from "./images/angelList.png"

function Footer(){
    return(
        <div className="footer">
            <a href="https://github.com/kbetker/kbetker.github.io" target="_blank"><img src={gitHub} className="footerImage" ></img></a>
            <a href="https://www.linkedin.com/in/kevin-betker-878505128/" target="_blank"><img src={linkedIn} className="footerImage" ></img></a>
            <a href="https://angel.co/u/kevin-betker" target="_blank"><img src={angelList} className="footerImage" ></img></a>
        </div>

    )
}

export default Footer
