import React, { useEffect, useState } from 'react'
import { useSpring, animated } from 'react-spring'


const GameBulletin = ({setLevelUp, levelUp, levelNumber, fade}) => {
    const props = useSpring({ to: {opacity: 1}, from: { opacity: 0}, delay: 1000})


    

    useEffect(() => {
      if (levelUp === true) {
        window.setTimeout(function createFade(){ return setLevelUp(false) }, 2000)
      }

      // if (levelUp === true) {
      //   
      // }
    }, [levelNumber])



  return(
    <>
    {console.log(props)}
    <animated.div style={props} className="simon-says-bulletin">
      <h4>LEVEL {levelNumber}</h4>
      </animated.div>
        {levelUp ? <animated.h4 style={props}>LEVEL UP!</animated.h4> : null}
    


    </>
  )
}

export default GameBulletin
