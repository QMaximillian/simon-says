import React from 'react'
import { useTransition, animated } from "react-spring";
import '../App.css'
import styles from '../GameBulletin.module.css'





const GameBulletin = ({ levelNumber, ...props }) => {

  const transitions = useTransition(props.levelUp, null, {
    from: { opacity: 0, transform: "translate3d(-50%, 0, 0)" },
    enter: { opacity: 1, transform: "translate3d(0%, 0, 0)" },
    leave: { opacity: 0, transform: "translate3d(100%, 0, 0)" }
  });

  return (
    <div className={styles.container}>
      <div className={styles["top"]}>
        <div className={styles["level-number"]}>LEVEL {levelNumber}</div>

        <div style={{ height: "10em" }}>
          {transitions.map(
            ({ item, key, props }) =>
              item && (
                <animated.div
                  key={key}
                  style={props}
                  className={styles["level-up"]}
                >
                  LEVEL UP
                </animated.div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default GameBulletin
