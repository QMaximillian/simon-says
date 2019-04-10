// var button4 = require('../audio/Button4.wav')
import { useState, useEffect } from 'react'
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
export const GAME_OVER = "GAME_OVER";
export const RESET_GAME = "RESET_GAME"
export const LEGEND_TOGGLE = "LEGEND_TOGGLE"





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
        greenAudio: true
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
        greenAudio: false
      }
    case PLAY_MODE:
      return {
        ...state,
        watchMode: false,
        playMode: true,
        gameOver: false
      };
    case WATCH_MODE: 
      return {
        ...state,
        watchMode: true,
        playMode: false,
        
      }
    case GAME_OVER: 
      return {
        ...action.value,
        gameOver: true
      }
    case RESET_GAME:
        return {
          ...action.value
        }
    case LEGEND_TOGGLE:
        return {
          ...state,
          toggleLegend: !state.toggleLegend
        }
    default:
      return state
  }
}

export const useAudio = url => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  return [playing, setPlaying];
};