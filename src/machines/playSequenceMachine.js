import { Machine } from 'xstate'

export const playSequenceMachine = Machine({
  id: 'playSequence',
  initial: 'runActivities',
  states: {
    runActivities: {
      entry: ['dispatchWatchMode']
    }
  }
}, {
  activities: {
    dispatchWatchMode() {
      // Run watchMode sequence here
      // When sequence is ended, transition to playMode in parent machine
    }
  }
})