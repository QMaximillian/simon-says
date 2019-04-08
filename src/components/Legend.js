import React from 'react'
import styled, {css, jsx} from '@emotion/core'
import { KeyboardQ } from '../svgs/KeyboardSVGS'

function Legend(props){
    return (
      <>
        <button onClick={props.handleLegendToggle}>Toggle Legend</button>
        <div>
          <div>Legend</div>
          <div>
            <div>
              <label>Green</label>
            </div>
            <div>{KeyboardQ()}</div>
          </div>

          <label>W</label>
          <div>Red</div>
          <label>A</label>
          <div>Yellow</div>
          <label>D</label>
          <div>Blue</div>
          <label>R</label>
          <div>Restart Game</div>
          <label>Enter</label>
          <div>Start Game</div>
        </div>
      </>
    );
}

export default Legend