import React from 'react';
import ApolloClient from 'apollo-client'
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";

import './App.css';
import GameContainer from './GameContainer'

const App = (props) => {
    return (
      <div className="top-level-styles">
        <GameContainer />
      </div>
    );
}

export default App
