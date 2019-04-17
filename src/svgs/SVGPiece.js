import React, { useEffect } from 'react'
import { useAudio } from '../hooks/gameReducer'



export const SVGPiece = ({lightUp, sound, ...props}) => {


    const [playing, setPlaying] = useAudio(sound);



    useEffect(() => {
        lightUp || playing ? setPlaying(true) : setPlaying(false)
    })

    return props.children(lightUp, sound)
}
