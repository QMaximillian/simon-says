import React from 'react'

export const GreenPiece = ({ handleClick }) => {

    return (
        <svg pointerEvents="none" width="241" height="238" viewBox="0 0 241 238" fill="none">
        <g filter="url(#filter0_d)">
        <path onClick={(event) => handleClick(+event.target.dataset.id)}data-id="1" pointerEvents="all" d="M236.296 1V135.167C183.641 135.167 140.999 177.267 140.999 229.254H5.00003C5.00003 103.273 108.588 1 236.296 1Z" fill="lime"
        stroke="black" strokeMiterlimit="10"/>
        </g>
        <defs>
        <filter id="filter0_d" x="0.500031" y="0.5" width="240.296" height="237.254" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
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
