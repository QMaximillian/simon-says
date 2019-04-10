import React from 'react'
/** @jsx jsx */ import {css, jsx} from '@emotion/core'
import styled from '@emotion/styled'
import { KeyboardQ } from '../svgs/KeyboardSVGS'


function Legend(props){
        return (
          <div css={legendContainer}>
            <button
              css={toggleButton}
              onClick={props.handleLegendToggle}
            >
              Close Legend
            </button>
            <div css={legend}>Legend</div>
            <div css={greenKey}>
              <label>Green</label>
              <div>
                <KeyboardQ />
              </div>
            </div>

            <div css={redKey}>
              <label>W</label>
              <div>Red</div>
            </div>
            <div css={yellowKey}>
              <label>A</label>
              <div>Yellow</div>
            </div>
            <div css={blueKey}>
              <label>D</label>
              <div>Blue</div>
            </div>
            <div css={restartGame}>
              <label>R</label>
              <div>Restart Game</div>
            </div>
            <div css={startGame}>
              <div>Start Game</div>
              <label>Enter</label>
            </div>
          </div>
        );      
}   
//https://spectrum.chat/next-js/general/looping-using-es6-map-in-styled-jsx~69e52ff1-6938-44c7-8f54-99150508e863
//define grid holding these keyboard key values
// iterate through all keys defining their grid positioning using JSX
// Allow max 5 per row


const legendContainer = css`
              grid-column: 1 / span 2;
              display: grid;
              grid-template-columns: repeat(5, 1fr);
              grid-template-rows: repeat(3, 1fr);
            `

const legend = css`
    grid-column: 1 / span 5;
    grid-row: 1;
`

const legend2 = css`
grid-column: 2;
grid-row: 2;
`

const toggleButton = css`
    grid-column: 1;
    grid-row: 1;  

`

const greenKey = css`
    grid-column: 1;
    grid-row: 2;
`

const yellowKey = css`
    grid-column: 3;
    grid-row: 2;
`

const redKey = css`
    grid-column: 2;
    grid-row: 2;
`

const blueKey = css`
    grid-column: 4;
    grid-row: 2;
`

const startGame = css`
    grid-column: 1;
    grid-row: 3;
`

const restartGame = css`
    grid-column: 3;
    grid-row: 3;
`;

export default Legend