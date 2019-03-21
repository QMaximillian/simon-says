import React, { useEffect, useReducer } from 'react';
import { useSpring, animated } from 'react-spring'
import { GreenPiece } from './svgs/GreenPiece.js'
import { YellowPiece } from './svgs/YellowPiece.js'
import { RedPiece } from './svgs/RedPiece.js'
import { BluePiece } from './svgs/BluePiece.js'
import GameBulletin from './components/GameBulletin'
import './App.css'
import {gameReducer, NEXT_LEVEL, CLICK, RESET_LEVEL_UP} from './hooks/gameReducer'

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
  const [state, dispatch] = useReducer(gameReducer, {
    level: [1, 2, 3, 4], 
    gameArray: [],
    index: -1,
    levelNumber: 1,
    fade: false,
    gameStatus: true,
    available: true,
    levelUp: false
  })

const spring = useSpring({ to: {opacity: 1}, from: { opacity: 0}, delay: 1000})




  useEffect(() => {
    console.log(state.level)
    if (state.gameArray.equals(state.level) && state.gameArray.length === state.level.length) {
      dispatch({type: NEXT_LEVEL})
      dispatch({type: RESET_LEVEL_UP})
    } else if (state.gameArray[state.index] === state.level[state.index]) {
      console.log('right')
    } else if (state.gameArray.length === 0){
        console.log('begin game');
    } else {
      // end the game
      console.log('wrong')
    }
  })


  const handleClick = (number) => {
    dispatch({type: CLICK, value: number})
  }

  // disable the ability to click on path of svgs
  // iterate through "level"
  // if number === svg's id number, change the stroke color to white
  // return to black in callback
  // setTimeout before going to next number in level array
  // when the array is finished reenable ability to click on buttons

  //PLAY MODE
  
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

}
