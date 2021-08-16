import './App.css';
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux"
// import { pageNumFunc } from './components/store/pageNum';
import Navbar from './components/Navbar';
import Home from './components/Home';
import MyWork from './components/MyWork/MyWork';
import SoundBlender from './components/MyWork/MyWorkComponents/SoundBlender';
import Contact from './components/Contact';


function App() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const pageNum = useSelector(state => state.pageNum)
    const myWork = useSelector(state => state.myWork)
    const [pageOffset, setPageOffset] = useState(0)
    window.addEventListener("resize", (e) => {
        setWindowWidth(window.innerWidth)
    })

    useEffect(() => {
        setPageOffset((pageNum[5] - 1) * windowWidth)
    }, [pageNum, windowWidth])


    return (
        <div className="wrapper">
        {myWork === "soundblender" && <SoundBlender />}

            <Navbar />
            <div className="content_container">
                <div className="pages" style={{ width: `${windowWidth}px` }}>
                    <div className="page" style={{ width: `${windowWidth * 4}px`, left: `-${pageOffset}px` }}>
                        <Home />
                        <MyWork />

                        <div className="page_element" style={{ width: `${window.innerWidth}px` }} id="page-3" >
                            <div>** UNDER CONSTRUCTION 3**</div>
                        </div>

                       <Contact />

                    </div>
                </div>
            </div>

            <div className="footer"></div>
        </div>
    );
}

export default App;
