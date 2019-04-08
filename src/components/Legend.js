import React from 'react'
import {css, jsx} from '@emotion/core'
import styled from '@emotion/styled'
import { KeyboardQ } from '../svgs/KeyboardSVGS'


function Legend(props){
    if (props.toggleLegend){
        return (
          <LegendContainer>
            <div className="legend">
              <button onClick={props.handleLegendToggle}>
                Toggle Legend
              </button>
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
            </div>
          </LegendContainer>
        );
    } else {
        return null;
    }  
}   

const LegendContainer = styled.div`
  gridColumn: 1;
  gridRow: 1;
`;

export default Legend