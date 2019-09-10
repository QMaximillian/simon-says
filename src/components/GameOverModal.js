import React, { useState } from 'react'
import '../App.css'
import { Query, Mutation } from 'react-apollo'
import { GET_TOP_HIGH_SCORES, ADD_INITIALS_AND_SCORE } from '../hooks/gql-queries'


export default function GameOverModal({gameOver, levelNumber, ...props}){



    return (
        <div className="game-over-modal-main">
          <section >
            <HighScoreList levelNumber={levelNumber}/>
          </section>
        </div>
    )
}
const HighScores = ({ users }) => {

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


const InitialInput = ({ levelNumber }) => {

  const [text, setText] = useState("");
  const [disabled, setDisabled] = useState(false)

  function handleChange(event) {
    setText(event.target.value.toUpperCase());
  }

  const updateCache = (cache, { data }) => {

    // Logic to add it if it is in the high score list to the correct position in the list

    const existingUsers = cache.readQuery({
      query: GET_TOP_HIGH_SCORES
    });

    const newUser = data.insert_users.returning[0];

    const usersArray = [newUser, ...existingUsers.users].sort((a, b) => b.score - a.score)

    cache.writeQuery({
      query: GET_TOP_HIGH_SCORES,
      data: { users: usersArray }
    });
  };

  return (
    <Mutation mutation={ADD_INITIALS_AND_SCORE} update={updateCache}>
      {(addInitialsAndScore, { loading, data, error }) => {
        if (error) {
          console.error(error);
          return (<div>Error!</div>)
        }



        return (
          <div>
            <label>Enter Your Initials</label>
            <input maxLength={3} onChange={handleChange} value={text} disabled={disabled}/>
            <button
              onClick={e => {
                e.preventDefault();
                addInitialsAndScore({variables: { name: text, score: levelNumber }})
                setDisabled(true)
                setText('')
              }}>Submit
            </button>
          </div>
        );
      }}
    </Mutation>
  );
};

const HighScoreList = ({ resetGame, levelNumber }) => {

  

  return (
     <aside style={{height: '100%'}}>
       <div>
         <div>
            GAME OVER
         </div>
         <div onClick={resetGame}>
           PLAY AGAIN?
         </div>
         <InitialInput levelNumber={levelNumber}/>
       </div>
       <TopHighScoreListQuery />
     </aside>
  )
}

