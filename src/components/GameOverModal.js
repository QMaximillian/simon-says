import React, { useState } from 'react'
import '../App.css'
import { Query, Mutation } from 'react-apollo'
import { GET_TOP_HIGH_SCORES, ADD_INITIALS_AND_SCORE } from '../hooks/gql-queries'


function GameOverModal({gameOver, levelNumber, ...props}){

    const showHideClassname = gameOver ? 'game-over-modal display-block' : "game-over-modal display-none";

    return (
        <div className={showHideClassname}>
            <section className="game-over-modal-main">
            <HighScoreList levelNumber={levelNumber}/>
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


const InitialInput = ({ levelNumber }) => {

  const [name, setName] = useState("");

  function handleChange(event) {
    setName(event.target.value.toUpperCase());
  }

  const updateCache = (cache, { data }) => {
    const existingUsers = cache.readQuery({
      query: GET_TOP_HIGH_SCORES
    });

    const newUser = data.insert_users.returning[0];
    console.log(newUser)
    cache.writeQuery({
      query: GET_TOP_HIGH_SCORES,
      data: { users: [newUser, ...existingUsers.users] }
    });
  };

  return (
    <Mutation mutation={ADD_INITIALS_AND_SCORE} update={updateCache}>
      {(addInitialsAndScore, { loading, data, error }) => {
        console.log(levelNumber);
        if (error) {
          console.error(error);
          return (<div>Error!</div>)
        }

        const score = levelNumber
        return (
          <>
            <label>Enter Your Initials</label>
            <input maxLength={3} onChange={handleChange} value={name} />
            <button
              onClick={e => {
                console.log(name, score)
                e.preventDefault();
                addInitialsAndScore({variables: { name: name, score: score }})
              }}
            />
          </>
        );
      }}
    </Mutation>
  );
};

const HighScoreList = ({ resetGame, levelNumber }) => {

  

  return (
     <aside>
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

export default GameOverModal