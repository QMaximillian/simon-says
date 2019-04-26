import React, { useEffect, useReducer } from 'react';
import { GreenPiece } from './svgs/GreenPiece.js'
import { YellowPiece } from './svgs/YellowPiece.js'
import { RedPiece } from './svgs/RedPiece.js'
import { BluePiece } from './svgs/BluePiece.js'
import Legend from './components/Legend'
import GameBulletin from './components/GameBulletin'
import GameOverModal from './components/GameOverModal'
import wrongSound from './audio/Incorrect.wav'
import rightSound from './audio/Correct.wav'
import './App.css'
import {
  playModeReducer,
  NEXT_LEVEL,
  CLICK,
  RESET_LEVEL_UP,
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

// FIGMA

// Create start button SVG to begin game and restart button to begin game again ✅
// Place the button on the plane behind (zIndex) but make it center within the simon says buttons
// Create and outside SVG to wrap all of the simon says buttons (zIndex)

 



// Add audio for each button to play during playMode and when clicked (audio refs) ✅
// Pass down correct and wrong button press feedback to GameBulletin to alert player

// React Spring animations for level updates
// Rails backend for high scores

function GameContainer(props) {

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
    clientWidth: undefined
  }

  const [state, dispatch] = useReducer(playModeReducer, initialState)
  // const spring = useSpring({ to: {opacity: 1}, from: { opacity: 0}, delay: 1000}

  var dimensionUpdater = debounce(function() {
        dispatch({type: SET_WINDOW_WIDTH, value: window.innerWidth})
    }, 100)


  useEffect(() => {
    
    const { gameOver, playMode, watchMode, gameArray, levelNumber, level, index, available } = state
      document.addEventListener('keydown', onKeyPressed)
      window.addEventListener('resize', dimensionUpdater)

    // console.log(state)
    if (watchMode && gameArray.length == 0 && levelNumber == 1){
      // console.log('begin game')
    } 
    else if (playMode && gameArray.equals(level) && gameArray.length == level.length) {
      dispatch({ type: NEXT_LEVEL })
      dispatch({ type: RESET_LEVEL_UP })
      dispatch({ type: WATCH_MODE })
      // const right = new Audio(rightSound)
      // right.play()

    } 
    else if (playMode && gameArray[index] == level[index]) {
    }
    else if (playMode && gameArray[index] != level[index]
    ) {
      const wrong = new Audio(wrongSound)
      wrong.play()
      dispatch({ type: GAME_OVER_TOGGLE })
    }

    if (levelUp) {
      const right = new Audio(rightSound)
      right.play()
    }

    
    if (!gameOver && watchMode && available) {
            dispatchLightUpPatternWithState()

    }





    return function cleanup() {
      document.removeEventListener(
        "keydown",
        onKeyPressed
      );
      window.removeEventListener('resize', dimensionUpdater)

    }
  }, [window.innerWidth, state.gameArray, state.watchMode, state.playMode, state.available, state.levelUp])

  function handleClick(number) {
    dispatchClickAction(number)
  }

  function resetGame() {
    dispatch({ type: RESET_GAME, value: initialState})
  }


  function dispatchLightUpPatternWithState() {

    const { gameDispatch, level } = state
    
    if (level.length > 4) {
      gameDispatch.push({type: getColor(level[level.length - 1])}, {type: COLOR_BUTTON_OFF}) 
    } else {
      level.forEach((num) => {
          gameDispatch.push({ type: getColor(num) }, { type: COLOR_BUTTON_OFF });
      });
    }
    playSeq(gameDispatch)
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
    const { levelNumber} = state
    let i = 0;

  if (levelNumber >= 5) {
    intervalTime = 500;
  } 
  else if (levelNumber >= 10) {
    intervalTime = 200;
  }

  //  console.log(sequence)
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
          <button className="button-primary legend-open-button" onClick={handleLegendToggle}>LEGEND</button>
        )}
        <GameBulletin
          levelUp={levelUp}
          levelNumber={levelNumber}
          fade={fade}
          gameOver={gameOver}
          resetGame={resetGame}
        />
        <div style={{order: 1}} className="simon-says-circle">
          <GreenPiece
            lightUp={lightUpGreen}
            handleClick={handleClick}
            playMode={playMode}
            width={windowWidth}
          />
          <RedPiece
            lightUp={lightUpRed}
            handleClick={handleClick}
            playMode={playMode}
            width={windowWidth}
          />
          <br />
          {/* <div 
            tabIndex="0"
            onClick={function() { dispatch({ type: WATCH_MODE })}}>{watchMode || playMode ? null : 'START'}
            </div> */}
          <YellowPiece
            lightUp={lightUpYellow}
            handleClick={handleClick}
            playMode={playMode}
            width={windowWidth}
          />
          <BluePiece
            lightUp={lightUpBlue}
            handleClick={handleClick}
            playMode={playMode}
            width={windowWidth}
          />
        </div>
          {gameOver ? <GameOverModal gameOver={gameOver}/> : null}
      </div>


    )
  }


export default GameContainer 