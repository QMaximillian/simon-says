import { useEffect } from 'react'
/** @jsx jsx */ import {css, jsx} from '@emotion/core'
import { TweenMax, TweenLite, Sine } from 'gsap'
// import CustomEase from 'gsap/CustomEase'

// function SineWave({ columnStart, columnEnd, gridStart }){


//     useEffect(() => {

//         animate()
//     })

//     let xs = [];
//     for (var i = 0; i <= 700; i++) {
//       xs.push(i);
//     }

//     let t = 0;

//     function animate() {
//       let points = xs.map(x => {
//         let y = 150 + 30 * Math.sin((x + t) / 15);
//         // numbers

//         return [x, y];
//       });

//       let path =
//         "M" +
//         points
//           .map(p => {
//             return p[0] + "," + p[1];
//           })
//           .join(" L");

//       document.querySelector("path").setAttribute("d", path);


//         t -= 0.5;
      

//       requestAnimationFrame(animate);
//     }


//        let sineWave1 = css`
//         grid-column: ${columnStart} / ${columnEnd};
//         grid-row: ${gridStart};
//         `
    

//     return (
//       <svg css={sineWave1} width={`${window.innerWidth / 2}px`} height="200px">
//         <path
//         d=""
//           stroke="white"
//           strokeWidth="8px"
//           strokeLinecap="round"
//           fill="none"
//         />
//       </svg>
//     );

    
// }

function SineWave({ columnStart, columnEnd, gridStart }){

    TweenLite.defaultEase = Sine.easeInOut;
    TweenLite.set("g", { y: window.innerHeight / 2 });

    var svg = document.querySelector(".sine");
    var wave = document.querySelector(".wave");

    var width = 800; // length of wave
    // var sinus = new CustomEase(
    //   "sinus",
    //   "M0,0 C0.4,0 0.3,1 0.5,1 0.7,1 0.6,0 1,0"
    // );

    var amplitude = 100; // changes the height of the sine wave
    var frequency = 20; // changes how close the sine waves are to each other
    var segments = 1000; // basically frames
    var interval = width / segments;

    for (var i = 0; i <= segments; i++) {
      var norm = 1 - i / segments;
      var point = wave.points.appendItem(svg.createSVGPoint());

      point.x = i * interval;
      point.y = amplitude / 2;

      TweenMax.to(point, 0.5, {
        y: -point.y,
        repeat: -1,
        yoyo: true
      }).progress(norm * frequency);
    }

    return (
      <svg className="sine">
        <g>
          <line id="line" x1="0" x2="100%" />
          <polyline className="wave" />
        </g>
      </svg>
    );
}

export default SineWave