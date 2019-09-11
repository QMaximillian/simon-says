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
            <div className={styles["high-score"]} style={{marginBottom: '1rem'}}>High Scores</div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <TopHighScoreListQuery />
            </div>
          </div>
        </div>
        <div onClick={resetGame} className={styles['play-again']}>PLAY AGAIN?</div>
      </div>
    );
}


const HighScores = ({ users }) => {

  return (
    <table>
      <tbody>
        {users.map(user => (
          <tr style={{ display: "flex", height: "25px" }} key={user.id}>
            <td
              style={{
                padding: 0,
                margin: 0,
                verticalAlign: "top",
                width: "5rem"
              }}
            >
              {user.name}
            </td>
            <td
              style={{
                padding: 0,
                margin: 0,
                verticalAlign: "top",
                borderLeft: "1px solid white",
                width: "5rem"
              }}
            >
              {user.score}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
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
    let usersArray;
    // Logic to add it if it is in the high score list to the correct position in the list

    const existingUsers = cache.readQuery({
      query: GET_TOP_HIGH_SCORES
    });

    const newUser = data.insert_users.returning[0];
    
      if (existingUsers.users.length === 0) {
        usersArray = [newUser]
      } 
      else if (existingUsers.users.length < 5) {
        usersArray = [newUser, ...existingUsers.users].sort(
          (a, b) => b.score - a.score)
      } 
      else if (newUser.score >= existingUsers.users[existingUsers.users.length - 1].score) {
        const topFourUsers = existingUsers.users.slice(0, -1);
        usersArray = [newUser, ...topFourUsers].sort(
          (a, b) => b.score - a.score
        );
      }

    cache.writeQuery({
      query: GET_TOP_HIGH_SCORES,
      data: { users: usersArray }
    });
  }

  
  return (
    <Mutation mutation={ADD_INITIALS_AND_SCORE} update={updateCache}>
      {(addInitialsAndScore, { loading, data, error }) => {
        if (error) {
          console.error(error);
          return (<div>Error!</div>)
        }



        return (
          <div>
            <label className={styles['high-score']}>Enter Initials</label>
              <TextBox onChange={handleChange} value={text} disabled={disabled}/>
            <button
            className={styles['submit']}
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

