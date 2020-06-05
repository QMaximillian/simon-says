import React, { useState, useEffect } from 'react'
import { GameBoardPieceGenerator } from './svgs/v2/GameBoardPieceGenerator.js'
import limeAudio from './audio/FirstNote.mp3'
import redAudio from './audio/SecondNote.mp3'
import yellowAudio from './audio/ThirdNote.mp3'
import blueAudio from './audio/FourthNote.mp3'
import isEqual from 'lodash.isequal'
import { useWatchModeValues } from './hooks/v2/useWatchModeValues'
import styles from './styles/GameContainer.module.css'

function useLogValue(value, name = value, deps = value) {
  useEffect(() => {
    console.log(`${name}`, value)
  }, [deps])
}



export function GameContainerGenerator(){
  
  let initialLightUpArray = ["red", 
"lime", "yellow", "blue"]
  
  const [modeEnum, setModeEnum] = useState(() => "IDLE")
  const [lightUpArray, setLightUpArray] = useState(() => initialLightUpArray)
  const [playArray, setPlayArray] = useState(() => []);
  const [level, setLevel] = useState(() => 1);
  const [index, setIndex] = useState(() => -1)
  
  const [red, setRed] = useWatchModeValues('red', redAudio, modeEnum)
  const [blue, setBlue] = useWatchModeValues('blue', blueAudio, modeEnum)
  const [lime, setLime] = useWatchModeValues('lime', limeAudio, modeEnum)
  const [yellow, setYellow] = useWatchModeValues('yellow', yellowAudio, modeEnum)
  console.log('here', 'here')
  useLogValue(modeEnum)
  // useLogValue(index)
  // useLogValue(playArray[index], 'playArrayVal', playArray)
  // useLogValue(lightUpArray[index], 'lightUpArrayVal', lightUpArray )

  // IDLE
  // useEffect(() => {
  //   if (modeEnum === "IDLE") {
      
  //   }
  // }, [modeEnum])

  // GAME OVER
  useEffect(() => {
    if (modeEnum === "GAME OVER") {
      setIndex(-1)
      setLightUpArray(initialLightUpArray)
      setPlayArray([])
    }
  }, [modeEnum])

  // PLAY

  useEffect(() => {
    let timeoutId
    if ((modeEnum === "PLAY") && (playArray.length !== 0) && (index < lightUpArray.length)) {
      console.log('playArrayIndex', playArray[index])
      console.log('lightUpArrayIndex', lightUpArray[index])
      if (playArray[index] !== lightUpArray[index]) {
        new Promise(function(resolve) {
        timeoutId = setTimeout(function(){
            setModeEnum("GAME OVER")
            resolve()
            }, 300)
          })
      } else if (isEqual(playArray, lightUpArray)) {
        setLevel(level => ++level)
        setIndex(-1)
        setModeEnum("WATCH") 
        setLightUpArray(curr => [...curr, initialLightUpArray[Math.floor(Math.random() * 5)]])
        setPlayArray([])
      }
}
  }, [playArray, lightUpArray, index, modeEnum])

  // useEffect(() => {
  //   let timeoutId
  //   if (isEqual(playArray, lightUpArray) && modeEnum === "PLAY") {
  //     console.log('here')
         
  //   }

  //   return () => clearTimeout(timeoutId)
  // }, [playArray, lightUpArray])

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
          // console.log(`redOn`);
          yield;
          // console.log(`redOff`);
          setRed(color => ({...color, lightUp: false, sound: false }));
          yield new Promise(resolve => pauseBetween(resolve));
        }
        if (lightUpArray[i] === 'lime') {
          setLime(color => ({...color, lightUp: true, sound: true }));
          // console.log(`limeOn`);
          yield;
          // console.log(`limeOff`);
          setLime(color => ({...color, lightUp: false, sound: false }));
          yield new Promise(resolve => pauseBetween(resolve));
        }
        if (lightUpArray[i] === 'blue') {
          setBlue(color => ({...color, lightUp: true, sound: true }));
          // console.log(`blueOn`);
          yield;
          // console.log(`blueOff`);
          setBlue(color => ({...color, lightUp: false, sound: false }));
          yield new Promise(resolve => pauseBetween(resolve));
        }
        if (lightUpArray[i] === 'yellow') {
          setYellow(color => ({...color, lightUp: true, sound: true }));
          // console.log(`yellowOn`);
          yield;
          // console.log(`yellowOff`);
          setYellow(color => ({...color, lightUp: false, sound: false }));
          yield new Promise(resolve => pauseBetween(resolve));
        }
        i++;
      }
    }

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
  
    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [lightUpArray, modeEnum]);



  return (

            <div className={styles["game-top"]}>
              <div className={styles["bulletin-container"]}>
                {level}
                {/* <GameBulletin
                  levelUp={levelUp}
                  levelNumber={levelNumber}
                  fade={fade}
                  gameOver={gameOver}
                  resetGame={resetGame}
                  duration={fasterDuration}
                  setShowFasterAnimation={setShowFasterAnimation}
                  showFasterAnimation={showFasterAnimation}
                /> */}
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ position: "relative" }}>
                  <GameBoardPieceGenerator
                    modeEnum={modeEnum}
                    lightUp={lime.lightUp}
                    
                    transform={"rotate(0deg)"}
                    dataId={"1"}
                    fill={"lime"}
                    handleColorSetter={setLime}
                    setPlayArray={setPlayArray}
                    setIndex={setIndex}
                    // toggle={limeToggle}

                    // // handleClick={handleClick}
                    // // windowWidth={windowWidth}

                  />
                  <GameBoardPieceGenerator
                    modeEnum={modeEnum}
                    lightUp={red.lightUp}
                    
                    transform={"rotate(90deg)"}
                    dataId={"2"}
                    fill={"red"}
                    handleColorSetter={setRed}
                    setPlayArray={setPlayArray}
                    setIndex={setIndex}

                    // toggle={redToggle}

                    // // handleClick={handleClick}
                    // // windowWidth={windowWidth}

                  />
                  <br />
                  <div
                    onClick={modeEnum === 'GAME OVER' ? () => setModeEnum('IDLE') : () => setModeEnum("WATCH")}
                    className={styles["start-button"]}
                  >
                    {modeEnum === "IDLE" ? "START" : null}
                    {modeEnum === "GAME OVER" ? "GAME OVER" : null}
                  </div>
                  <GameBoardPieceGenerator
                    modeEnum={modeEnum}
                    lightUp={yellow.lightUp}
                    transform={"rotate(270deg)"}
                    dataId={"3"}
                    fill={"yellow"}
                    handleColorSetter={setYellow}
                    setPlayArray={setPlayArray}
                    setIndex={setIndex}

                    // toggle={yellowToggle}
                    // // handleClick={handleClick}
                    // // windowWidth={windowWidth}

                  />
                  <GameBoardPieceGenerator
                    modeEnum={modeEnum}
                    lightUp={blue.lightUp}
                    
                    transform={"rotate(180deg)"}
                    dataId={"4"}
                    fill={"blue"}
                    handleColorSetter={setBlue}
                    setPlayArray={setPlayArray}
                    setIndex={setIndex}


                    // toggle={blueToggle}
                    // // handleClick={handleClick}
                    // // windowWidth={windowWidth}


                  />
                </div>
                </div>
                </div>

  )
}