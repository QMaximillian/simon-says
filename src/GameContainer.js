import React, { useEffect, useReducer } from 'react';
import { GameBoardPiece } from './svgs/GameBoardPiece.js'
import greenSound from './audio/FirstNote.mp3'
import redSound from './audio/SecondNote.mp3'
import yellowSound from './audio/ThirdNote.mp3'
import blueSound from './audio/FourthNote.mp3'
import Legend from './components/Legend'
import GameBulletin from './components/GameBulletin'
import GameOverModal from './components/GameOverModal'
import wrongSound from './audio/Incorrect.wav'
import { useAudio } from './hooks/gameReducer'

// import rightSound from './audio/Correct.wav'
import './App.css'
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
  MODAL_TOGGLE,
  SET_WINDOW_WIDTH,
  SOUND_ON,
  debounce
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

// July 7th, 2019: Update

// 1. Audio is playing here and there, find way to return sound to play before click so it's 
// ready on direct click

// Figure out pattern for why sounds aren't playing (unmounting, pausing faster than playing, not resetting in time)

// 2. Get all buttons to respond to being clicked and playing audio by end of week
// FIGMA




function GameContainer(props) {

  // let sound;
  const [greenToggle] = useAudio(greenSound)
  const [redToggle] = useAudio(redSound)
  const [blueToggle] = useAudio(blueSound)
  const [yellowToggle] = useAudio(yellowSound)

  const initialState = {
    level: [1, 2, 3, 4],
    gameDispatch: [],
    gameArray: [],
    index: -1,
    levelNumber: 1,
    fade: false,
    available: true,
    levelUp: false,
    lightUpGreen: false,
    lightUpRed: false,
    lightUpYellow: false,
    lightUpBlue: false,
    watchMode: false,
    playMode: false,
    gameOver: false,
    showLegendModal: false,
    windowWidth: window.innerWidth
  }

  const [state, dispatch] = useReducer(playModeReducer, initialState)
  // const spring = useSpring({ to: {opacity: 1}, from: { opacity: 0}, delay: 1000}

  var dimensionUpdater = debounce(function() {
        dispatch({type: SET_WINDOW_WIDTH, value: window.innerWidth})
    }, 100)


  useEffect(() => {
    document.addEventListener('keydown', onKeyPressed)
    window.addEventListener('resize', dimensionUpdater)

    return function cleanup() {
      document.removeEventListener(
        "keydown",
        onKeyPressed
      );
      window.removeEventListener('resize', dimensionUpdater)
    }
  })


  useEffect(() => {

    const { gameOver, playMode, watchMode, gameArray, levelNumber, level, index, available } = state
      


    if (watchMode && gameArray.length == 0 && levelNumber == 1){
    } 
    else if (playMode && gameArray.equals(level) && gameArray.length == level.length) {
      
      dispatch({ type: NEXT_LEVEL })
      dispatch({ type: RESET_LEVEL_UP })
      dispatch({ type: WATCH_MODE })
    } 
    // else if (playMode && gameArray[index] == level[index]) {
    // }
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
            getSound(num),
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
    playSeq(dispatchArray, 150);
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
        return {type: SOUND_ON, value: greenToggle}
      case id === 2:
        return { type: SOUND_ON, value: redToggle }
      case id === 3:
        return { type: SOUND_ON, value: yellowToggle }
      case id === 4:
        return { type: SOUND_ON, value: blueToggle }
      default:
        break;
    }
  }


function onKeyPressed(event) {
  // switch statement (include other possible keypress combinations?)
  // allow user to use a lifeline to see the sequence one more time
    const { keyCode } = event
  const { playMode, watchMode } = state

  if (keyCode == 82) resetGame()

    if (gameOver) return 

    if (keyCode == 13) {
      return playMode || watchMode
        ? null
        : dispatch({ type: WATCH_MODE });
    }

    
    if (keyCode == 76) handleLegendToggle()

    if (playMode) {
      switch (true) {
          case keyCode == 81:
            return dispatchClickAction(1);
          case keyCode == 87:
            return dispatchClickAction(2);
          case keyCode == 65:
            return dispatchClickAction(3);
          case keyCode == 83:
            return dispatchClickAction(4);
        default:
          return;
      }
    }
}

  

function playSeq(sequence, intervalTime = 500) {
    const { levelNumber } = state
    let i = 0;
  if (levelNumber >= 5) {
    intervalTime = 500;
  } 
  else if (levelNumber >= 10) {
    intervalTime = 200;
  }


  debugger;
  var interval = setInterval(() => {
    dispatch(sequence[i]);
    i++;
    
    if(i >= sequence.length){
      if (state.watchMode) {
        dispatch({ type: PLAY_MODE })
      }
      
      clearInterval(interval)
    }
  }, intervalTime)  
};

function handleLegendToggle() {
  dispatch({type: MODAL_TOGGLE})
}


  //PLAY MODE

    const { windowWidth, showLegendModal, fade, levelNumber, levelUp, gameOver, playMode, lightUpGreen, lightUpBlue, lightUpRed, lightUpYellow} = state



  
      return (
        <div className="simon-says-grid">
          {showLegendModal ? (
            <Legend
              handleLegendToggle={handleLegendToggle}
              show={showLegendModal}
            />
          ) : (
            <button
              className="button-primary legend-open-button"
              onClick={handleLegendToggle}
            >
              LEGEND
            </button>
          )}
          <GameBulletin
            levelUp={levelUp}
            levelNumber={levelNumber}
            fade={fade}
            gameOver={gameOver}
            resetGame={resetGame}
          />
          <div
            className="simon-says-circle"
            // style={{ backgroundColor: "orange" }}
          >
            <div style={{ position: "relative" }}>
              <GameBoardPiece
                toggle={greenToggle}
                watchMode={state.watchMode}
                // sound={greenSound}
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
                // sound={redSound}
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
                tabIndex="0"
                onClick={() => dispatch({ type: WATCH_MODE })}
                style={{
                  position: "absolute",
                  margin: "auto",
                  left: "0",
                  right: "0",
                  bottom: "239px",
                  zIndex: "10"
                }}
              >
                {!state.watchMode && !playMode ? "START" : null}
              </div>
              <GameBoardPiece
              toggle={yellowToggle}
              watchMode={state.watchMode}
                // sound={yellowSound}
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
                // sound={blueSound}
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
          {gameOver ? (
            <GameOverModal levelNumber={levelNumber} gameOver={gameOver} />
          ) : null}
        </div>
      );
  }


export default GameContainer 