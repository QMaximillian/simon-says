import React, { useEffect } from 'react'
import { useAudio } from '../hooks/gameReducer'

export const YellowPiece = ({ sound, handleClick, lightUp, playMode }) => {

  const [playing, setPlaying] = useAudio(sound);

    useEffect(() => {
      lightUp || playing ? setPlaying(true) : setPlaying(false);
    })

    return (
        <svg pointerEvents="none" width="241" height="238" viewBox="0 0 241 238" fill="none" xmlns="http://www.w3.org/2000/svg">

        <g filter="url(#filter0_d)">
                <path onClick={playMode ? (event) => handleClick(Number(event.target.dataset.id)) : null} data-id="3" pointerEvents="all" d="M236.296 229.254V95.087C183.641 95.087 140.999 52.987 140.999 1.00003H5.00003C5.00003 126.981 108.588 229.254 236.296 229.254Z" fill="yellow" stroke={lightUp ? "gold" : "black"} strokeMiterlimit="10" strokeWidth="8px"/>
        </g>
        <defs>
            
        <filter id="filter0_d" x="0.500031" y="0.500031" width="240.296" height="237.254" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
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