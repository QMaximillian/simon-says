import React, { useState } from 'react'
import '../App.css'

function GameOverModal({gameOver, ...props}){

    const showHideClassname = gameOver ? 'game-over-modal display-block' : "game-over-modal display-none";

    return (
        <div className={showHideClassname}>
            <section className="game-over-modal-main">
            <HighScoreList />
            </section>
        </div>
    )
}

const HighScoreList = ({ resetGame }) => {

  const [text, setText] = useState('')

function handleChange(event) {
  setText(event.target.value)
}

  return (
     <aside>
       <div>
         <div>
            GAME OVER
         </div>
         <div onClick={resetGame}>
           PLAY AGAIN?
         </div>
         <label>Enter Your Initials</label>
         <input maxLength={3} onChange={handleChange} value={text}></input>
       </div>
     </aside>
  )
}

export default GameOverModal