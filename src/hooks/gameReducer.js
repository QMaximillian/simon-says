export const NEXT_LEVEL = 'NEXT_LEVEL'
export const CLICK = 'CLICK'

export const gameReducer = (state, action) => {
  switch (action.type) {
    case NEXT_LEVEL:
    return {
      level: [state.level, Math.floor(Math.random() * 4) + 1],
      fade: true,
      levelUp: true,
      index: state.index++,
      gameArray: [],
      levelNumber: state.levelNumber++
    }
    case CLICK:
    return {
      gameArray: [...state.gameArray, action.value],
      index: state.index++
    }
    default:
      return state
  }
}
