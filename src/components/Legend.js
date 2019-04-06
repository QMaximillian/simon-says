import React from 'react'

function Legend(props){
    return (
    <>
    <button onClick={props.handleLegendToggle}>Toggle Legend</button>
      <div>
        <div>Legend</div>
        <label>Q</label>
            <div>Green</div>
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