import React from 'react';
import './App.css';
import GameContainer from './GameContainer'

const App = (props) => {
    return (
      // <div className="top-level-styles">
      <div style={{ backgroundImage: 'linear-gradient(cyan, teal)'}}>
        <GameContainer />
      </div>
    );
}

export default App
