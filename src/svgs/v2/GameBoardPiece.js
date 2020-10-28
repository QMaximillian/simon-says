import React, { useEffect } from 'react'


export const GameBoardPiece = ({  windowWidth, setIndex, modeEnum, lightUp, fill, transform, handleColorSetter, setPlayArray }) => {

  const colorKeys = {
    "red": 87,
    "blue": 83,
    "yellow": 65,
    "lime": 81
  }

  function handlePlayAction(){
    if (modeEnum === 'PLAY'){
      handleColorSetter(color => ({...color, sound: true, lightUp: true})) 
      setPlayArray(curr => {
        return [...curr, fill]
      })
      setIndex(i => ++i) 
    }
  }

  function handleUseKeys(event){
    if (colorKeys[fill] === event.keyCode) {
      handlePlayAction()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleUseKeys)

    return function cleanup(){
      document.removeEventListener('keydown', handleUseKeys)
    }
  }, [])

  if (windowWidth < 755) {
        return (
          <svg  className="green"  width="230" height="230" fillOpacity=".9">
            <rect onClick={handlePlayAction}
              x="10" y="10" width="210" height="210" pointerEvents="all"  stroke={lightUp ? "gold" : "black"} strokeWidth={lightUp ? "8px" : "1px"} fill={fill} />
            </svg>
        )
    } else {
       
    
    
    return (
          <svg
            style={transform}
            pointerEvents="none"
            width="230"
            height="230"
            viewBox="0 0 252 251"
            fill="none"
            fillOpacity=".9"
          >
            <path
              onClick={handlePlayAction}
              pointerEvents="all"
              stroke={lightUp ? "gold" : "black"}
              strokeWidth={lightUp ? "8px" : "1px"}
              d="M241.296 11V145.167C188.641 145.167 145.999 187.267 145.999 239.254H10C10 113.273 113.588 11 241.296 11Z"
              fill={fill}
            />
          </svg>
        );
    
    
    }
}
