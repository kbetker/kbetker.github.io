import './App.css';
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux"
// import { pageNumFunc } from './components/store/pageNum';
import Navbar from './components/Navbar';
import Home from './components/Home';
import MyWork from './components/MyWork/MyWork';
import Contact from './components/Contact';
import SoundBlender from './components/MyWork/MyWorkComponents/SoundBlender';
import JFElectric from './components/MyWork/MyWorkComponents/JFElectric';
import AirDnD from './components/MyWork/MyWorkComponents/AirDnD'
import BBB from './components/MyWork/MyWorkComponents/BBB/BBB';
import Investigation from './components/MyWork/MyWorkComponents/Investigation/Investigation';
import John1 from './components/MyWork/MyWorkComponents/John1/John1';
import Nevco from './components/MyWork/MyWorkComponents/Nevco/Nevco';
import Pixel8 from './components/MyWork/MyWorkComponents/Pixel8/Pixel8';
import Print from './components/MyWork/MyWorkComponents/Print/Print';
import Footer from './components/Footer/Footer';
import anim from "./components/Home/images/animater2.gif"

function App() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const pageNum = useSelector(state => state.pageNum)
    const myWork = useSelector(state => state.myWork)
    const [pageOffset, setPageOffset] = useState(0)
    window.addEventListener("resize", (e) => {
        setWindowWidth(window.innerWidth)
    })
    const isIE = () => {
        if ((navigator.userAgent.indexOf("MSIE") !== -1 ) || (!!document.documentMode === true )) {
        return true
      } else {
          return false
      }
    }

    useEffect(() => {
        setPageOffset((pageNum[5] - 1) * windowWidth)
    }, [pageNum, windowWidth])

    useEffect(()=>{
        if(isIE()){
            alert("This app does not support Internet Explorer.")
        }

    },[])

    return (
        <div className="wrapper">
            {myWork === "soundblender" && <SoundBlender />}
            {myWork === "airdnd" && <AirDnD />}
            {myWork === "pixel8" && <Pixel8 />}
            {myWork === "jfelectric" && <JFElectric />}
            {myWork === "nevco" && <Nevco />}
            {myWork === "john1" && <John1 />}
            {myWork === "investigation" && <Investigation />}
            {myWork === "bbb" && <BBB />}
            {myWork === "print" && <Print />}

            <Navbar />
            <div className="content_container">
                <div className="pages" style={{ width: `${windowWidth}px` }}>
                    {/* windowWidth X the number of pages */}
                    <div className="page" style={{ width: `${windowWidth * 5}px`, left: `-${pageOffset}px` }}>
                        <Home />
                        <MyWork />
                        <Contact />

                        <div className="page_element" style={{ width: `${window.innerWidth}px` }} id="page-4" >
                            <span style={{fontSize: "25px", width: "80%", textAlign: "center"}}>Message sent! Thank you for contacting me! I look forward to speaking with you soon.</span>
                        </div>

                        <div className="page_element" style={{ width: `${window.innerWidth}px` }} id="page-5" >
                            <div className="contactContainer" style={{width: "50px"}}>
                               <img src={anim} style={{width: "50px"}} alt=""></img>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
            <div className="spacer"></div>
        </div>
    );
}

export default App;
