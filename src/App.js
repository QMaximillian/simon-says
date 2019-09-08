
import React, { useState, useCallback, useEffect } from 'react'
import { useTransition, animated } from 'react-spring'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";
import BackgroundAnimation from './components/BackgroundAnimation'
import './index.css'
import './App.css';
import GameContainer from './GameContainer'

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: "https://simon-says-endpoint.herokuapp.com/v1alpha1/graphql"
    }),
    // headers: {
      // 'content-type': 'application/json',
      // "x-hasura-admin-secret": process.env.REACT_APP_HASURA_ADMIN_SECRET
    // },
    cache: new InMemoryCache()
  });
}

const App = (props) => {

  const client = createApolloClient()
    return (
      <ApolloProvider client={client}>
          {/* <BackgroundTransition children={<GameContainer />}/> */}
          <GameContainer />
      </ApolloProvider>
    );
}

export default App

const pages = [
  ({ style }) => <animated.div style={{ ...style, background: 'lightpink' }}/>,
  ({ style }) => <animated.div style={{ ...style, background: 'lightblue' }}/>,
  ({ style }) => <animated.div style={{ ...style, background: 'lightgreen' }}/>,
  ({ style }) => <animated.div style={{ ...style, background: 'teal' }}/>,
]

export function BackgroundTransition(props) {
  const [index, set] = useState(0)
  // const onClick = useCallback(() => set(state => (state + 1) % pages.length), [])
  const transitions = useTransition(index, p => p, {
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  })

  useEffect(() => {
    if (props.levelUp) {
      set(state => (state + 1) % pages.length)
    }
  }, [props.levelUp])

  return (
    <div className="simple-trans-main">
      {transitions.map(({ item, props, key }) => {
        const Page = pages[item]
        return <Page key={key} style={props} />
      })}
    </div>
  )
}

