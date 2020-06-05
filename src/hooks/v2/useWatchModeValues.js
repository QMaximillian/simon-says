import { useState, useEffect}  from 'react'

export function useWatchModeValues(colorName, colorAudio, modeEnum) {
  const [color, setColor] = useState({
    id: colorName,
    lightUp: false,
    sound: false
  });
  const [sound] = useState(new Audio(colorAudio));

  let timeoutId;

  useEffect(() => {
    if (modeEnum === "WATCH") {
      if (color.sound) {
        sound.play();
      }
  
      if (!color.sound) {
        sound.pause();
        sound.currentTime = 0;
      }
    }
    
    if (modeEnum === "PLAY" && color.sound) {
        sound.play()
        new Promise(function(resolve) {
          timeoutId = setTimeout(function(){
            sound.pause()
            sound.currentTime = 0;
            setColor(color => ({...color, lightUp: false, sound: false}))
            resolve()
          }, 200)
        })
    }

    return () => clearTimeout(timeoutId)
 }, [color, sound, setColor, modeEnum]);

  return [color, setColor, sound];
}