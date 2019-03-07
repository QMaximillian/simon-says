import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring'
import { GreenPiece } from './svgs/GreenPiece.js'
import { YellowPiece } from './svgs/YellowPiece.js'
import { RedPiece } from './svgs/RedPiece.js'
import { BluePiece } from './svgs/BluePiece.js'
import GameBulletin from './components/GameBulletin'
import './App.css'

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
  const [level, setLevel] = useState([1, 2, 3, 4])
  const [gameArray, setGameArray] = useState([])
  const [index, setIndex] = useState(-1)
  const [levelNumber, setLevelNumber] = useState(1)
  const [fade, setFade] = useState(false)
  const [gameStatus, setGameStatus] = useState(true)
  const [available, setAvailable] = useState(false)
  const [levelUp, setLevelUp] = useState(false);

const spring = useSpring({ to: {opacity: 1}, from: { opacity: 0}, delay: 1000})

  useEffect(() => {
    setAvailable(true)
  }, [available])

  useEffect(() => {
    console.log(level, "level")
    console.log(gameArray, "gameArray")
    console.log(fade, 'fade');
    if (gameArray.equals(level) && gameArray.length === level.length) {
      handleNextLevel()
    } else if (gameArray[index] === level[index]) {
      console.log('right')
    } else if (gameArray.length === 0){
        console.log('begin game');
    } else {
      setGameStatus(false)
      console.log('wrong')
    }
  })

  const handleNextLevel = () => {
    console.log("You beat the level")
    setLevelUp(true)
    setFade(true)
    setLevel(prevGameArray => ([...prevGameArray, Math.floor(Math.random() * 4) + 1]))
    setIndex(-1)
    setGameArray([])
    setLevelNumber(prevLevelNumber => (prevLevelNumber + 1))
  }

  const handleClick = (number) => {
    setGameArray(prevGameArray => ([...prevGameArray, number]))
    setIndex(index + 1)
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
        levelUp={levelUp}
        levelNumber={levelNumber}
        fade={fade}
      />
      {available ? (
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
