import React, { useEffect } from 'react'

import sound from '../audio/FirstNote.wav'


export const GreenPiece = ({ windowWidth, handleClick, lightUp, playMode }) => {

    const audio = new Audio(sound)
  
    useEffect(() => {
         lightUp ? audio.play() : audio.pause() 
    })

    if (windowWidth <= 755) {
        return (
            <svg width="250" height="250" viewBox="0 0 250 250">
                <path d="M4 4H246V246H4V4Z" stroke={lightUp ? "gold" : "black"} strokeWidth={lightUp ? "8px" : "1px"} fill="lime" />
            </svg>
        )
    } else {
        return (
            <svg pointerEvents="none" width="252" height="251" viewBox="0 0 252 251" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path onClick={playMode ? (event) => handleClick(Number(event.target.dataset.id)) : null} data-id="1" pointerEvents="all"
                    stroke={lightUp ? "gold" : "black"} strokeMiterlimit="10" strokeWidth={lightUp ? "8px" : "1px" }
                    d="M241.296 11V145.167C188.641 145.167 145.999 187.267 145.999 239.254H10C10 113.273 113.588 11 241.296 11Z" fill="lime" />
            </svg>
        )
    }
}
