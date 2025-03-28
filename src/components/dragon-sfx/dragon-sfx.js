import React from "react";
import crankyLoud from './mp3s/cranky-loud.mp3'
import cranky from './mp3s/cranky.mp3'
import lightGrowl from './mp3s/light-growl.mp3'
import nuzzle1 from './mp3s/nuzzle-1.mp3'
import nuzzle2 from './mp3s/nuzzle-2.mp3'
import nuzzle3 from './mp3s/nuzzle-3.mp3'
import snort from './mp3s/snort.mp3'
 import './dragon-sfx.css'
import { useRef } from "react";

const DragonSfx = () => {
const CrankyLoud =  useRef(null)
const Cranky =  useRef(null)
const LightGrowl =  useRef(null)
const Nuzzle1 =  useRef(null)
const Nuzzle2 =  useRef(null)
const Nuzzle3 =  useRef(null)
const Snort =  useRef(null)

    return <div className="dragon-sfx-container">
        <audio ref={CrankyLoud}><source src={crankyLoud} type="audio/mpeg" /></audio>
        <audio ref={Cranky}><source src={cranky} type="audio/mpeg" /></audio>
        <audio ref={LightGrowl}><source src={lightGrowl} type="audio/mpeg" /></audio>
        <audio ref={Nuzzle1}><source src={nuzzle1} type="audio/mpeg" /></audio>
        <audio ref={Nuzzle2}><source src={nuzzle2} type="audio/mpeg" /></audio>
        <audio ref={Nuzzle3}><source src={nuzzle3} type="audio/mpeg" /></audio>
        <audio ref={Snort}><source src={snort} type="audio/mpeg" /></audio>

        <button onClick={()=> CrankyLoud?.current?.play()}>Cranky Loud</button>
        <button onClick={()=> Cranky?.current?.play()}>Cranky</button>
        <button onClick={()=> LightGrowl?.current?.play()}>Light Growl</button>
        <button onClick={()=> Nuzzle1?.current?.play()}>Nuzzle1</button>
        <button onClick={()=> Nuzzle2?.current?.play()}>Nuzzle2</button>
        <button onClick={()=> Nuzzle3?.current?.play()}>Nuzzle3</button>
        <button onClick={()=> Snort?.current?.play()}>Snort</button>
    </div>
}

export default DragonSfx
