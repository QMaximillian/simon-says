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
  COLOR_BUTTON_OFF
} from "./hooks/gameReducer";

// Eliminate read-only rule in ESLint for adding methods to prototype class

/*eslint no-extend-native: ["error", { "exceptions": ["Array"] }]*/


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


export const GameContainer = (props) => {
  const [state, dispatch] = useReducer(playModeReducer, {
    level: [1, 2, 3, 4], 
    gameArray: [],
    index: -1,
    levelNumber: 1,
    fade: false,
    available: false,
    levelUp: false,
    lightUpGreen: false,
    lightUpRed: false,
    lightUpYellow: false,
    lightUpBlue: false,
    watchMode: true,
    playMode: false,
    gameOver: false
  })

const spring = useSpring({ to: {opacity: 1}, from: { opacity: 0}, delay: 1000})




  useEffect(() => {
    if (state.gameArray.length == 0 && state.levelNumber == 1){
      console.log('begin game')

    } 
    else if (state.gameArray.equals(state.level) && state.gameArray.length == state.level.length) {
      dispatch({type: NEXT_LEVEL})
      dispatch({type: RESET_LEVEL_UP})
      dispatch({type: WATCH_MODE})
    } 
    else if (state.gameArray[state.index] == state.level[state.index]) {
      console.log('right')
    } 
    else {
      console.log('wrong')
    }

    if (state.watchMode && state.available) {
      playSeq(dispatchLightUp(state.level))
    }
  }, [state.gameArray, state.watchMode, state.playMode, state.available])


  function handleClick(number) {
    return dispatch({type: CLICK, value: number})
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


  function playSeq(sequence) {
  let i = 0;
   console.log(sequence)
  var interval = setInterval(() => {
    dispatch(sequence[i]);
    i++;
    if(i >= sequence.length){
      clearInterval(interval);
    }
  }, 1000)
    
};


  //PLAY MODE
  if (state.watchMode) {
    return (
      <div className="simon-says-grid">
        <GameBulletin
          levelUp={state.levelUp}
          levelNumber={state.levelNumber}
          fade={state.fade}
        />
        {state.available ? (
          <div className="simon-says-circle">
            <GreenPiece lightUp={state.lightUpGreen} />
            <RedPiece lightUp={state.lightUpRed}/>
            <br />
            <YellowPiece lightUp={state.lightUpYellow} />
            <BluePiece lightUp={state.lightUpBlue} />
          </div>
        ) : (
          <div/>
        )}
      </div>
    );
  } else if (state.playMode) {
    return (
      <div className="simon-says-grid">
        <GameBulletin
          levelUp={state.levelUp}
          levelNumber={state.levelNumber}
          fade={state.fade}
        />
        {state.available ? (
          <animated.div style={spring} className="simon-says-circle">
            <GreenPiece handleClick={handleClick} />
            <RedPiece handleClick={handleClick} />
            <br />
            <YellowPiece handleClick={handleClick} />
            <BluePiece handleClick={handleClick} />
          </animated.div>
        ) : (
          <div />
        )}
      </div>
    );
  } else {
    return <div>HOW ARE YOU HERE</div>
  }
}
