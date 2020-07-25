import React from 'react'
import '../App.css'
import styles from '../styles/GameBulletin.module.css'

const GameBulletin = ({ levelNumber }) => {

  return (
    <div className={styles['container']}>
        <div className={styles["level-number"]}>LEVEL {levelNumber}</div>
    </div>
  );
};

export default GameBulletin
