import React from 'react'
import { useMachine } from '@xstate/react'

import {gameMachine} from '../machines/gameMachine.js'
export default function GameContainer(){

  const [current, send] = useMachine(gameMachine)

  return (<button onClick={() => send("WATCH_MODE")}>
    {current.matches('gameOn') ? "On" : "Off" }
  </button>)
}