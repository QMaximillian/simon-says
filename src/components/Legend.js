import React from 'react'
import { KeyboardQ } from '../svgs/KeyboardSVGS'
import styles from '../styles/Legend.module.css'

function Legend({ show, handleLegendToggle, ...props}){

     return(
       <div className={show ? 'modal display-block' : 'modal display-none'}>
        <section className="modal-main">
          <div className={styles.legendContainer}>
            <div
              className="x-modal"
              onClick={handleLegendToggle}
            />
            <div className={styles.legend}>Legend</div>
            <div className={styles.greenKey}>
              <label>Green</label>
              <div>
                <KeyboardQ />
              </div>
            </div>

            <div className={styles.redKey}>
              <label>W</label>
              <div>Red</div>
            </div>
            <div className={styles.yellowKey}>
              <label>A</label>
              <div>Yellow</div>
            </div>
            <div className={styles.blueKey}>
              <label>D</label>
              <div>Blue</div>
            </div>
            <div className={styles.restartGame}>
              <label>R</label>
              <div>Restart Game</div>
            </div>
            <div className={styles.startGame}>
              <div>Start Game</div>
              <label>Enter</label>
            </div>
          </div>
          </section>
       </div>
        )     
}   

export default Legend