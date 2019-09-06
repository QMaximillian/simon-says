import React from 'react'
import { useAudio } from '../hooks/gameReducer'
import sound from '../audio/FirstNote.wav'
import { callAll } from '../utils'

export const GameBoardPiece = ({ windowWidth, handleClick, lightUp, playMode, transform, color, dataId }) => {
    const [playing, toggle] = useAudio(sound)

    if (windowWidth <= 755) {
        return (
            <svg style={transform} className="green" pointerEvents="none" width="200" height="200" viewBox="0 0 250 250">
                <path onClick={(e) => handleClick(Number(e.target.dataset.id))} d="M4 4H246V246H4V4Z" stroke={lightUp ? "gold" : "black"} strokeWidth={lightUp ? "8px" : "1px"} data-id={dataId} pointerEvents="all" fill={color} />
            </svg>
        )
    } else {
        return (
          <svg
            style={transform}
            pointerEvents="none"
            width="252"
            height="251"
            viewBox="0 0 252 251"
            fill="none"
          >
            <path
              onClick={
                playMode
                  ? event =>
                      callAll(
                        toggle(),
                        handleClick(Number(event.target.dataset.id))
                      )
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
