import React, { useState, useEffect } from 'react';
import { ReactComponent as GreenPiece } from './svgs/GreenPiece.svg'
import { ReactComponent as YellowPiece } from './svgs/YellowPiece.svg'
import { ReactComponent as RedPiece } from './svgs/RedPiece.svg'
import { ReactComponent as BluePiece } from './svgs/BluePiece.svg'
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


export const GameContainer = () => {

  const [level, setLevel] = useState([1, 2, 3, 4])
  const [gameArray, setGameArray] = useState([])
  const [index, setIndex] = useState(-1)
  const [levelNumber, setLevelNumber] = useState(1)
  const [fade, setFade] = useState(false)
  const [gameStatus, setGameStatus] = useState(true)
  const [available, setAvailable] = useState(false)


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

    setFade(true)
    setLevel(prevGameArray => ([...prevGameArray, Math.floor(Math.random() * 4) + 1]))
    setIndex(-1)
    setGameArray([])
    setLevelNumber(prevLevelNumber => (prevLevelNumber + 1))
  }

  const handleClick = (number) => {
    setFade(false)
    setGameArray(prevGameArray => ([...prevGameArray, number]))
    setIndex(index + 1)
  }



  //PLAY MODE
  return (
    <div className="simon-says-grid">
      <div>
          {console.log(available)}
        Level {levelNumber}
      </div>
      <div>
        {fade ? "You've reached the next level!": null}
        {gameStatus ? null : 'You have lost'}
      </div>
      {available ?
        <div className='simon-says-circle'>
          <GreenPiece
            onClick={(event) => handleClick(Number(event.target.dataset.value))}
          />
          <RedPiece
            onClick={(event) => handleClick(Number(event.target.dataset.value))}
          />
          <br/>
          <YellowPiece onClick={(event) => handleClick(Number(event.target.dataset.value))}
          />
          <BluePiece onClick={(event) => handleClick(Number(event.target.dataset.value))}
          />
        </div>
        :
        <div></div>
      }
    </div>
  )

}
