export const UPDATE_LEVEL = 'UPDATE_LEVEL'

export const gameReducer = (state, action) -> {
  switch (action.type) {
    case UPDATE_LEVEL:
      return;
    default:
      return state
  }
}
