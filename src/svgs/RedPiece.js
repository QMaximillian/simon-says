import React, { useEffect } from 'react'
import { useAudio } from '../hooks/gameReducer'

export const RedPiece = ({ handleClick, lightUp, playMode, sound }) => {
    

      const [setPlaying] = useAudio(sound);

    useEffect(() => { 
        lightUp ? setPlaying(true) : setPlaying(false);
    });

    return (
        <svg pointerEvents="none" width="241" height="238" viewBox="0 0 241 238">

        <g filter="url(#filter0_d)">
                <path onClick={playMode ? (event) => handleClick(Number(event.target.dataset.id)) : null} data-id="2" pointerEvents="all" d="M4.99996 1V135.167C57.6554 135.167 100.297 177.267 100.297 229.254H236.296C236.296 103.273 132.708 1 4.99996 1Z" fill="red" stroke={lightUp ? "gold" : "black"} strokeMiterlimit="10" strokeWidth="8px"/>
        </g>
        
        <defs>
        <filter id="filter0_d" x="0.499939" y="0.5" width="240.296" height="237.254" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
        <feOffset dy="4"/>
        <feGaussianBlur stdDeviation="2"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
        </filter>
        </defs>
        </svg>
    )
}