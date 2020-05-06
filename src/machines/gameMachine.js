import { Machine, assign } from 'xstate'
import {playSequenceMachine} from './playSequenceMachine'

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
           onDone: 'playMode'
         },
        //  on: {
        //   PLAY_RED: { 
        //     actions: send('PLAY_RED', { to: 'sound'
        //     })
        //   }
        // }
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
  actions: {
    createWatchModePattern: assign({
      gameDispatchSequence: (context, event) => context.levelSequence
    }),
  }
})






