import './App.css';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { useDispatch, useSelector } from "react-redux"
// import { pageNumFunc } from './components/store/pageNum';


function App() {
  const titlesArray = [
    "a Fullstack Developer",
    "a Graphic Designer",
    "a Silly Father",
    "an Animator",
    "a Photographer",
    "a Musician",
    "a Videographer",
    "a Dungeon Master",
    "Seeking Employment!!"
  ]


  const [title, setTitle] = useState(titlesArray[0])
  const [opacity, setOpacity] = useState(1)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [page, setPage] = useState('')
  const dispatch = useDispatch();
  const pageNum = useSelector(state => state.pageNum)

  let count = 1;

  useEffect(()=>{
    console.log(pageNum)
  }, [pageNum])

  const waitAMoment = (milliseconds) => { return new Promise(resolve => setTimeout(resolve, milliseconds)) }

  const clearTitle = async (currTitle) => {
    while (currTitle.length) {
      await waitAMoment(30)
      let tempTitle = currTitle.slice(0, currTitle.length - 1)
      currTitle = tempTitle
      setTitle(currTitle)
    }

    setTimeout(async () => {
      changeTitle()
    }, 500);

  }


  const changeTitle = async () => {
    let currTitle = titlesArray[count];
    count === titlesArray.length - 1 ? count = 0 : count++;
    for (const char of currTitle) {
      await waitAMoment(30)
      setTitle(prev => prev + char)
    }

    setTimeout(async () => {
      clearTitle(currTitle)
    }, 3000);
  }

  // clears title first time, then gets the loop rolling
  useEffect(() => {
    setTimeout(async () => {
      clearTitle("a Fullstack Developer")
    }, 3000);
  }, [])



  useEffect(() => {
    let blink = setInterval(() => {
      if (opacity === 1) {
        setOpacity(0)
      } else if (opacity === 0) {
        setOpacity(1)
      }
      clearInterval(blink)
    }, 500)
  }, [opacity])


  window.addEventListener("resize", (e) => {
    setWindowWidth(window.innerWidth)
    // changeSceneFunc("none")
  })

  function goToPage(page) {
    let currentDiv = document.getElementById(page)
    if (currentDiv) {
        currentDiv.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })
    }
}

useEffect(()=>{
  goToPage(pageNum)
  console.log(pageNum)
}, [pageNum])


  return (
    <div className="wrapper">

      <Navbar />



      <div className="content_container">
        <div className="pages"  style={{ width: `${windowWidth}px` }}>
        <div className="page" style={{ width: `${windowWidth * 4}px`, backgroundColor: "#444444" }}>

          <div className="homeText" style={{ width: `${window.innerWidth}px` }} id="page-1" >
            <div>** UNDER CONSTRUCTION **</div>
            <div>Hi, my name is <span className="highlightColor">Kevin Betker</span>.</div>
            <div>I am <span className="highlightColor">{title}</span> <span style={{ opacity: `${opacity}` }}>|</span></div>
            <div className="reference"> - name here</div>
          </div>

          <div className="homeText" style={{ width: `${window.innerWidth}px` }} id="page-2" >
           <div>** UNDER CONSTRUCTION 2**</div>
          </div>

          <div className="homeText" style={{ width: `${window.innerWidth}px` }} id="page-3" >
           <div>** UNDER CONSTRUCTION 3**</div>
          </div>

          <div className="homeText" style={{ width: `${window.innerWidth}px` }} id="page-4" >
             <div>** UNDER CONSTRUCTION 4 **</div>
          </div>

          </div>
        </div>
      </div>




      <div className="header"> footer actually</div>
    </div>
  );
}

export default App;
