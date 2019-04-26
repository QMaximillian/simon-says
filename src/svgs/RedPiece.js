import React, { useEffect } from 'react'
// import { useAudio } from '../hooks/gameReducer'
import sound from '../audio/SecondNote.wav'

export const RedPiece = ({ windowWidth, handleClick, lightUp, playMode }) => {
    

    const audio = new Audio(sound)

    useEffect(() => {
        lightUp ? audio.play() : audio.pause()
    })

    if (windowWidth <= 755) {
        return (
            <svg width="250" height="250" viewBox="0 0 250 250">
                <path d="M4 4H246V246H4V4Z" stroke={lightUp ? "gold" : "black"} strokeWidth={lightUp ? "8px" : "1px"} fill="red" />
            </svg>
        )
    } else {
        return (
        <svg 
            pointerEvents="none" 
            width="250"
            height="244" 
            viewBox="0 0 250 244" 
        >
            <path 
                onClick={playMode ? (event) => handleClick(Number(event.target.dataset.id)) : null} 
                data-id="2" 
                pointerEvents="all" 
                fill="red"
                    strokeWidth={lightUp ? "8px" : "1px"}
                    stroke={lightUp ? "gold" : "black"} 
                d="M8 4V138.018C61.271 138.018 104.411 180.071 104.411 232H242C242 106.159 137.201 4 8 4Z" 
                />
        </svg>
        )
    }
}