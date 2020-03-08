import React from 'react'
// import { useAudio } from '../hooks/gameReducer'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'
import { useLoader } from 'react-three-fiber'


export const GameBoardPieceTHREEjs = ({ toggle, watchMode, windowWidth, handleClick, lightUp, playMode, transform, color, dataId}) => {

  const mesh = React.useRef()

  if (windowWidth < 755) {
        return (
          <svg  className="green" pointerEvents="none" width="230" height="230">
            <rect onClick={playMode
              ?
              event => {
                toggle()
                handleClick(Number(event.target.dataset.id))
              }
              : null}x="10" y="10" width="210" height="210" data-id={dataId} pointerEvents="all"  stroke={lightUp ? "gold" : "black"} fill={color} strokeWidth={lightUp ? "8px" : "1px"} />
            </svg>
        )
    } else {
      let svgMarkup = `
      <svg
      style={transform}
      pointerEvents="none"
      width="230"
      height="230"
      viewBox="0 0 252 251"
      fill="none"
    >
      <path
        onClick={
          playMode
            ? 
            event => {
                  toggle()
                  handleClick(Number(event.target.dataset.id))
            }
            : null
        }
        data-id={dataId}
        pointerEvents="all"
        stroke={lightUp ? "gold" : "black"}
        strokeMiterlimit="10"
        strokeWidth={lightUp ? "8px" : "1px"}
        d="M241.296 11V145.167C188.641 145.167 145.999 187.267 145.999 239.254H10C10 113.273 113.588 11 241.296 11Z"
        fill={color}
      />
    </svg>
      `


        return (
          <>
          <Svg url={svgMarkup}/>
          <mesh 
            // {...props}
            ref={mesh}
            scale={[1.5, 1.5, 1.5]}
            onClick={() => console.log('clicked!')}
            >

          </mesh>
          </>
          
          
        );
    }
}

function Svg({url}){
  const { paths } = useLoader(SVGLoader, url)

  return <div>
    {console.log(paths)}
  </div>
}

// Prior usage
export const GameBoardPiece = ({ toggle, watchMode, windowWidth, handleClick, lightUp, playMode, transform, color, dataId }) => {

  if (windowWidth < 755) {
        return (
          <svg  className="green" pointerEvents="none" width="230" height="230">
            <rect onClick={playMode
              ?
              event => {
                toggle()
                handleClick(Number(event.target.dataset.id))
              }
              : null}x="10" y="10" width="210" height="210" data-id={dataId} pointerEvents="all"  stroke={lightUp ? "gold" : "black"} fill={color} strokeWidth={lightUp ? "8px" : "1px"} />
            </svg>
        )
    } else {
        return (
          <svg
            style={transform}
            pointerEvents="none"
            width="230"
            height="230"
            viewBox="0 0 252 251"
            fill="none"
          >
            <path
              onClick={
                playMode
                  ? 
                  event => {
                        toggle()
                        handleClick(Number(event.target.dataset.id))
                  }
                  : null
              }
              data-id={dataId}
              pointerEvents="all"
              stroke={lightUp ? "gold" : "black"}
              strokeMiterlimit="10"
              strokeWidth={lightUp ? "8px" : "1px"}
              d="M241.296 11V145.167C188.641 145.167 145.999 187.267 145.999 239.254H10C10 113.273 113.588 11 241.296 11Z"
              fill={color}
            />
          </svg>
        );
    }
}
