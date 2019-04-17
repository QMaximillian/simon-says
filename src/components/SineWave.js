import React from 'react'
import { useEffect, useRef } from 'react'

import { TweenMax, TweenLite, Sine } from 'gsap'
// import CustomEase from 'gsap/CustomEase'
import '../App.css'

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

function SineWave({className, ...props}){

    

var sineElement = useRef(null)
var waveElement = useRef(null)
    
    useEffect(() => {
      console.log(waveElement)
      console.log(sineElement)


              TweenLite.defaultEase = Sine.easeInOut;
                TweenLite.set("g", { y: window.innerHeight / 15});
                var width = 1000; // length of wave

                      var amplitude = 100; // changes the height of the sine wave
                      var frequency = 20; // changes how close the sine waves are to each other
                      var segments = 1000; // basically frames
                      var interval = width / segments;
                for (var i = 0; i <= segments; i++) {
                  var norm = 1 - i / segments;
                  var point = waveElement.points.appendItem(sineElement.createSVGPoint());

                  point.x = i * interval;
                  point.y = amplitude / 2;

                  TweenMax.to(point, 0.5, {
                    y: -point.y,
                    repeat: -1,
                    yoyo: true
                  }).progress(norm * frequency);
                }
              }, [waveElement, sineElement]) 
              
    // return <div className="firstSineWave" ref={div => myElement = div}>Hello</div>
    return (
      <svg 
        // width={window.innerWidth}
        // height={200}
        viewBox={`0, 0, ${window.innerWidth} ${window.innerHeight}`}
        className={className}
        // style={{
        //   gridColumn: '1 / span 8',
        //   gridRow: '4',
        //   zIndex: -1, 
        //   display: 'flex'      
        // }}
        ref={svg => sineElement = svg}>
         <g>
            <polyline 
              style={{
                fill: 'none',
                strokeWidth: 4,
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                stroke: '#56acf4',
              }}
            ref={polyline => waveElement = polyline}
          />
         </g>
      </svg>
    );
}

export default SineWave

// TweenLite.defaultEase = Sine.easeInOut;
//       TweenLite.set("g", { y: window.innerHeight / 2 });

//       var svg = document.querySelector(".sine");
//       var wave = document.querySelector(".wave");

//       var width = 800; // length of wave
//       // var sinus = new CustomEase(
//       //   "sinus",
//       //   "M0,0 C0.4,0 0.3,1 0.5,1 0.7,1 0.6,0 1,0"
//       // );

//       var amplitude = 100; // changes the height of the sine wave
//       var frequency = 20; // changes how close the sine waves are to each other
//       var segments = 1000; // basically frames
//       var interval = width / segments;

//       for (var i = 0; i <= segments; i++) {
//         var norm = 1 - i / segments;
//         var point = wave.points.appendItem(svg.createSVGPoint());

//         point.x = i * interval;
//         point.y = amplitude / 2;

//         TweenMax.to(point, 0.5, {
//           y: -point.y,
//           repeat: -1,
//           yoyo: true
//         }).progress(norm * frequency);
//       }
//     })