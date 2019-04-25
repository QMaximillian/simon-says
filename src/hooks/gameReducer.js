export const NEXT_LEVEL = 'NEXT_LEVEL'
export const CLICK = 'CLICK'
export const MAIN_GAME_LOADED = 'MAIN_GAME_LOADED'
export const RESET_LEVEL_UP = 'RESET_LEVEL_UP'
export const GREEN_ON = "GREEN_ON";
export const RED_ON = "RED_ON";
export const BLUE_ON = "BLUE_ON";
export const YELLOW_ON = "YELLOW_ON";
export const COLOR_BUTTON_OFF = "COLOR_BUTTON_OFF";
export const PLAY_MODE = "PLAY_MODE";
export const WATCH_MODE = "WATCH_MODE";
export const GAME_OVER_TOGGLE = "GAME_OVER_TOGGLE";
export const RESET_GAME = "RESET_GAME"
export const MODAL_TOGGLE = "MODAL_TOGGLE"





export const playModeReducer = (state, action) => {
  switch (action.type) {
    // playMode
    case NEXT_LEVEL:
      return {
        ...state,
        level: [...state.level, Math.floor(Math.random() * 4) + 1],
        levelUp: true,
        levelNumber: ++state.levelNumber,
      };
    case RESET_LEVEL_UP:
      return {
        ...state,
        level: state.level,
        // levelUp: false,
        index: -1,
        fade: true,
        gameArray: [],
        available: state.available,
        levelNumber: state.levelNumber
      };
    case CLICK:
      return {
        ...state,
        gameArray: [...state.gameArray, action.value],
        index: ++state.index,
        levelNumber: state.levelNumber,
        level: state.level,
        available: state.available,
        levelUp: false,
      };
    case MAIN_GAME_LOADED: 
    return {
      ...state,
      available: true,
      gameArray: []
    };
    // watchMode
    case GREEN_ON:
      return {
        ...state,
        lightUpGreen: true,
        lightUpRed: false,
        lightUpYellow: false,
        lightUpBlue: false,
        greenAudio: state.greenAudio.play()
      }
    case RED_ON:
      return {
        ...state,
        lightUpGreen: false,
        lightUpRed: true,
        lightUpYellow: false,
        lightUpBlue: false,
        redAudio: state.redAudio.play(),
        
      };
    case BLUE_ON:
      return {
        ...state,
        lightUpGreen: false,
        lightUpRed: false,
        lightUpYellow: false,
        lightUpBlue: true,
        blueAudio: state.blueAudio.play(),

      };
    case YELLOW_ON:
      return {
        ...state,
        lightUpGreen: false,
        lightUpRed: false,
        lightUpYellow: true,
        lightUpBlue: false,
        yellowAudio: state.yellowAudio.play(),
      };
    case COLOR_BUTTON_OFF:
      return {
        ...state,
        lightUpGreen: false,
        lightUpRed: false,
        lightUpYellow: false,
        lightUpBlue: false,
        greenAudio: state.greenAudio,
        redAudio: state.redAudio,
        yellowAudio: state.yellowAudio,
        blueAudio: state.blueAudio

      }
    case PLAY_MODE:
      return {
        ...state,
        watchMode: false,
        playMode: true,

        // Game over needs to become false 
        // when the user submits or refuses to submit their initials
      };
    case WATCH_MODE: 
      return {
        ...state,
        watchMode: true,
        playMode: false,

        
      }
    case GAME_OVER_TOGGLE: 
      return {
        ...state,
        gameOver: true,
        playMode: false,
        watchMode: false
      }
    case RESET_GAME:
        return {
          ...action.value
        }
    case MODAL_TOGGLE:
        return {
          ...state,
          showLegendModal: !state.showLegendModal
        }
    default:
      return state
  }
}