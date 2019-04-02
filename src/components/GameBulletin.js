import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import { useSpring, animated, useTransition } from "react-spring";
import '../App.css'


const GameBulletin = ({ levelUp, levelNumber, fade, gameOver, resetGame }) => {
    const props = useSpring({ to: {opacity: 1}, from: { opacity: 0}, delay: 1000})

  // const [show, set] = useState(false)
  const transitions = useTransition(levelUp, null, {
    from: { position: 'absolute', opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

    return (
      <>
        <animated.div style={props} className="simon-says-bulletin">
          <h4>LEVEL {levelNumber}</h4>
          {transitions.map(
            ({ item, key, props }) =>
              item && <animated.div key={key}>LEVEL UP</animated.div>
          )}
        </animated.div>
        {gameOver ? <HighScoreList resetGame={resetGame} /> : null}
      </>
    );  
}

const HighScoreList = ({ resetGame }) => {

  const [text, setText] = useState('')

function handleChange(event) {
  setText(event.target.value)
}

  return ReactDOM.createPortal(
     <aside className="c-modal-cover">
       <div className="c-modal">
         <button className="c-modal__close" aria-label="Close Modal">
           <span className="u-hide-visually">Close</span>
            <svg className="c-modal-close-icon" viewBox="0 0 40 40"><path d="M 10,10 L 30,30 M 30,10 L 10,30"></path></svg>
         </button>
         <div className="c-modal__body">
            GAME OVER
         </div>
         <div onClick={resetGame}>
           PLAY AGAIN?
         </div>
         <label>Enter Your Initials</label>
         <input maxLength={3} onChange={handleChange}></input>
       </div>
     </aside>, document.body)
}

export default GameBulletin
