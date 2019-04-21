import React, { useEffect } from 'react'
import { useAudio } from '../hooks/gameReducer'



export const GreenPiece = ({ sound, handleClick, lightUp, playMode }) => {


         const [setPlaying] = useAudio(sound);

       

    useEffect(() => {
        lightUp ? setPlaying(true) : setPlaying(false)
    })

    return (
        <svg pointerEvents="none" width="252" height="251" viewBox="0 0 252 251" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path onClick={playMode ? (event) => handleClick(Number(event.target.dataset.id)) : null} data-id="1" pointerEvents="all"
                stroke={lightUp ? "gold" : "black"} strokeMiterlimit="10" strokeWidth={lightUp ? "8px" : "1px" }
                d="M241.296 11V145.167C188.641 145.167 145.999 187.267 145.999 239.254H10C10 113.273 113.588 11 241.296 11Z" fill="lime" />
        </svg>
    )
}
