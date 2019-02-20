import React, { useState, useEffect } from 'react';
import './App.css';
import { ReactComponent as Subtract } from './svgs/Subtract.svg'

export const GameContainer = () => {
  const [gameArray, setGameArray] = useState([])
  const [clicks, setClicks] = useState(0)

  const levelOne = [2, 4, 3, 1]
  // render 4 squares
  // render a bulletin showing current status of game (level)
  // contains the levels for the game and the function that each square returns a value into

  useEffect(() => {
    console.log(gameArray[clicks - 1], levelOne[clicks - 1])
    if (gameArray[clicks - 1] === levelOne[clicks - 1]) {
      // alert("Keep going")
    } else {
      // alert("You lost")
    }
  })

  console.log(gameArray)
  return (
    <>
    <Subtract onClick={() => console.log("Hello")}/>
    <div onClick={() => {
      setClicks(clicks + 1)
       setGameArray(prevGameArray => ([...prevGameArray, 1]))}}>Green</div>
    <div onClick={() => {
      setClicks(clicks + 1)
       setGameArray(prevGameArray => ([...prevGameArray, 2]))}}>Red</div>
    <div onClick={() => {
      setClicks(clicks + 1)
       setGameArray(prevGameArray => ([...prevGameArray, 3]))}}>Yellow</div>
    <div onClick={() => {
      setClicks(clicks + 1)
       setGameArray(prevGameArray => ([...prevGameArray, 4]))}}>Pink</div>
    </>

  )
}
