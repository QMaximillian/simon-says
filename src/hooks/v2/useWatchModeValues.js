import { useState, useEffect, useRef }  from 'react'

export function useWatchModeValues(colorName, colorAudio, modeEnum) {
  const [color, setColor] = useState({
    id: colorName,
    lightUp: false,
    sound: false
  });
  const sound = useRef(new Audio(colorAudio));

  let timeoutId;

  useEffect(() => {
    if (modeEnum === "WATCH") {
      if (color.sound) {
        sound.current.play();
      }
  
      if (!color.sound) {
        sound.current.pause();
        sound.current.currentTime = 0;
      }
    }
    
    if ((modeEnum === "PLAY") && color.sound) {
        sound.current.play()
        new Promise(function(resolve) {
          timeoutId = setTimeout(function(){
            sound.current.pause()
            sound.current.currentTime = 0;
            setColor(color => ({...color, lightUp: false, sound: false}))
            resolve()
          }, 200)
        })
    }

    return () => clearTimeout(timeoutId)
 }, [color, sound, setColor, modeEnum]);

  return [color, setColor];
}