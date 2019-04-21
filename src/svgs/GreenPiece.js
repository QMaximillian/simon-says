import React, { useEffect } from 'react'
import { useAudio } from '../hooks/gameReducer'



export const GreenPiece = ({ sound, handleClick, lightUp, playMode }) => {


         const [setPlaying] = useAudio(sound);

       

    useEffect(() => {
        lightUp ? setPlaying(true) : setPlaying(false)
    })

    // return (

    //     <svg pointerEvents="none" width="241" height="238" viewBox="0 0 241 238" fill="none">

    //     <path onClick={playMode ? (event) => handleClick(Number(event.target.dataset.id)) : null} data-id="1" pointerEvents="all" fill="lime"
    //                 stroke={lightUp ? "gold" : "black"} strokeMiterlimit="10" strokeWidth="8px"/>
    //     </svg>
    // )

    return (
        <svg width="252" height="251" viewBox="0 0 252 251" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path onClick={playMode ? (event) => handleClick(Number(event.target.dataset.id)) : null} data-id="1" pointerEvents="all" fill="lime"
                stroke={lightUp ? "gold" : "black"} strokeMiterlimit="10" strokeWidth="8px" 
                d="M241.296 11V145.167C188.641 145.167 145.999 187.267 145.999 239.254H10C10 113.273 113.588 11 241.296 11Z" fill="lime" />
            <path d="M241.296 11V145.167C188.641 145.167 145.999 187.267 145.999 239.254H10C10 113.273 113.588 11 241.296 11Z" stroke="black" stroke-width="8" stroke-miterlimit="10" />
        </svg>
    )
}
