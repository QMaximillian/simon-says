import { useEffect, useState } from 'react'
export const NEXT_LEVEL = 'NEXT_LEVEL'
export const CLICK = 'CLICK'
export const MAIN_GAME_LOADED = 'MAIN_GAME_LOADED'
export const RESET_LEVEL_UP = 'RESET_LEVEL_UP'
export const RESET_GAME_DISPATCH = 'RESET_GAME_DISPATCH'
export const GREEN_ON = "GREEN_ON";
export const RED_ON = "RED_ON";
export const BLUE_ON = "BLUE_ON";
export const YELLOW_ON = "YELLOW_ON";
export const SOUND_ON = "SOUND_ON";
export const COLOR_BUTTON_OFF = "COLOR_BUTTON_OFF";
export const PLAY_MODE = "PLAY_MODE";
export const WATCH_MODE = "WATCH_MODE";
export const GAME_OVER_TOGGLE = "GAME_OVER_TOGGLE";
export const RESET_GAME = "RESET_GAME"
export const MODAL_TOGGLE = "MODAL_TOGGLE"
export const SET_WINDOW_WIDTH = "SET_WINDOW_WIDTH"


export const initialState = {
  level: [1, 2, 3, 4],
  gameDispatch: [],
  gameArray: [],
  index: -1,
  levelNumber: 1,
  fade: false,
  available: true,
  levelUp: false,
  lightUpGreen: false,
  lightUpRed: false,
  lightUpYellow: false,
  lightUpBlue: false,
  watchMode: false,
  playMode: false,
  gameOver: false,
  showLegendModal: false,
  windowWidth: window.innerWidth
}


export const playModeReducer = (state, action) => {
  switch (action.type) {
    // playMode
    case NEXT_LEVEL:
      return {
        ...state,
        level: [...state.level, Math.floor(Math.random() * 4) + 1],
        levelUp: true,
        levelNumber: ++state.levelNumber,
        playMode: false
      };
    case RESET_LEVEL_UP:
      return {
        ...state,
        // level: state.level,
        // levelUp: false,
        index: -1,
        fade: true,
        gameArray: [],
        // available: state.available,
        // levelNumber: state.levelNumber,
        playMode: false

      };
    case CLICK:
      return {
        ...state,
        gameArray: [...state.gameArray, action.value],
        index: ++state.index,
        // levelNumber: state.levelNumber,
        // level: state.level,
        // available: state.available,
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
      }
    case SOUND_ON: 
      action.value()
      return {
        ...state
      }
    case RED_ON:
      return {
        ...state,
        lightUpGreen: false,
        lightUpRed: true,
        lightUpYellow: false,
        lightUpBlue: false
      };
    case BLUE_ON:
      return {
        ...state,
        lightUpGreen: false,
        lightUpRed: false,
        lightUpYellow: false,
        lightUpBlue: true
      };
    case YELLOW_ON:
      return {
        ...state,
        lightUpGreen: false,
        lightUpRed: false,
        lightUpYellow: true,
        lightUpBlue: false
      };
    case COLOR_BUTTON_OFF:
      return {
        ...state,
        lightUpGreen: false,
        lightUpRed: false,
        lightUpYellow: false,
        lightUpBlue: false,
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
    case RESET_GAME_DISPATCH:
        return {
          ...state,
          gameDispatch: []
        }
    case MODAL_TOGGLE:
        return {
          ...state,
          showLegendModal: !state.showLegendModal
        }
    case SET_WINDOW_WIDTH:
      return {
        ...state,
        windowWidth: action.value
      }
    default:
      return state
  }
}

export const debounce = (func, wait, immediate) => {
  var timeout;
  return function () {
    var context = this, args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
}

export const useAudio = url => {
  let [firstRun, setFirstRun] = useState(true)
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    if (firstRun) {
      setFirstRun(false)
      return
    }
    
    if (playing) {
      audio.play()
    } else {
      audio.pause()
      audio.currentTime = 0
      toggle()
    }
  }, [playing]);

  // return [playing, toggle];
  return [toggle];
};
