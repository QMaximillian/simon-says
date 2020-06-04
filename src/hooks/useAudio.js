import { useState, useEffect } from 'react'

export const useAudio = url => {
  let [firstRun, setFirstRun] = useState(true)
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    if (firstRun) {
      setFirstRun(false)
      return
    }
    
    if (playing) {
      audio.play()
    } else {
      audio.pause()
      audio.currentTime = 0
      toggle()
    }
  }, [playing]);

  // return [playing, toggle];
  return [toggle];
};
