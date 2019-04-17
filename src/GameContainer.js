import React, { useEffect, useReducer } from 'react';
// import { useSpring } from 'react-spring'
import { GreenPiece } from './svgs/GreenPiece.js'
import { SVGPiece } from './svgs/SVGPiece'
import { YellowPiece } from './svgs/YellowPiece.js'
import { RedPiece } from './svgs/RedPiece.js'
import { BluePiece } from './svgs/BluePiece.js'
import Legend from './components/Legend'
import SineWave from './components/SineWave.js'
import GameBulletin from './components/GameBulletin'
import redSound from "./audio/Button1.wav";
import greenSound from "./audio/Button4.wav";
import yellowSound from "./audio/Button6.wav";
import blueSound from "./audio/Button2.wav";
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
// Mess around with React Spring animations for desired effects
// Decrease amount of time between intervals every 5 or 10 levels ✅ 
// EXTRA: Add a single replay button to save you if you make a single mistake ✅

// Add audio for each button to play during playMode and when clicked
// Pass down correct and wrong button press feedback to GameBulletin to alert player
// CSS Styling to clean up interface
// React Spring animations for level updates
// soothing calm background color
// Rails backend for high scores

// 04/17/19

// Get SineWave on either side of the page on 3 rows throughout page
// Get SineWave's to appear behind the Simon Says SVG components
// Figure out soothing background color/animation
// Fix SVG spacing so stroke doesn't look cutoff
// memoize dispatch array function to just add new value without creating a new array for each watchMode
// useState for SVGPiece to play own sound based on props

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
  }

  const [state, dispatch] = useReducer(playModeReducer, initialState)

  // const spring = useSpring({ to: {opacity: 1}, from: { opacity: 0}, delay: 1000}


  useEffect(() => {
    const { playMode, watchMode, gameArray, levelNumber, level, index, available } = state
    
    document.addEventListener('keydown', onKeyPressed)


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

  

function playSeq(sequence, intervalTime = 2000) {
    const { levelNumber } = state
    let i = 0;

  if (levelNumber > 10) {
    intervalTime = 1000;
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

    const {fade, levelNumber, levelUp, gameOver, playMode, lightUpGreen, lightUpBlue, lightUpRed, lightUpYellow, toggleLegend} = state

    return (
      <div className="simon-says-grid">
        {/* <SineWave columnStart={1} columnEnd={6} gridStart={3} /> */}
        {toggleLegend ? (
          <Legend
            handleLegendToggle={handleLegendToggle}
            toggleLegend={toggleLegend}
          />
        ) : (
          <button onClick={handleLegendToggle}>Legend</button>
        )}
        <GameBulletin
          levelUp={levelUp}
          levelNumber={levelNumber}
          fade={fade}
          gameOver={gameOver}
          resetGame={resetGame}
        />
        <div className="simon-says-circle">
          {/* <GreenPiece
            lightUp={lightUpGreen}
            handleClick={handleClick}
            playMode={playMode}
            sound={greenSound}
          /> */}
          <SVGPiece
            lightUp={lightUpGreen}
            sound={greenSound}
          >
          {(lightUp) => (
              <svg pointerEvents="none" width="250" height="238" viewBox="0 0 241 238" fill="none">
                    <g filter="url(#filter0_d)" >
                        <path onClick={playMode ? (event) => handleClick(Number(event.target.dataset.id)) : null} data-id="1" pointerEvents="all" d="M236.296 1V135.167C183.641 135.167 140.999 177.267 140.999 229.254H5.00003C5.00003 103.273 108.588 1 236.296 1Z" fill="lime"
                          stroke={lightUp ? "gold" : "black"} strokeMiterlimit="10" strokeWidth="10px" />
                    </g>
                    <defs>
                      <filter id="filter0_d" x="0.500031" y="0.5" width="240.296" height="237.254" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                          <feFlood floodOpacity="0" result="BackgroundImageFix" />
                          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                          <feOffset dy="4" />
                          <feGaussianBlur stdDeviation="2" />
                          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                      </filter>
                    </defs>
              </svg>
            )}
          </SVGPiece> 
          <SVGPiece
            lightUp={lightUpRed}
            sound={redSound}
          >
            {(lightUp) => (<svg pointerEvents="none" width="241" height="238" viewBox="0 0 241 238">

              <g filter="url(#filter0_d)">
                <path onClick={playMode ? (event) => handleClick(Number(event.target.dataset.id)) : null} data-id="2" pointerEvents="all" d="M4.99996 1V135.167C57.6554 135.167 100.297 177.267 100.297 229.254H236.296C236.296 103.273 132.708 1 4.99996 1Z" fill="red" stroke={lightUp ? "gold" : "black"} strokeMiterlimit="10" strokeWidth="8px" />
              </g>

              <defs>
                <filter id="filter0_d" x="0.499939" y="0.5" width="240.296" height="237.254" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                </filter>
              </defs>
            </svg>
            )
            }

          </SVGPiece>
          <br />
          {/* <div 
            tabIndex="0"
            onClick={function() { dispatch({ type: WATCH_MODE })}}>{watchMode || playMode ? null : 'START'}
            </div> */}
          <SVGPiece
            lightUp={lightUpYellow}
            sound={yellowSound}
          >
          {(lightUp) => (
              <svg pointerEvents="none" width="241" height="238" viewBox="0 0 241 238" fill="none" xmlns="http://www.w3.org/2000/svg">

                <g filter="url(#filter0_d)">
                  <path onClick={playMode ? (event) => handleClick(Number(event.target.dataset.id)) : null} data-id="3" pointerEvents="all" d="M236.296 229.254V95.087C183.641 95.087 140.999 52.987 140.999 1.00003H5.00003C5.00003 126.981 108.588 229.254 236.296 229.254Z" fill="yellow" stroke={lightUp ? "gold" : "black"} strokeMiterlimit="10" strokeWidth="8px" />
                </g>
                <defs>

                  <filter id="filter0_d" x="0.500031" y="0.500031" width="240.296" height="237.254" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                  </filter>
                </defs>
              </svg>
          )}

          </SVGPiece>
          <SVGPiece
            lightUp={lightUpBlue}
            sound={blueSound}
          >
          {(lightUp) => (
              <svg
                onClick={
                  playMode
                    ? event => handleClick(Number(event.target.dataset.id))
                    : null
                }
                pointerEvents="none"
                width="241"
                height="238"
                viewBox="0 0 241 238"
                fill="#36D033"
              >
                <g filter="url(#filter0_d)">
                  <path
                    data-id="4"
                    pointerEvents="all"
                    className="button"
                    d="M5 229V94.833C57.6554 94.833 100.297 52.733 100.297 0.746002H236.296C236.296 126.727 132.708 229 5 229Z"
                    fill="blue" // {/*lightUp ? "white" : "blue"*/}
                    stroke={lightUp ? "gold" : "black"}
                    strokeWidth="8px"
                    strokeMiterlimit="10"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d"
                    x="0"
                    y="0"
                    width="241"
                    height="238"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow"
                      result="shape"
                    />
                    <feMerge />
                  </filter>
                </defs>
              </svg>
          )}
          </SVGPiece>
        </div>
      </div>
    );
}

export default GameContainer 