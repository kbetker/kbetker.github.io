import './App.css';
import { useEffect, useState } from 'react';

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

  let count = 1;


  const waitAMoment = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

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
    }, 1500);
  }


// const startTitles = () => {
//   setTimeout(async () => {
//     changeTitle()
//     count === titlesArray.length - 1 ? count = 0 : count++;
//   }, 1500);
// }


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



  return (
    <div className="wrapper">

      <div className="homeText">
        <div className="homeText-el">Hi, my name is <span className="highlightColor">Kevin Betker</span>.</div>
        <div className="homeText-el">I am <span className="highlightColor">{title}</span> <span style={{ opacity: `${opacity}` }}>|</span></div>
        <div className="homeText-el reference"> - name here</div>
      </div>

    </div>
  );
}

export default App;
