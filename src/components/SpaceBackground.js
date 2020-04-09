import React from 'react'
import { Canvas } from 'react-three-fiber'
import "../App.css"
import {GameBoardPieceTHREEjs} from '../svgs/GameBoardPiece'
export default function SpaceBackground({children}){
  
  return (
    
    <Canvas>
      {/* <ambientLight/>
  <pointLight position={[10, 10, 10]}/> */}
  <GameBoardPieceTHREEjs />
  </Canvas>


  )
}