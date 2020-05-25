import { Machine, assign } from 'xstate'
import {playSequenceMachine} from './playSequenceMachine'
import greenSound from '../audio/FirstNote.mp3'
import redSound from '../audio/SecondNote.mp3'
import yellowSound from '../audio/ThirdNote.mp3'
import blueSound from '../audio/FourthNote.mp3'

const greenAudio = new Audio(greenSound)
const redAudio = new Audio(redSound)
const yellowAudio = new Audio(yellowSound)
const blueAudio = new Audio(blueSound)

export const gameMachine = Machine({
  id: 'gameMachine',
  initial: 'gameOff',
  context: {
    levelSequence: [1, 2, 3, 4],
    gameDispatchSequence: []
  },
  states: {
    gameOn: {
     id: 'gameOn',
     states: {
       watchMode: {
         entry: ['createWatchModePattern'],
         invoke: {
           id: 'sound',
           src: playSequenceMachine,
           onDone: 'playMode',
         },
       },
       playMode: {
         on: {
           incorrect: {target: '#gameMachine.gameOver'}
         }
       },
     }
    },
    gameOff: {
      on: {
        WATCH_MODE: '#gameOn.watchMode'
      }
  },
    gameOver: {
      on: {
        RESTART_GAME: '#gameOn.watchMode'
      }
    }
  }
}, {
  actions: assign({
    // Create array of promises
  })
})






