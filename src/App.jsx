import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button, Typography, IconButton, Paper, Grid, Box, Stack, Slider } from '@mui/material'

import ding from './assets/ding.mp3';

import useSound from 'use-sound';
import { useTheme } from '@mui/material/styles';
import dayjs from 'dayjs';

import useMediaQuery from '@mui/material/useMediaQuery';

import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';

import { ClickAwayListener } from '@mui/base/ClickAwayListener';

import hene from './assets/hene.png';
import pippi from './assets/pippi.png';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker'

function secondsToHms(seconds) {
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  return [m, s].map(v => v.toString().padStart(2, '0')).join(':');
}

function App() {
  const [time, setTime] = useState(120)
  const [stopTimer, setStopTimer] = useState();
  const [isSettingTime, setIsSettingTime] = useState(false);
  const [sound, setSound] = useState(100);

  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.down('md'));

  const [play] = useSound(ding, { volume: sound / 100 });

  const handleChange = (event, newValue) => {
    setSound(newValue);
  };

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
    if (time <= 0 && !isSettingTime) {
      clearInterval(stopTimer);
      play();
    }
  }, [time]);

  const onTimeClick = (event) => {
    event.stopPropagation();
    setIsSettingTime(true);
  };

  const onClickOut = () => {
    setIsSettingTime(false);
  };

  const onTimeChange = (time) => {
    const newSeconds = time.get('seconds');
    const newMinutes = time.get('minutes');

    if (newSeconds + (newMinutes * 60) !== 0) {
      pause();
    }

    setTime(newSeconds + (newMinutes * 60));
  };

  const calculateTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return dayjs().set('seconds', seconds).set('minutes', minutes);
  };

  const coolTimePicker = matchesMd ? (
    <MobileTimePicker
      onChange={onTimeChange} value={calculateTime(time)}
      openTo="seconds"
      views={['minutes', 'seconds']}
      format="mm:ss"
    />
  ) : (
    <TimePicker onChange={onTimeChange} value={calculateTime(time)} views={['minutes', 'seconds']} format="mm:ss" />
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={{ backgroundSize: 'cover', backgroundImage: `url("${hene}")`, height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: "column" }}>
        <img src={pippi} height={150} style={{ overflow: 'visible', zIndex: 1, marginTop: -150 }} />

        <Paper variant="outlined" style={{ boxShadow: '0 0 20px #ccc', width: 300, height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <Grid container direction="column" alignItems="center" justifyContent="center" spacing={2}>
            <Grid container item justifyContent="center" spacing={2}>
              <Grid item>
                <Button variant="outlined" sx={{ borderColor: 'black', color: 'black' }} disabled={stopTimer != null || time === 0} onClick={start}>Start</Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" sx={{ borderColor: 'black', color: 'black' }} disabled={stopTimer == null} onClick={pause}>Pause</Button>
              </Grid>
            </Grid>

            <Grid item>
              <Button onClick={reset} disabled={time === 120 && !stopTimer} variant="outlined" sx={{ borderColor: 'black', color: 'black' }} >Reset timer</Button>
            </Grid>
            <Grid item>
              <ClickAwayListener onClickAway={onClickOut}>
                <div>
                  {isSettingTime ? (
                    coolTimePicker
                  ) : (
                    <Typography variant="h2" onClick={onTimeClick}>{secondsToHms(time)}</Typography>
                  )}
                </div>
              </ClickAwayListener>
            </Grid>
            <Grid item>
              <Box sx={{ width: 200 }}>
                <Stack spacing={2} direction="row" alignItems="center">
                  <IconButton onClick={() => setSound(sound - 1)}><VolumeDown /></IconButton>
                  <Slider value={sound} onChange={handleChange} />
                  <IconButton onClick={() => setSound(sound + 1)}><VolumeUp /></IconButton>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Paper >
      </div >
    </LocalizationProvider>
  )
}

export default App
