import React, { useState, useEffect } from 'react'
import { GameBoardPieceGenerator } from './svgs/v2/GameBoardPieceGenerator.js'
import greenAudio from './audio/FirstNote.mp3'
import redAudio from './audio/SecondNote.mp3'
import yellowAudio from './audio/ThirdNote.mp3'
import blueAudio from './audio/FourthNote.mp3'
import isEqual from 'lodash.isequal'
import { useWatchModeValues } from './hooks/v2/useWatchModeValues'
import styles from './styles/GameContainer.module.css'



export function GameContainerGenerator(){
  const [isWatchMode, setIsWatchMode] = useState(false)
  const [isPlayMode, setIsPlayMode] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  const [lightUpArray, _] = useState(["red", "blue", "red", "blue"]);
  
  const [red, setRed, redSound] = useWatchModeValues('red', redAudio, isWatchMode)
  const [blue, setBlue, blueSound] = useWatchModeValues('blue', blueAudio, isWatchMode)
  const [green, setGreen, greenSound] = useWatchModeValues('green', greenAudio, isWatchMode)
  const [yellow, setYellow, yellowSound] = useWatchModeValues('yellow', yellowAudio, isWatchMode)

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
          setRed({ lightUp: true, sound: true });
          console.log(`redOn`);
          yield;
          console.log(`redOff`);
          setRed({ lightUp: false, sound: false });
          yield new Promise(resolve => pauseBetween(resolve));
        }
        if (lightUpArray[i] === 'green') {
          setGreen({ lightUp: true, sound: true });
          console.log(`greenOn`);
          yield;
          console.log(`greenOff`);
          setGreen({ lightUp: false, sound: false });
          yield new Promise(resolve => pauseBetween(resolve));
        }
        if (lightUpArray[i] === 'blue') {
          setBlue({ lightUp: true, sound: true });
          console.log(`blueOn`);
          yield;
          console.log(`blueOff`);
          setBlue({ lightUp: false, sound: false });
          yield new Promise(resolve => pauseBetween(resolve));
        }
        if (lightUpArray[i] === 'yellow') {
          setYellow({ lightUp: true, sound: true });
          console.log(`yellowOn`);
          yield;
          console.log(`yellowOff`);
          setYellow({ lightUp: false, sound: false });
          yield new Promise(resolve => pauseBetween(resolve));
        }
        i++;
      }
    }

  if (isWatchMode) {
    const iterable = generator(lightUpArray);
    var next;
    intervalId = setInterval(function run() {
      next = iterable.next();
      if (next.done) {
        clearInterval(intervalId);
      }
    }, 1000);
  }
  
    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [lightUpArray, isWatchMode]);

  useEffect(() => {
    // 1. When an item is added to the clickActionArray,
    // check to make sure the indexes of the lightUpArray and clickActionArray match
    // 2. If they don't gameOver
    // 4. Choose one of the four colors randomly and add it to the lightUpArray
    // 5. Clear the clickActionArray
  })

  useEffect(() => {
    // 2.If the length of the lightUpArray and the clickAction array match, and all of the values are the same, 
    // level up
  })

  return (

            <div className={styles["game-top"]}>
              <div className={styles["bulletin-container"]}>
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
                    isWatchMode={isWatchMode}
                    lightUp={green.lightUp}
                    isPlayMode={isPlayMode}
                    transform={"rotate(0deg)"}
                    dataId={"1"}
                    fill={"lime"}
                    // toggle={greenToggle}

                    // // handleClick={handleClick}
                    // // windowWidth={windowWidth}

                  />
                  <GameBoardPieceGenerator
                    isWatchMode={isWatchMode}
                    lightUp={red.lightUp}
                    isPlayMode={isPlayMode}
                    transform={"rotate(90deg)"}
                    dataId={"2"}
                    fill={"red"}
                    // toggle={redToggle}

                    // // handleClick={handleClick}
                    // // windowWidth={windowWidth}

                  />
                  <br />
                  <div
                    onClick={() => setIsWatchMode(true)}
                    className={styles["start-button"]}
                  >
                    {!isWatchMode && !isPlayMode && !isGameOver ? "START" : null}
                  </div>
                  <GameBoardPieceGenerator
                    isWatchMode={isWatchMode}
                    lightUp={yellow.lightUp}
                    isPlayMode={isPlayMode}
                    transform={"rotate(270deg)"}
                    dataId={"3"}
                    fill={"yellow"}
                    // toggle={yellowToggle}
                    // // handleClick={handleClick}
                    // // windowWidth={windowWidth}

                  />
                  <GameBoardPieceGenerator
                    isWatchMode={isWatchMode}

                    lightUp={blue.lightUp}
                    isPlayMode={isPlayMode}
                    transform={"rotate(180deg)"}
                    dataId={"4"}
                    fill={"blue"}

                    // toggle={blueToggle}
                    // // handleClick={handleClick}
                    // // windowWidth={windowWidth}


                  />
                </div>
                </div>
                </div>

  )
}