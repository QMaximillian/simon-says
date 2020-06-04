import { useState, useEffect}  from 'react'

export function useWatchModeValues(colorName, colorAudio, watchMode) {
  const [color, setColor] = useState({
    id: colorName,
    lightUp: false,
    sound: false
  });

  const [sound] = useState(new Audio(colorAudio));

  useEffect(() => {
    if (watchMode) {
      if (color.sound) {
        sound.play();
      }
  
      if (!color.sound) {
        sound.pause();
        sound.currentTime = 0;
      }
    }
  }, [color, sound, setColor]);

  return [color, setColor, sound];
}