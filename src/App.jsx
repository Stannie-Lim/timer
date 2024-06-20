import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button, Typography } from '@mui/material'

import ding from './assets/ding.mp3';

import useSound from 'use-sound';

function secondsToHms(seconds) {
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  return [m, s].map(v => v.toString().padStart(2, '0')).join(':');
}

function App() {
  const [time, setTime] = useState(120)
  const [stopTimer, setStopTimer] = useState();
  const [play] = useSound(ding);

  const start = () => {
    if (stopTimer != null) {
      return;
    }

    const stop = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);

    setStopTimer(stop);
  };

  const pause = () => {
    clearInterval(stopTimer);
    setStopTimer(undefined);
  };

  const reset = () => {
    pause();
    setTime(DEFAULT_TIME);
  };

  useEffect(() => {
    if (time === 0) {
      clearInterval(stopTimer);
      play();
    }
  }, [time]);

  return (
    <div>
      <Button disabled={stopTimer != null} onClick={start}>Start timer</Button>
      <Button disabled={stopTimer == null} onClick={pause}>Pause timer</Button>
      <Button onClick={reset}>Reset timer</Button>
      <Typography>{secondsToHms(time)}</Typography>
    </div>
  )
}

export default App
