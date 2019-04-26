import React, { useEffect, useState } from 'react'
import { useSpring, animated, useTransition } from "react-spring";
import '../App.css'





const GameBulletin = ({ levelUp, levelNumber, fade, gameOver, resetGame }) => {

  useEffect(() => {
  if (levelUp) {
    set(true)
  } else {
    set(false)
  }
})

    const props = useSpring({ to: {opacity: 1}, from: { opacity: 0}})
    const [show, set] = useState(false)
    // const reverseProps = useSpring({to: {opacity: 0}, from: { opacity: 1}})

  const transitions = useTransition(show, null, {
    from: { position: 'absolute', opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

    return (
        <animated.div style={props} className="simon-says-bulletin">

          <h4 style={{color: 'white'}}>LEVEL {levelNumber}</h4>
          {transitions.map(
            ({ item, key, props }) =>
              item && <animated.div style={props} key={key}>LEVEL UP</animated.div>
          )}
        </animated.div>

    );  
}

export default GameBulletin
