import React, { useEffect } from 'react'
import { useAudio } from '../hooks/gameReducer'

export const YellowPiece = ({ sound, handleClick, lightUp, playMode }) => {

    const [setPlaying] = useAudio(sound);

    useEffect(() => {
      lightUp ? setPlaying(true) : setPlaying(false);
    })

  return (
    <svg 
      pointerEvents="none" 
      width="247" 
      height="240" 
      viewBox="0 0 247 240" 
    >
      <path 
        onClick={playMode ? (event) => handleClick(Number(event.target.dataset.id)) : null}
        data-id="1" 
        pointerEvents="all"
        stroke={lightUp ? "gold" : "black"} 
        strokeMiterlimit="10" 
        strokeWidth={lightUp ? "8px" : "1px"}
        d="M239 228V96.3335C186.412 96.3335 143.825 55.0181 143.825 4H7.99999C7.99999 127.633 111.455 228 239 228Z" 
        fill="yellow" 
      />
    </svg>
  )
}