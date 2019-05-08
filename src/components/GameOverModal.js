import React, { useState } from 'react'
import '../App.css'
import { Query } from 'react-apollo'
import { GET_TOP_HIGH_SCORES } from '../hooks/gql-queries'


function GameOverModal({gameOver, ...props}){

    const showHideClassname = gameOver ? 'game-over-modal display-block' : "game-over-modal display-none";

    return (
        <div className={showHideClassname}>
            <section className="game-over-modal-main">
            <HighScoreList />
            </section>
        </div>
    )
}
const HighScores = ({ users }) => {
  console.log(users)
  return (
    <div>
      {users.map(user => (
          <div key={user.id}>
            <span>{user.name}</span><span>{user.score}</span>
          </div>
      ))}
    </div>)
}
const TopHighScoreListQuery = () => {
  return (
    <Query query={GET_TOP_HIGH_SCORES}>
    {({ loading, error, data, client }) => {
      if (loading) {
        return (<div>Loading...</div>)
      } 
      if (error) {
        console.error(error)
        return (<div>Error!</div>)
      }
      return (<HighScores client={client} users={data.users}/>)
    }}
    </Query>
  )
}
const HighScoreList = ({ resetGame }) => {

  const [text, setText] = useState('')

function handleChange(event) {
  setText(event.target.value)
}

  return (
     <aside>
       <div>
         <div>
            GAME OVER
         </div>
         <div onClick={resetGame}>
           PLAY AGAIN?
         </div>
         <label>Enter Your Initials</label>
         <input maxLength={3} onChange={handleChange} value={text}></input>
       </div>
       <TopHighScoreListQuery />
     </aside>
  )
}

export default GameOverModal