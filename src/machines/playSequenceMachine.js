import { Machine, send, assign } from 'xstate'
// import { assign } from 'xstate/lib/actionTypes';
import greenSound from '../audio/FirstNote.mp3'
import redSound from '../audio/SecondNote.mp3'
import yellowSound from '../audio/ThirdNote.mp3'
import blueSound from '../audio/FourthNote.mp3'

const greenAudio = new Audio(greenSound)
const redAudio = new Audio(redSound)
const yellowAudio = new Audio(yellowSound)
const blueAudio = new Audio(blueSound)

export const playSequenceMachine = Machine({
  id: 'playSequence',
  initial: 'base',
  context: {
    lightUpGreen: false,
    lightUpRed: false,
    lightUpBlue: false,
    lightUpYellow: false,
    greenAudio,
    redAudio,
    yellowAudio,
    blueAudio,
  },
  states: {
    base: {
      entry: ['redPieceOn']
    },
    redPiece: {
    },
    bluePiece: {

    },
    greenPiece: {

    },
    yellowPiece: {

    },
  }
}, {
  actions: {
    redPieceOn: assign({
      lightUpRed: () => true,
      redAudio: (context) => context.redAudio.play()
    }),
    greenPiece: {

    },
    yellowPiece: {

    },
    bluePiece: {

    },
    // incrementPosition: assign({
    //   position: (context) => context.position + 1
    // }),

    // activateRed: assign({
    //   redSound: (context) => { 
    //     context.redSound.play()
    //   },
    //   lightUpRed: (context) => !context.lightUpRed
    // })
  }
})