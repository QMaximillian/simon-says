import React, { useEffect, useReducer, useState } from 'react';
import { GameBoardPiece } from './svgs/GameBoardPiece.js'
import greenSound from './audio/FirstNote.mp3'
import redSound from './audio/SecondNote.mp3'
import yellowSound from './audio/ThirdNote.mp3'
import blueSound from './audio/FourthNote.mp3'
import GameBulletin from './components/GameBulletin'
import GameOverModal from './components/GameOverModal'
import Modal from './components/Modal'
import wrongSound from './audio/Incorrect.wav'
import BackgroundTransition from './components/BackgroundTransition'
import styles from './GameContainer.module.css'


import {
  playModeReducer,
  NEXT_LEVEL,
  CLICK,
  RESET_LEVEL_UP,
  RESET_GAME_DISPATCH,
  GREEN_ON,
  YELLOW_ON,
  RED_ON,
  BLUE_ON,
  PLAY_MODE,
  WATCH_MODE,
  COLOR_BUTTON_OFF,
  GAME_OVER_TOGGLE,
  RESET_GAME,
  SET_WINDOW_WIDTH,
  SOUND_ON,
  debounce,
  useAudio, 
  initialState
} from "./hooks/gameReducer";





// Eliminate read-only rule in ESLint for adding methods to prototype class

/*eslint no-extend-native: ["error", { "exceptions": ["Array"] }]*/
/*eslint eqeqeq: 0*/


Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length !== array.length)
        return false;

    for (var i = 0, l = this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] !== array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}

// TO-DO

// September 7th, 2019: Update

// 1. Get sound and light up to fire at the same time, combine actions in reducer, useEffect to play the sound in GameContainer
       // a. Create dispatch events that run a COLOR AND SOUND TOGETHER and then COLOR_OFF









