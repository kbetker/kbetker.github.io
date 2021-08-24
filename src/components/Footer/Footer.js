import React from "react"
import "./Footer.css"
import gitHub from "./images/gitHubLogo.png"
import linkedIn from "./images/linkedin.png"

function Footer(){
    return(
        <div className="footer">
            <a href="www.google.com" target="_blank"><img src={gitHub} className="footerImage" ></img></a>
            <a href="www.google.com" target="_blank"><img src={linkedIn} className="footerImage" ></img></a>
        </div>

    )
}

export default Footer
