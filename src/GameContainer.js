import React, { useEffect, useReducer } from 'react';
import { useSpring, animated } from 'react-spring'
import { GreenPiece } from './svgs/GreenPiece.js'
import { YellowPiece } from './svgs/YellowPiece.js'
import { RedPiece } from './svgs/RedPiece.js'
import { BluePiece } from './svgs/BluePiece.js'
import GameBulletin from './components/GameBulletin'
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
  GAME_OVER,
  RESET_GAME
} from "./hooks/gameReducer";
import { stat } from 'fs';

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

    for (var i = 0, l=this.length; i < l; i++) {
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

// Create start button to begin game and restart button to begin game again ✅ 
// Add audio for each button to play during playMode and when clicked
// Pass down correct and wrong button press feedback to GameBulletin to alert player
// Find effect that makes it look like button is being pressed and is visually noticeable
// memoize dispatch array function to just add new value without creating a new array for each watchMode
// Mess around with React Spring animations for desired effects
// Decrease amount of time between intervals every 5 or 10 levels ✅ 
// EXTRA: Add a single restart button to save you if you make a single mistake

export const GameContainer = (props) => {

  const initialState = {
    level: [1, 2, 3, 4],
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
    greenAudioPlay: false,

  }

  const [state, dispatch] = useReducer(playModeReducer, initialState)

  const spring = useSpring({ to: {opacity: 1}, from: { opacity: 0}, delay: 1000})




  useEffect(() => {
    document.addEventListener('keydown', onKeyPressed)

    if (state.watchMode && state.gameArray.length == 0 && state.levelNumber == 1){
      console.log('begin game')
    } 
    else if (state.playMode && state.gameArray.equals(state.level) && state.gameArray.length == state.level.length) {
      dispatch({ type: NEXT_LEVEL })
      dispatch({ type: RESET_LEVEL_UP })
      dispatch({ type: WATCH_MODE })
    } 
    else if (state.playMode && state.gameArray[state.index] == state.level[state.index]) {
      console.log('right')
    }
    else if (state.playMode && state.gameArray[state.index] != state.level[state.index]
    ) {
      console.log("wrong");
      dispatch({ type: GAME_OVER, value: initialState })
    }
    else {
      console.log('bob')
    }

    if (state.watchMode && state.available) {
      playSeq(dispatchLightUp(state.level))
    }

    return function cleanup() {
      document.removeEventListener(
        "keydown",
        onKeyPressed
      );
    }
  }, [state.gameArray, state.watchMode, state.playMode, state.available])


  function handleClick(number) {
    return dispatch({type: CLICK, value: number})
    console.log(state.gameArray)
  }

  function dispatchLightUp(arr) {
    // helper

    var dispatchArray = []

    arr.forEach((num) => {
      if (num == 1) {
        dispatchArray.push({ type: GREEN_ON }, {type: COLOR_BUTTON_OFF})
      }
      else if (num == 2) {
        dispatchArray.push({ type: RED_ON }, { type: COLOR_BUTTON_OFF })
      }
      else if (num == 3) {
        dispatchArray.push({ type: YELLOW_ON }, { type: COLOR_BUTTON_OFF })
      }
      else if (num == 4) {
        dispatchArray.push({ type: BLUE_ON }, { type: COLOR_BUTTON_OFF })
      }
    })
    dispatchArray.push({type: PLAY_MODE})

    return dispatchArray
  }

  function onKeyPressed(event) {
  // switch statement (include other possible keypress combinations?)
  // allow user to use a lifeline to see the sequence one more time
    if (event.keyCode == 13) {
      if (state.playMode || state.watchMode) return
      dispatch({ type: WATCH_MODE });
    }
  }

  function playSeq(sequence) {
    const { levelNumber } = state
    let i = 0;
    let intervalTime = 200;

  // if (levelNumber < 10) {
  //   intervalTime = 1000
  // } 
  // else if (levelNumber < 20) {
  //   intervalTime = 500;
  // } 
  // else {
  //   intervalTime = 200;
  // }

   console.log(sequence)
  var interval = setInterval(() => {
    dispatch(sequence[i]);
    i++;
    if(i >= sequence.length){
      clearInterval(interval);
    }
  }, intervalTime)  
};


  //PLAY MODE

    const { gameOver, playMode, watchMode, lightUpGreen, lightUpBlue, lightUpRed, lightUpYellow } = state
    return (
      <div className="simon-says-grid">
        <GameBulletin
          levelUp={state.levelUp}
          levelNumber={state.levelNumber}
          fade={state.fade}
          gameOver={state.gameOver}
          resetGame={function() { dispatch({type: RESET_GAME, value: initialState})}}
        />
        <div className="simon-says-circle">
          <GreenPiece
            lightUp={lightUpGreen}
            handleClick={handleClick}
            playMode={playMode}
          />
          <RedPiece
            lightUp={lightUpRed}
            handleClick={handleClick}
            playMode={playMode}
          />
          <br />
          <div 
            onKeyDown={onKeyPressed}
            tabIndex="0"
            onClick={function () { dispatch({ type: WATCH_MODE })}}>{watchMode || playMode ? '' : gameOver ? 'TRY AGAIN' : 'START'}</div>
          <YellowPiece
            lightUp={lightUpYellow}
            handleClick={handleClick}
            playMode={playMode}
          />
          <BluePiece
            lightUp={lightUpBlue}
            handleClick={handleClick}
            playMode={playMode}
          />
        </div>
      </div>
    );
}
