import React, { useState, useEffect } from 'react'
import { GameBoardPiece } from './svgs/v2/GameBoardPiece.js'
import GameBulletin from './components/GameBulletin'
import Modal from './components/Modal'
import GameOverModal from './components/GameOverModal'

import limeAudio from './audio/FirstNote.mp3'
import redAudio from './audio/SecondNote.mp3'
import yellowAudio from './audio/ThirdNote.mp3'
import blueAudio from './audio/FourthNote.mp3'
import incorrectAudio from './audio/Incorrect.wav'

import { useWatchModeValues } from './hooks/v2/useWatchModeValues'

import isEqual from 'lodash.isequal'
import {debounce} from './lib/debounce'

import styles from './styles/GameContainer.module.css'


export default function GameContainer(){
  
  let initialLightUpArray = ["red", "lime", "yellow", "blue"]
  
  const [modeEnum, setModeEnum] = useState(() => "IDLE")
  const [lightUpArray, setLightUpArray] = useState(() => initialLightUpArray)
  const [playArray, setPlayArray] = useState(() => []);
  const [level, setLevel] = useState(() => 1);
  const [index, setIndex] = useState(() => -1)
  const [windowWidth, setWindowWidth] = useState(() => window.innerWidth)
  
  const [red, setRed] = useWatchModeValues('red', redAudio, modeEnum)
  const [blue, setBlue] = useWatchModeValues('blue', blueAudio, modeEnum)
  const [lime, setLime] = useWatchModeValues('lime', limeAudio, modeEnum)
  const [yellow, setYellow] = useWatchModeValues('yellow', yellowAudio, modeEnum)
  const incorrectSound = new Audio(incorrectAudio)

  let dimensionUpdater = debounce(() => {
      setWindowWidth(window.innerWidth)
    }, 200 
  )

  function resetGame(){
    setModeEnum("WATCH")
  }
  
  useEffect(() => {
    window.addEventListener('resize', dimensionUpdater)

    return function cleanup() {
      window.removeEventListener('resize', dimensionUpdater)
    }
    
  }, [])
  
  // GAME OVER
  useEffect(() => {
    if (modeEnum === "GAME OVER") {
      incorrectSound.play()
      setIndex(-1)
      setLightUpArray(initialLightUpArray)
      setPlayArray([])
      setLevel(1);
    }
  }, [modeEnum])

  // PLAY MODE

  useEffect(() => {
    let timeoutId
    if ((modeEnum === "PLAY") && (playArray.length !== 0) && (index < lightUpArray.length)) {
      if (playArray[index] !== lightUpArray[index]) {
        timeoutId = setTimeout(function(){
            setModeEnum("GAME OVER")
            }, 300)
      } else if (isEqual(playArray, lightUpArray)) {   
            timeoutId = setTimeout(function() {
                setLevel(level => ++level)
                setIndex(-1)
                setModeEnum("WATCH") 
                setLightUpArray(curr => [...curr, initialLightUpArray[Math.floor(Math.random() * 5)]])
                setPlayArray([])

            }, 200)
      }

      return function cleanup(){
        clearTimeout(timeoutId)
      }
}
  }, [playArray, lightUpArray, index, modeEnum])

  useEffect(() => {
    let timeoutId;
    let intervalId;
    
    function pauseBetween(resolve) {
      timeoutId = setTimeout(resolve, 1000);
    }
  
    function* generator() {
      let i = 0;
      while (lightUpArray.length !== i) {
        if (lightUpArray[i] === 'red') {
          setRed(color => ({...color, lightUp: true, sound: true }));
          
          yield;

          setRed(color => ({...color, lightUp: false, sound: false }));
          yield new Promise(resolve => pauseBetween(resolve));
        }
        if (lightUpArray[i] === 'lime') {
          setLime(color => ({...color, lightUp: true, sound: true }));

          yield;

          setLime(color => ({...color, lightUp: false, sound: false }));
          yield new Promise(resolve => pauseBetween(resolve));
        }
        if (lightUpArray[i] === 'blue') {
          setBlue(color => ({...color, lightUp: true, sound: true }));

            yield;

          setBlue(color => ({...color, lightUp: false, sound: false }));
          yield new Promise(resolve => pauseBetween(resolve));
        }
        if (lightUpArray[i] === 'yellow') {
          setYellow(color => ({...color, lightUp: true, sound: true }));

          yield;

          setYellow(color => ({...color, lightUp: false, sound: false }));
          yield new Promise(resolve => pauseBetween(resolve));
        }
        i++;
      }
    }

    // WATCH MODE
  if (modeEnum === "WATCH") {
    const iterable = generator(lightUpArray);
    var next;
    intervalId = setInterval(function run() {
      next = iterable.next();
      if (next.done) {
        clearInterval(intervalId);
        setModeEnum("PLAY")
      }
    }, 500);
  }
  
    return function cleanup () {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [lightUpArray, modeEnum]);



  return (

            <div className={styles["game-top"]}>
              <div className={styles["bulletin-container"]}>
                <GameBulletin
                  levelNumber={level}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ position: "relative" }}>
                  <GameBoardPiece
                    modeEnum={modeEnum}
                    lightUp={lime.lightUp}
                    transform={{transform: "rotate(0deg)"}}
                    fill={"lime"}
                    handleColorSetter={setLime}
                    setPlayArray={setPlayArray}
                    setIndex={setIndex}
                    windowWidth={windowWidth}
                  />
                  <GameBoardPiece
                    modeEnum={modeEnum}
                    lightUp={red.lightUp}
                    transform={{transform: "rotate(90deg)"}}
                    fill={"red"}
                    handleColorSetter={setRed}
                    setPlayArray={setPlayArray}
                    setIndex={setIndex}
                    windowWidth={windowWidth}
                  />
                  <br />
                  <div
                    onClick={modeEnum === 'GAME OVER' ? () => setModeEnum('IDLE') : () => setModeEnum("WATCH")}
                    className={styles["start-button-container"]}
                  >
                    {modeEnum === "IDLE" ? <span className={styles['start-button']}>START</span> : null}
                    {modeEnum === "GAME OVER" ? <span className={styles['start-button']}>GAME OVER</span> : null}
                  </div>
                  <GameBoardPiece
                    modeEnum={modeEnum}
                    lightUp={yellow.lightUp}
                    transform={{transform: "rotate(270deg)"}}
                    fill={"yellow"}
                    handleColorSetter={setYellow}
                    setPlayArray={setPlayArray}
                    setIndex={setIndex}
                    windowWidth={windowWidth}
                  />
                  <GameBoardPiece
                    modeEnum={modeEnum}
                    lightUp={blue.lightUp}
                    
                    transform={{transform: "rotate(180deg)"}}
                    fill={"blue"}
                    handleColorSetter={setBlue}
                    setPlayArray={setPlayArray}
                    setIndex={setIndex}
                    windowWidth={windowWidth}
                  />
                </div>
                <Modal
                overlayClickable={true}
                open={modeEnum === "GAME OVER"}
                children={<GameOverModal resetGame={resetGame} levelNumber={level} />}
                onClose={resetGame}
              />
                </div>
                </div>

  )
}