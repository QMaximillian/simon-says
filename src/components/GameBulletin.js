import React, { useEffect } from 'react'

import { useSpring, animated, useTransition } from "react-spring";
import { gameReducer } from '../hooks/gameReducer'



const GameBulletin = ({ levelUp, levelNumber, fade }) => {
    const props = useSpring({ to: {opacity: 1}, from: { opacity: 0}, delay: 1000})

  // const [show, set] = useState(false)
  const transitions = useTransition(levelUp, null, {
    from: { position: 'absolute', opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })
  
    

    useEffect(() => {
      if (levelUp === true) {
        window.setTimeout(function createFade(){ return {} }, 2000)
        return 
    }})



  return(
    <>
    {console.log(props)}
    <animated.div style={props} className="simon-says-bulletin">
      <h4>LEVEL {levelNumber}</h4>
      </animated.div>
      {transitions.map(({item, key, props }) =>
    item && <animated.div style={props}>LEVEL UP</animated.div>
  )}
        
    
    
    </>
  )
}

export default GameBulletin
