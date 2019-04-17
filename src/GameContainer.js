import React, { useEffect, useReducer } from 'react';
// import { useSpring } from 'react-spring'
import { GreenPiece } from './svgs/GreenPiece.js'
import { YellowPiece } from './svgs/YellowPiece.js'
import { RedPiece } from './svgs/RedPiece.js'
import { BluePiece } from './svgs/BluePiece.js'
import Legend from './components/Legend'
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
  RESET_GAME,
  LEGEND_TOGGLE
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

// Find effect that makes it look like button is being pressed and is visually noticeable ✅ 
// memoize dispatch array function to just add new value without creating a new array for each watchMode
// Mess around with React Spring animations for desired effects
// Decrease amount of time between intervals every 5 or 10 levels ✅ 
// EXTRA: Add a single replay button to save you if you make a single mistake ✅

// Add audio for each button to play during playMode and when clicked
// Pass down correct and wrong button press feedback to GameBulletin to alert player
// CSS Styling to clean up interface
// React Spring animations for level updates
// soothing calm background color
// Rails backend for high scores

function GameContainer(props) {

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
    toggleLegend: false,
    greenAudio: false
  }

  const [state, dispatch] = useReducer(playModeReducer, initialState)

  // const spring = useSpring({ to: {opacity: 1}, from: { opacity: 0}, delay: 1000}


  useEffect(() => {
    const { playMode, watchMode, gameArray, levelNumber, level, index, available } = state
    
    document.addEventListener('keydown', onKeyPressed)


    console.log(state)
    if (watchMode && gameArray.length == 0 && levelNumber == 1){
      console.log('begin game')
    } 
    else if (playMode && gameArray.equals(level) && gameArray.length == level.length) {
      dispatch({ type: NEXT_LEVEL })
      dispatch({ type: RESET_LEVEL_UP })
      dispatch({ type: WATCH_MODE })
    } 
    else if (playMode && gameArray[index] == level[index]) {
      // console.log('right')
    }
    else if (playMode && gameArray[index] != level[index]
    ) {
      // console.log("wrong");
      dispatch({ type: GAME_OVER, value: initialState })
    }

    
    if (watchMode && available) {
      playSeq(dispatchLightUpPattern(level))
    }


    return function cleanup() {
      document.removeEventListener(
        "keydown",
        onKeyPressed
      );
    }
  }, [state.gameArray, state.watchMode, state.playMode, state.available])


  function handleClick(number) {
    dispatchClickAction(number)
  }

  function resetGame() {
    dispatch({ type: RESET_GAME, value: initialState })
  }

  function dispatchLightUpPattern(arr) {
    var dispatchArray = [];

    arr.forEach((num) => {
        dispatchArray.push({ type: getColor(num) }, { type: COLOR_BUTTON_OFF });
    });
    dispatchArray.push({type: PLAY_MODE});

    return dispatchArray;
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
    playSeq(dispatchArray, 100);
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
  
    if (keyCode == 13) {
      return playMode || watchMode
        ? null
        : dispatch({ type: WATCH_MODE });
    }

    if (keyCode == 82) {
      resetGame()
    }

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

  

function playSeq(sequence, intervalTime = 1000) {
    const { levelNumber } = state
    let i = 0;

  if (levelNumber > 10) {
    intervalTime = 500;
  } 
  else if (levelNumber > 20) {
    intervalTime = 200;
  }

   console.log(sequence)
  var interval = setInterval(() => {
    dispatch(sequence[i]);
    i++;
    if(i >= sequence.length){
      clearInterval(interval);
    }
  }, intervalTime)  
};

function handleLegendToggle() {
  dispatch({type: LEGEND_TOGGLE})
}


  //PLAY MODE

    const { greenAudio, fade, levelNumber, levelUp, gameOver, playMode, lightUpGreen, lightUpBlue, lightUpRed, lightUpYellow, toggleLegend} = state

    return (
      <div className="simon-says-grid">
        {toggleLegend ? (
          <Legend
            handleLegendToggle={handleLegendToggle}
            toggleLegend={toggleLegend}
          />
        ) : (
          <button className="button-primary" onClick={handleLegendToggle}>LEGEND</button>
        )}
        <GameBulletin
          levelUp={levelUp}
          levelNumber={levelNumber}
          fade={fade}
          gameOver={gameOver}
          resetGame={resetGame}
        />
        <div style={{ zIndex: 1}} className="simon-says-circle">
          <GreenPiece
            lightUp={lightUpGreen}
            handleClick={handleClick}
            playMode={playMode}
            greenAudio={greenAudio}
          />
          <RedPiece
            lightUp={lightUpRed}
            handleClick={handleClick}
            playMode={playMode}
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

export default GameContainer 