export const NEXT_LEVEL = 'NEXT_LEVEL'
export const CLICK = 'CLICK'
export const MAIN_GAME_LOADED = 'MAIN_GAME_LOADED'

export const gameReducer = (state, action) => {
  switch (action.type) {
    case NEXT_LEVEL:
    return {
      level: [state.level, Math.floor(Math.random() * 4) + 1],
      fade: true,
      levelUp: true,
      index: state.index++,
      gameArray: [],
      levelNumber: ++state.levelNumber
    }
    case CLICK:
    return {
      gameArray: [...state.gameArray, action.value],
      index: state.index++,
      levelNumber: state.levelNumber,
      level: state.level,
    }
    case MAIN_GAME_LOADED: 
    return {
      available: true
    }
    default:
      return state
  }
}
