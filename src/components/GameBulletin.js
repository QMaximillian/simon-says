import React from 'react'
import ReactDOM from 'react-dom';
import { useSpring, animated, useTransition } from "react-spring";



const GameBulletin = ({ levelUp, levelNumber, fade, gameOver }) => {
    const props = useSpring({ to: {opacity: 1}, from: { opacity: 0}, delay: 1000})

  // const [show, set] = useState(false)
  const transitions = useTransition(levelUp, null, {
    from: { position: 'absolute', opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  if (!gameOver) {
    return (
      <>
      <animated.div style={props} className="simon-says-bulletin">
        <h4>LEVEL {levelNumber}</h4>
        {transitions.map(({item, key, props }) =>
          item && <animated.div key={key}>LEVEL UP</animated.div>
      
        )} 
        </animated.div>
      </>
    )
  } 
  else {
    return (
      <HighScoreList />
    )
  }
  
}

const HighScoreList = () => {
  return (
    ReactDOM.createPortal(<div>GAME OVER</div>, document.body)
  )
}

export default GameBulletin
