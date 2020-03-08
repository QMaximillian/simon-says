import React from 'react'
import { Canvas } from 'react-three-fiber'

export default function SpaceBackground({children}){
  
  return (<div>
    
    <Canvas

  ><ambientLight/>
  <pointLight position={[10, 10, 10]}/>
  </Canvas>
  {children}

  </div>
  )
}