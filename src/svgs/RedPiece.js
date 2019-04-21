import React, { useEffect } from 'react'
import { useAudio } from '../hooks/gameReducer'

export const RedPiece = ({ handleClick, lightUp, playMode, sound }) => {
    

      const [setPlaying] = useAudio(sound);

    useEffect(() => { 
        lightUp ? setPlaying(true) : setPlaying(false);
    });

    // return (
    //     <svg pointerEvents="none" width="241" height="238" viewBox="0 0 241 238">

    //     <g filter="url(#filter0_d)">
    //             <path onClick={playMode ? (event) => handleClick(Number(event.target.dataset.id)) : null} data-id="2" pointerEvents="all" d="M4.99996 1V135.167C57.6554 135.167 100.297 177.267 100.297 229.254H236.296C236.296 103.273 132.708 1 4.99996 1Z" fill="red" stroke={lightUp ? "gold" : "black"} strokeMiterlimit="10" strokeWidth="8px"/>
    //     </g>
        
    //     <defs>
    //     <filter id="filter0_d" x="0.499939" y="0.5" width="240.296" height="237.254" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
    //     <feFlood floodOpacity="0" result="BackgroundImageFix"/>
    //     <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
    //     <feOffset dy="4"/>
    //     <feGaussianBlur stdDeviation="2"/>
    //     <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
    //     <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
    //     <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
    //     </filter>
    //     </defs>
    //     </svg>
    // )

    return (
        <svg backgroundColor="inherit" width="252" height="251" viewBox="0 0 252 251" fill="none" xmlns="http://www.w3.org/2000/svg">

            <path onClick={playMode ? (event) => handleClick(Number(event.target.dataset.id)) : null} data-id="2" pointerEvents="all" d="M9.5 12V146.167C62.1554 146.167 104.797 188.267 104.797 240.254H240.796C240.796 114.273 137.208 12 9.5 12Z" fill="red" stroke={lightUp ? "gold" : "black"} strokeMiterlimit="10" strokeWidth="8px" />
            <path d="M9.5 12V11.5H9V12H9.5ZM9.5 146.167H9V146.667H9.5V146.167ZM104.797 240.254H104.297V240.754H104.797V240.254ZM240.796 240.254V240.754H241.296V240.254H240.796ZM9 12V146.167H10V12H9ZM9.5 146.667C61.8853 146.667 104.297 188.549 104.297 240.254H105.297C105.297 187.985 62.4255 145.667 9.5 145.667V146.667ZM104.797 240.754H240.796V239.754H104.797V240.754ZM241.296 240.254C241.296 113.991 137.478 11.5 9.5 11.5V12.5C136.938 12.5 240.296 114.556 240.296 240.254H241.296Z" fill="black" />
        </svg>
    )
}