import React from 'react'
import { useMachine } from '@xstate/react'

import {gameMachine} from '../machines/gameMachine.js'
import {playSequenceMachine} from '../machines/playSequenceMachine.js'
export default function GameContainer(){

  const [current, send] = useMachine(gameMachine)
  // const [playSequenceCurrent, playSequenceSend] = useMachine(playSequenceMachine)

  return (<><button onClick={() => send("WATCH_MODE")}>
    {current.matches('gameOn') ? "On" : "Off" }
  </button>
  <div>
    {/* {playSequenceCurrent.context.lightUpRed ? 'red' : null} */}
    </div></>)
}