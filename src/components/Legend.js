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
//https://spectrum.chat/next-js/general/looping-using-es6-map-in-styled-jsx~69e52ff1-6938-44c7-8f54-99150508e863
//define grid holding these keyboard key values
// iterate through all keys defining their grid positioning using JSX
// Allow max 5 per row

const LegendContainer = styled.div`
  gridColumn: 1;
  gridRow: 1;
`;

export default Legend