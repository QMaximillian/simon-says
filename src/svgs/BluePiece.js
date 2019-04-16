import React, { useEffect } from 'react'
import { useAudio } from '../hooks/gameReducer'

export const BluePiece = ({ sound, handleClick, lightUp, playMode }) => {
    
  const [setPlaying] = useAudio(sound);

  useEffect(() => {
    lightUp ? setPlaying(true) : setPlaying(false);
  });
  
  return (
      <svg
        onClick={
          playMode
            ? event => handleClick(Number(event.target.dataset.id))
            : null
        }
        pointerEvents="none"
        width="241"
        height="238"
        viewBox="0 0 241 238"
        fill="#36D033"
      >
        <g filter="url(#filter0_d)">
          <path
            data-id="4"
            pointerEvents="all"
            className="button"
            d="M5 229V94.833C57.6554 94.833 100.297 52.733 100.297 0.746002H236.296C236.296 126.727 132.708 229 5 229Z"
            fill="blue" // {/*lightUp ? "white" : "blue"*/}
            stroke={lightUp ? "gold" : "black"}
            strokeWidth="8px"
            strokeMiterlimit="10"
          />
        </g>
        <defs>
          <filter
            id="filter0_d"
            x="0"
            y="0"
            width="241"
            height="238"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow"
              result="shape"
            />
            <feMerge />
          </filter>
        </defs>
      </svg>
    );
}
