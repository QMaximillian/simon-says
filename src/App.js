
import React from 'react'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";
import './index.css'
import './App.css';
import GameContainer from './GameContainer'

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: "https://simon-says-endpoint.herokuapp.com/v1alpha1/graphql"
    }),
    headers: {
      'content-type': 'application/json',
      "x-hasura-admin-secret": process.env.REACT_APP_HASURA_ADMIN_SECRET
    },
    cache: new InMemoryCache()
  });
}

const App = () => {

  const client = createApolloClient()
    return (
      <ApolloProvider client={client}>
          <GameContainer />
      </ApolloProvider>
    );
}

export default App





