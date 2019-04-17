import React, { useEffect } from 'react'
import { useAudio } from '../hooks/gameReducer'



export const SVGPiece = ({lightUpGreen, sound, ...props}) => {


    const [setPlaying] = useAudio(sound);



    useEffect(() => {

        lightUpGreen ? setPlaying(true) : setPlaying(false)
    })

    return props.children(lightUpGreen, sound)
}
