import React from "react"
import "./Navbar.css"
import { useDispatch } from "react-redux"
import { pageNumFunc } from "../store/pageNum"


function Navbar() {
    const dispatch = useDispatch()
    return (

      <div className="header">
      <div className="construction"></div>
      <div className="navbar">
        <div className="navbar_element" onClick={()=> dispatch(pageNumFunc("page-1"))}>Home</div>
        <div>|</div>
        <div className="navbar_element"  onClick={() => dispatch(pageNumFunc("page-2"))}>My Work</div>
        <div>|</div>
        {/* <div className="navbar_element"  onClick={()=> dispatch(pageNumFunc("page-3"))}>About</div>
        <div>|</div> */}
        <div className="navbar_element"  onClick={()=> dispatch(pageNumFunc("page-3"))}>Contact</div>
      </div>
    </div>
    )
}
export default Navbar
