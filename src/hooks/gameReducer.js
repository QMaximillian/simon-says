export const NEXT_LEVEL = 'NEXT_LEVEL'
export const CLICK = 'CLICK'
export const MAIN_GAME_LOADED = 'MAIN_GAME_LOADED'
export const RESET_LEVEL_UP = 'RESET_LEVEL_UP'
export const LIGHT_UP_GREEN = "LIGHT_UP_GREEN";
export const LIGHT_UP_RED = "LIGHT_UP_RED";
export const LIGHT_UP_BLUE = "LIGHT_UP_BLUE";
export const LIGHT_UP_YELLOW = "LIGHT_UP_YELLOW";
export const RESET_LIGHT_UP = "RESET_LIGHT_UP";
export const PLAY_MODE = "PLAY_MODE";
export const WATCH_MODE = "WATCH_MODE";




export const playModeReducer = (state, action) => {
  switch (action.type) {
    // playMode
    case NEXT_LEVEL:
      return {
        ...state,
        level: [...state.level, Math.floor(Math.random() * 4) + 1],
        levelUp: false,
        levelNumber: ++state.levelNumber,
      };
    case RESET_LEVEL_UP:
      return {
        ...state,
        level: state.level,
        levelUp: true,
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
      available: true,
      gameArray: []
    };
    // watchMode
    case LIGHT_UP_GREEN:
      return {
        ...state,
        lightUpGreen: true,
        lightUpRed: false,
        lightUpYellow: false,
        lightUpBlue: false,

      };
    case LIGHT_UP_RED:
      return {
        ...state,
        lightUpGreen: false,
        lightUpRed: true,
        lightUpYellow: false,
        lightUpBlue: false
      };
    case LIGHT_UP_BLUE:
      return {
        ...state,
        lightUpGreen: false,
        lightUpRed: false,
        lightUpYellow: false,
        lightUpBlue: true
      };
    case LIGHT_UP_YELLOW:
      return {
        ...state,
        lightUpGreen: false,
        lightUpRed: false,
        lightUpYellow: true,
        lightUpBlue: false
      };
    case RESET_LIGHT_UP:
      return {
        ...state,
        lightUpGreen: false,
        lightUpRed: false,
        lightUpYellow: false,
        lightUpBlue: false
      }
    case PLAY_MODE:
      return {
        ...state,
        watchMode: false,
        playMode: true,
      }
    case WATCH_MODE: 
      return {
        ...state,
        watchMode: true,
        playMode: false,
      }
    default:
      return state
  }
}
