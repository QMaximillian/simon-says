import React, { useEffect } from 'react'
/** @jsx jsx */ import {css, jsx} from '@emotion/core'
import styled from '@emotion/styled'

function SineWave({ columnStart, columnEnd, gridStart }){


    useEffect(() => {

        animate()
    })

    let xs = [];
    for (var i = 0; i <= 700; i++) {
      xs.push(i);
    }

    let t = 0;

    function animate() {
      let points = xs.map(x => {
        let y = 150 + 30 * Math.sin((x + t) / 15);
        // numbers

        return [x, y];
      });

      let path =
        "M" +
        points
          .map(p => {
            return p[0] + "," + p[1];
          })
          .join(" L");

      document.querySelector("path").setAttribute("d", path);


            t -= 0.5;
      

      requestAnimationFrame(animate);
    }


       let sineWave1 = css`
        grid-column: ${columnStart} / ${columnEnd};
        grid-row: ${gridStart};
        `
    

    return (
      <svg css={sineWave1} width={`${window.innerWidth / 2}px`} height="400px">
        <path
        d=""
          stroke="white"
          strokeWidth="8px"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    );

    
}

export default SineWave