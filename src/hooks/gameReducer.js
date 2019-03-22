export const NEXT_LEVEL = 'NEXT_LEVEL'
export const CLICK = 'CLICK'
export const MAIN_GAME_LOADED = 'MAIN_GAME_LOADED'
export const RESET_LEVEL_UP = 'RESET_LEVEL_UP'
export const LIGHT_UP_GREEN = 'LIGHT_UP_GREEN'

export const gameReducer = (state, action) => {
  switch (action.type) {
    case NEXT_LEVEL:
    return {
      level: [...state.level, Math.floor(Math.random() * 4) + 1],
      fade: true,
      levelUp: false,
      index: state.index++,
      gameArray: [],
      levelNumber: ++state.levelNumber,
      available: state.available
    };
    case CLICK:
    return {
      gameArray: [...state.gameArray, action.value],
      index: state.index++,
      levelNumber: state.levelNumber,
      level: state.level,
      available: state.available,
    };
    case MAIN_GAME_LOADED: 
    return {
      available: true
    };
    case RESET_LEVEL_UP:
    return {
      level: state.level,
      levelUp: true,
      fade: true,
      gameArray: [],
      available: state.available,
      levelNumber: state.levelNumber
    };
    case LIGHT_UP_GREEN:
    return {
      level: state.level,
      levelUp: false,
      fade: false,
      gameArray: state.gameArray,
      available: state.available,
      levelNumber: state.levelNumber,
      lightUp: true,
    };
    default:
      return state
  }
}