function GameContainer(props) {


  const [greenToggle] = useAudio(greenSound)
  const [redToggle] = useAudio(redSound)
  const [blueToggle] = useAudio(blueSound)
  const [yellowToggle] = useAudio(yellowSound)

  const [state, dispatch] = useReducer(playModeReducer, initialState)

  const [intervalTime, setIntervalTime] = useState(500)


  let dimensionUpdater = debounce(function() {
        dispatch({type: SET_WINDOW_WIDTH, value: window.innerWidth})
    })


  React.useLayoutEffect(() => {
    window.addEventListener('resize', dimensionUpdater)

    return function cleanup() {
      window.removeEventListener('resize', dimensionUpdater)
    }
  })

  useEffect(() => {
    const { levelNumber, gameOver } = state
    
    if (levelNumber === 4) {
      setIntervalTime(250)
    } 
    else if (levelNumber === 9) {
      setIntervalTime(100);
    }
    else if (levelNumber === 14) {
      setIntervalTime(50)
    }
    
    if (gameOver) {
      setIntervalTime(500)
    }
  }, [state.levelNumber, state.gameOver])

  useEffect(() => {
    const { gameOver, playMode, watchMode, gameArray, levelNumber, level, index, available } = state
      


    if (watchMode && gameArray.length == 0 && levelNumber == 1){
    } 
    else if (playMode && gameArray.equals(level) && gameArray.length == level.length) {
      dispatch({ type: NEXT_LEVEL })
      dispatch({ type: RESET_LEVEL_UP })
      dispatch({ type: WATCH_MODE })
    } 
    else if (playMode && gameArray[index] != level[index]
    ) {
      const wrong = new Audio(wrongSound)
      wrong.play()
      dispatch({ type: GAME_OVER_TOGGLE })
    }

    if (!gameOver && watchMode && available) {
            dispatchLightUpPatternWithState()
    }
  }, [window.innerWidth, state.gameArray, state.watchMode, state.playMode, state.available, state.levelUp])


  
  function handleClick(number) {
    if (state.watchMode) return
    dispatchClickAction(number)
  }

  function resetGame() {
    dispatch({ type: RESET_GAME, value: initialState })
  }


  function dispatchLightUpPatternWithState() {

    const { level, gameDispatch } = state
      level.forEach((num) => {
        
        gameDispatch.push(
            { type: SOUND_ON, value: getSound(num)},
            { type: getColor(num) },
            { type: COLOR_BUTTON_OFF }
          );
    })

    
      playSeq(gameDispatch)
      dispatch({type: RESET_GAME_DISPATCH})

  }



  function dispatchClickAction(svgId) {
    var dispatchArray = [];

    if (playMode && svgId) {
      dispatchArray.push(
        { type: CLICK, value: svgId },
        { type: getColor(svgId) },
        { type: COLOR_BUTTON_OFF }
      );
    }
    playSeq(dispatchArray, 50);
  }
  

  function getColor(id) {
    switch (true) {
      case id == 1:
        return GREEN_ON
      case id == 2:
        return RED_ON
      case id == 3:
        return YELLOW_ON
      case id == 4:
        return BLUE_ON
      default:
        break;
    }
  }
  
  function getSound(id) {
    switch (true) {
      case id === 1:
        return greenToggle 
      case id === 2:
        return redToggle 
      case id === 3:
        return yellowToggle 
      case id === 4:
        return blueToggle 
      default:
        break;
    }
  }

  

function playSeq(sequence, clickDispatch = intervalTime) {
    let i = 0;

  var interval = setInterval(() => {
    dispatch(sequence[i]);
    i++;
    
    if(i >= sequence.length){
      if (state.watchMode) {
        dispatch({ type: PLAY_MODE })
      }
      
      clearInterval(interval)
    }
  }, clickDispatch)  
};



    const { windowWidth, fade, levelNumber, levelUp, gameOver, playMode, lightUpGreen, lightUpBlue, lightUpRed, lightUpYellow} = state




      return (
        <div>
          <BackgroundTransition levelUp={state.levelUp} watchMode={state.watchMode}/>
          <div className={styles['game-top']}>
            <div className={styles['bulletin-container']}>
            <GameBulletin
              levelUp={levelUp}
              levelNumber={levelNumber}
              fade={fade}
              gameOver={gameOver}
              resetGame={resetGame}
            />
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <div style={{ position: "relative" }}>
                <GameBoardPiece
                  toggle={greenToggle}
                  watchMode={state.watchMode}
                  transform={{ transform: "rotate(0deg" }}
                  lightUp={lightUpGreen}
                  handleClick={handleClick}
                  playMode={playMode}
                  windowWidth={windowWidth}
                  color={"lime"}
                  dataId={1}
                />
                <GameBoardPiece
                  toggle={redToggle}
                  watchMode={state.watchMode}
                  transform={{ transform: "rotate(90deg" }}
                  lightUp={lightUpRed}
                  handleClick={handleClick}
                  playMode={playMode}
                  windowWidth={windowWidth}
                  color={"red"}
                  dataId={2}
                />
                <br />
                <div
                  onClick={() => dispatch({ type: WATCH_MODE })}
                  className={styles['start-button']}
                >
                  {!state.watchMode && !playMode && !gameOver? "START" : null}
                </div>
                <GameBoardPiece
                  toggle={yellowToggle}
                  watchMode={state.watchMode}
                  transform={{ transform: "rotate(270deg" }}
                  lightUp={lightUpYellow}
                  handleClick={handleClick}
                  playMode={playMode}
                  windowWidth={windowWidth}
                  color={"yellow"}
                  dataId={3}
                />
                <GameBoardPiece
                  toggle={blueToggle}
                  watchMode={state.watchMode}
                  transform={{ transform: "rotate(180deg" }}
                  lightUp={lightUpBlue}
                  handleClick={handleClick}
                  playMode={playMode}
                  windowWidth={windowWidth}
                  color={"blue"}
                  dataId={4}
                />
              </div>
          </div>
            <Modal overlayClickable={true} open={gameOver} children={<GameOverModal levelNumber={levelNumber}/>} onClose={resetGame}/> 
        </div>
        </div>
      );
  }


export default GameContainer 