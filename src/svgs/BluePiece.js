import React, { useEffect } from 'react'
import { useAudio } from '../hooks/gameReducer'

export const BluePiece = ({ sound, handleClick, lightUp, playMode }) => {
    
  const [setPlaying] = useAudio(sound);

  useEffect(() => {
    lightUp ? setPlaying(true) : setPlaying(false);
  });
  
  // return (
  //     <svg
  //       onClick={
  //         playMode
  //           ? event => handleClick(Number(event.target.dataset.id))
  //           : null
  //       }
  //       pointerEvents="none"
  //       width="241"
  //       height="238"
  //       viewBox="0 0 241 238"
  //       fill="#36D033"
  //     >
  //       <g filter="url(#filter0_d)">
  //         <path
  //           d="M5 229V94.833C57.6554 94.833 100.297 52.733 100.297 0.746002H236.296C236.296 126.727 132.708 229 5 229Z"
  //           data-id="4"
  //           pointerEvents="all"
  //           className="button"
  //           fill="blue" // {/*lightUp ? "white" : "blue"*/}
  //           stroke={lightUp ? "gold" : "black"}
  //           strokeWidth="8px"
  //           strokeMiterlimit="10"
  //         />
  //       </g>
  //       <defs>
  //         <filter
  //           id="filter0_d"
  //           x="0"
  //           y="0"
  //           width="241"
  //           height="238"
  //           filterUnits="userSpaceOnUse"
  //           colorInterpolationFilters="sRGB"
  //         >
  //           <feFlood floodOpacity="0" result="BackgroundImageFix" />
  //           <feColorMatrix
  //             in="SourceAlpha"
  //             type="matrix"
  //             values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
  //           />
  //           <feOffset dy="4" />
  //           <feGaussianBlur stdDeviation="2" />
  //           <feColorMatrix
  //             type="matrix"
  //             values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
  //           />
  //           <feBlend
  //             mode="normal"
  //             in2="BackgroundImageFix"
  //             result="effect1_dropShadow"
  //           />
  //           <feBlend
  //             mode="normal"
  //             in="SourceGraphic"
  //             in2="effect1_dropShadow"
  //             result="shape"
  //           />
  //           <feMerge />
  //         </filter>
  //       </defs>
  //     </svg>
  //   );

  // return (
  //   <svg pointerEvents="none" width="252" height="251" viewBox="0 0 252 251" fill="none">
  //     <path data-id="4"
  //           pointerEvents="all"
  //           className="button"
  //           fill="blue"
  //           stroke={lightUp ? "gold" : "black"}
  //           strokeWidth="8px"
  //           strokeMiterlimit="10"d="M10 239.254V105.087C62.6554 105.087 105.297 62.987 105.297 11H241.296C241.296 136.981 137.708 239.254 10 239.254Z" fill="blue" />
  //     <path d="M10 239.254V105.087C62.6554 105.087 105.297 62.987 105.297 11H241.296C241.296 136.981 137.708 239.254 10 239.254Z" stroke="black" stroke-width="8" stroke-miterlimit="10" />
  //   </svg>
  // )

  return (
  <svg 
    pointerEvents="none" 
    width="250" 
    height="240" 
    viewBox="0 0 250 240" 
  >
    <path 
      data-id="4"
      pointerEvents="all"
      className="button"
      stroke={lightUp ? "gold" : "black"}
      stroke-width={lightUp ? "8px" : "1px"} 
      d="M8 228V96.3335C61.271 96.3335 104.411 55.0181 104.411 4H242C242 127.633 137.201 228 8 228Z" 
    />
    <path 
      fill="blue"
      d="M8 228V96.3335C61.271 96.3335 104.411 55.0181 104.411 4H242C242 127.633 137.201 228 8 228Z" 
    />
  </svg>
  )
}
