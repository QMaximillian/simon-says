import React, {  useEffect } from 'react'
import { useTransition, useSpring, animated } from "react-spring";
import '../App.css'
import styles from '../styles/GameBulletin.module.css'





const GameBulletin = ({ levelNumber, levelUp, fasterDuration, setShowFasterAnimation, showFasterAnimation }) => {

  useEffect(() => {
    let timeout;

    if (showFasterAnimation) {
      timeout = setTimeout(() => setShowFasterAnimation(false), 2000)
    }

    return function cleanup(){
        clearTimeout(timeout)
    }
  }, [showFasterAnimation])

  const transitions = useTransition(levelUp, null, {
    from: { opacity: 0, transform: "translate3d(-50%, 0, 0)" },
    enter: { opacity: 1, transform: "translate3d(0%, 0, 0)" },
    leave: { opacity: 0, transform: "translate3d(100%, 0, 0)" }
  });

  const springProps = useSpring({
    to: [

      { opacity: 1, color: "blue", fontSize: "4em", fontStyle: "italic" },
      { opacity: 0, color: "blue", fontSize: "4em", fontStyle: "italic" }
    ],
    // leave: { opacity: 0, color: "blue", fontSize: "4em", fontStyle: "italic" },
    from: { opacity: 0, color: "blue", fontSize: "4em", fontStyle: "italic" },
    config: { duration: fasterDuration },
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
          {showFasterAnimation ? <animated.div style={springProps}>FASTER</animated.div> : null}
        </div>
      </div>
    </div>
  );
};

export default GameBulletin
