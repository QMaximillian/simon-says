import React from 'react'
import { useEffect, useRef } from 'react'

import { TweenMax, TweenLite, Sine } from 'gsap'
// import CustomEase from 'gsap/CustomEase'
import '../App.css' 

function SineWave({className, wave, sine, ...props}){

    
var sineElement = useRef()
var waveElement = useRef()
    
    useEffect(() => {
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
              
    return (
      <svg 
        viewBox={`0, 0, ${window.innerWidth} ${window.innerHeight}`}
        className={className}
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