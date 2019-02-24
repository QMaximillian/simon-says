import React, { useEffect, useState } from 'react'
import { useSpring, animated } from 'react-spring'


const GameBulletin = ({levelNumber}) => {
    const props = useSpring({ to: {opacity: 1}, from: { opacity: 0}, delay: 1000})
    const levelUpBulletin = useSpring({ to: {opacity: 0}})

    const [levelUp, setLevelUp] = useState(false)

    useEffect(() => {
      if (levelNumber !== 1) {
        setLevelUp(true)
      }
    }, [levelNumber, levelUp])

  return(
    <>
    {console.log(props)}
    <animated.div style={props} className="simon-says-bulletin">
      <h4>LEVEL {levelNumber}</h4>
      {levelUp ? <animated.h4>LEVEL UP!</animated.h4> : null}
    </animated.div>


    </>
  )
}

export default GameBulletin
