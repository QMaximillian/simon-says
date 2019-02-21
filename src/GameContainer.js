import React, { useState, useEffect } from 'react';
import './App.css';
import { ReactComponent as GreenPiece } from './svgs/GreenPiece.svg'
import { ReactComponent as YellowPiece } from './svgs/YellowPiece.svg'
import { ReactComponent as RedPiece } from './svgs/RedPiece.svg'
import { ReactComponent as BluePiece } from './svgs/BluePiece.svg'

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


export const GameContainer = () => {
  const [level, setLevel] = useState([1, 2, 3, 4])
  const [gameArray, setGameArray] = useState([])
  const [index, setIndex] = useState(-1)

  useEffect(() => {
    console.log(level, "level")
    console.log(gameArray, "gameArray")
    if (gameArray.equals(level) && gameArray.length === level.length) {
      console.log("You beat the level")
      setLevel(prevGameArray => ([...prevGameArray, Math.floor(Math.random() * 5)]))
      setIndex(-1)
      setGameArray([])

    } else if (gameArray[index] === level[index]) {
      console.log('right')
    } else if (gameArray.length === 0){
        console.log('begin game');
    } else {
      console.log('wrong')
    }
  })

  const handleClick = (number) => {
    setGameArray(prevGameArray => ([...prevGameArray, number]))
    setIndex(index + 1)
  }



  return (
    <div className="simon-says-grid">

      <div className="simon-says-circle">
          <GreenPiece
            onClick={() => handleClick(1)}
          />
          <RedPiece
            onClick={() => handleClick(2)}
          />
          <br/>
          <YellowPiece onClick={() => handleClick(3)}
          />
          <BluePiece onClick={() => handleClick(4)}
          />
      </div>
    </div>

  )
}
