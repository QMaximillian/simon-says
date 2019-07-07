import React, { useEffect } from 'react'
import sound from '../audio/FourthNote.wav'
export const BluePiece = ({ windowWidth, handleClick, lightUp, playMode }) => {
    
  // const audio = new Audio(sound)

  // useEffect(() => {
  //   lightUp ? audio.play() : audio.pause() 
  // })

  if (windowWidth <= 755) {
        return (
          <svg className="blue" pointerEvents="none" width="200" height="200" viewBox="0 0 250 250">
                <path 
                  d="M4 4H246V246H4V4Z" 
                  stroke={lightUp ? "gold" : "black"} 
                  strokeWidth={lightUp ? "8px" : "1px"} 
                  fill="blue"
                  onClick={(event) => handleClick(Number(event.target.dataset.id))}
                  data-id="4"
                  pointerEvents="all"
                   />
            </svg>
        )
  } else {
    return (
    <svg 
      pointerEvents="none" 
      width="250" 
      height="240" 
      viewBox="0 0 250 240" 
    >
      <path 
        onClick={(event) => handleClick(Number(event.target.dataset.id))}
        fill="blue"
        data-id="4"
        pointerEvents="all"
        className="button"
        stroke={lightUp ? "gold" : "black"}
        strokeWidth={lightUp ? "8px" : "1px"}
        d="M8 228V96.3335C61.271 96.3335 104.411 55.0181 104.411 4H242C242 127.633 137.201 228 8 228Z" 
      />
    </svg>
    )
  }
}
