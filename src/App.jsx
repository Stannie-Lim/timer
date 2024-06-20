import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button, Typography, IconButton, Paper, Grid } from '@mui/material'

import ding from './assets/ding.mp3';

import useSound from 'use-sound';

import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

import hene from './assets/hene.png';
import pippi from './assets/pippi.png';

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
    setTime(120);
  };

  useEffect(() => {
    if (time === 0) {
      clearInterval(stopTimer);
      play();
    }
  }, [time]);

  return (
    <div style={{ backgroundSize: 'cover', backgroundImage: `url("${hene}")`, height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: "column" }}>
      <img src={pippi} height={150} style={{ overflow: 'visible', zIndex: 1, marginTop: -150 }} />

      <Paper variant="outlined" style={{ boxShadow: '0 0 20px #ccc', width: 300, height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <Grid container direction="column" alignItems="center" justifyContent="center" spacing={2}>
          <Grid container item justifyContent="center" spacing={2}>
            <Grid item>
              <Button variant="outlined" sx={{ borderColor: 'black', color: 'black' }} disabled={stopTimer != null} onClick={start}>Start</Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" sx={{ borderColor: 'black', color: 'black' }} disabled={stopTimer == null} onClick={pause}>Pause</Button>
            </Grid>
          </Grid>

          <Grid item>
            <Button onClick={reset} disabled={time === 120 && !stopTimer} variant="outlined" sx={{ borderColor: 'black', color: 'black' }} >Reset timer</Button>
          </Grid>
          <Grid item>
            <Typography variant="h2">{secondsToHms(time)}</Typography>
          </Grid>
          <div>
            <IconButton disabled={stopTimer != null || time == 0} onClick={() => setTime(time - 1)}>
              <RemoveIcon />
            </IconButton>
            <IconButton disabled={stopTimer != null} onClick={() => setTime(time + 1)}>
              <AddIcon />
            </IconButton>
          </div>
        </Grid>
      </Paper >
    </div >
  )
}

export default App
