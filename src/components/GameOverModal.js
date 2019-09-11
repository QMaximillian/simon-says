import React, { useState } from 'react'
// import { useSpring, animated } from 'react-spring'
import styles from '../GameOverModal.module.css'
import { Query, Mutation } from 'react-apollo'
import { GET_TOP_HIGH_SCORES, ADD_INITIALS_AND_SCORE } from '../hooks/gql-queries'
import TextBox from '../components/TextBox'
import "../App.css";


export default function GameOverModal({gameOver, levelNumber, resetGame }){

    return (
      <div className={styles["game-over-modal-main"]}>
        <div className={styles["game-over"]}>Game Over</div>
        <div className={styles["container"]}>
          <div className={styles["high-score-container"]}>
            <HighScoreList levelNumber={levelNumber} />
          </div>
          <div className={styles["high-score-list-container"]}>
            <div className={styles["high-score"]}>High Scores</div>
            <TopHighScoreListQuery />
          </div>
        </div>
        <div onClick={resetGame} className={styles['play-again']}>PLAY AGAIN?</div>
      </div>
    );
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

      return (
          <HighScores client={client} users={data.users}/>
      )
    }}
    </Query>
  )
}


const InitialInput = ({ levelNumber }) => {

  const [text, setText] = useState('');
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
              <TextBox onChange={handleChange} value={text} disabled={disabled}/>
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

const HighScoreList = ({ levelNumber }) => {
  return (
      <InitialInput levelNumber={levelNumber} />
  );
}

