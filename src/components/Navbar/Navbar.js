import React, { useState } from "react"
import "./Navbar.css"
import { useDispatch, useSelector } from "react-redux"
import { pageNumFunc } from "../store/pageNum"


function Navbar() {
    const dispatch = useDispatch()
    return (

      <div className="header">
      <div>logo?</div>
      <div className="navbar">
        <div className="navbar_element" onClick={()=> dispatch(pageNumFunc("page-1"))}>Home</div>
        <div>|</div>
        <div className="navbar_element"  onClick={() => dispatch(pageNumFunc("page-2"))}>My Work</div>
        <div>|</div>
        <div className="navbar_element"  onClick={()=> dispatch(pageNumFunc("page-3"))}>About</div>
        <div>|</div>
        <div className="navbar_element"  onClick={()=> dispatch(pageNumFunc("page-4"))}>Contact</div>
      </div>
    </div>
    )
}
export default Navbar
