import React from 'react'


export const GameBoardPieceGenerator = ({ isWatchMode, lightUp, isPlayMode, fill, dataId, transform }) => {
  

  // if (windowWidth < 755) {
        return (
          <svg  className="green" pointerEvents="none" width="230" height="230">
            <rect onClick={() => {} 
            // isPlayMode
            //   ?
            //   event => {
            //     toggle()
            //     handleClick(Number(event.target.dataset.id))
            //   }
            //   : null
            }
              x="10" y="10" width="210" height="210" pointerEvents="all"  stroke={lightUp ? "gold" : "black"} strokeWidth={lightUp ? "8px" : "1px"} fill={fill} data-id={dataId} />
            </svg>
        )
    // } else {
       
    
    
    // return (
    //       <svg
    //         style={transform}
    //         pointerEvents="none"
    //         width="230"
    //         height="230"
    //         viewBox="0 0 252 251"
    //         fill="none"
    //       >
    //         <path
    //           onClick={
    //             isPlayMode
    //               ? 
    //               event => {
    //                     toggle()
    //                     handleClick(Number(event.target.dataset.id))
    //               }
    //               : null
    //           }
    //           data-id={dataId}
    //           pointerEvents="all"
    //           stroke={lightUp ? "gold" : "black"}
    //           strokeMiterlimit="10"
    //           strokeWidth={lightUp ? "8px" : "1px"}
    //           d="M241.296 11V145.167C188.641 145.167 145.999 187.267 145.999 239.254H10C10 113.273 113.588 11 241.296 11Z"
    //           fill={color}
    //         />
    //       </svg>
    //     );
    
    
    // }
}