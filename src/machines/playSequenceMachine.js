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
      initial: 'RED_PIECE',
      entry: ['dispatchWatchModePattern'],
      states: {
        
          RED_PIECE: {
            entry: 'redPieceOn'
          },
          BLUE_PIECE: {
            target: 'bluePieceOn'
          },
          YELLOW_PIECE: {
            target: 'yellowPieceOn'
          },
          GREEN_PIECE: {
            target: 'greenPieceOn'
          },
      }
    },
  }
}, {
  actions: {
    redPieceOn: assign({
      lightUpRed: () => true,
      redAudio: (context) => context.redAudio.play()
    }),
    yellowPieceOn: assign({
      lightUpYellow: () => true,
      yellowAudio: (context) => context.yellowAudio.play()
    }),
    bluePieceOn: assign({
      lightUpBlue: () => true,
      blueAudio: (context) => context.blueAudio.play()
    }),
    greenPieceOn: assign({
      lightUpGreen: () => true,
      greenAudio: (context) => context.greenAudio.play()
    }),
    dispatchWatchModePattern: (context, event) => {
      let iterator = 0
      while (iterator < context.gameDispatchSequence) {
        
        switch (context.gameDispatchSequence){
          case 1:
            
            iterator++
            break;
          case 2:
            send("YELLOW_PIECE")
            iterator++
            break;
          case 3:
            send("BLUE_PIECE")
            iterator++
            break;
          case 4:
            send("GREEN_PIECE")
            iterator++
            break;
        default:
          break; 
        }
      }
    }
}
})