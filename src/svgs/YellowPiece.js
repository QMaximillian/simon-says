// import React from 'react'
// // import { useAudio } from '../hooks/gameReducer'
// // import sound from '../audio/ThirdNote.wav'

// export const YellowPiece = ({ windowWidth, handleClick, lightUp, playMode }) => {

//   // const audio = new Audio(sound)

//   // useEffect(() => {
//   //   lightUp ? audio.play() : audio.pause() 
//   // })


//   if (windowWidth <= 755) {
//     return (
//         <svg
//           className="yellow"
//           pointerEvents="none"
//           width="200"
//           height="200"
//           viewBox="0 0 250 250"
//         >
//           <path
//             onClick={e => handleClick(Number(e.target.dataset.id))}
//             data-id="3"
//             pointerEvents="all"
//             d="M4 4H246V246H4V4Z"
//             stroke={lightUp ? "gold" : "black"}
//             strokeWidth={lightUp ? "8px" : "1px"}
//             fill="yellow"
//           />
//         </svg>
//     );
//   } else {
//     return (
//       <svg 
//         pointerEvents="none" 
//         width="247" 
//         height="240" 
//         viewBox="0 0 247 240" 
//       >
//         <path 
//           onClick={(e) => handleClick(Number(e.target.dataset.id))}
//           data-id="3" 
//           pointerEvents="all"
//           stroke={lightUp ? "gold" : "black"} 
//           strokeMiterlimit="10" 
//           strokeWidth={lightUp ? "8px" : "1px"}
//           d="M239 228V96.3335C186.412 96.3335 143.825 55.0181 143.825 4H7.99999C7.99999 127.633 111.455 228 239 228Z" 
//           fill="yellow" 
//         />
//       </svg>
//     )
//   }
// }