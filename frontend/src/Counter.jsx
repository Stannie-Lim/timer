import React, { useEffect, useState } from 'react';

import { Background } from './Background';
import { Grid, Typography, Backdrop, CircularProgress, Alert, Button, Skeleton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import axios from 'axios';

export const Counter = () => {
  const [counter, setCounter] = useState('');
  const [initialDataLoading, setInitialDataLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}`);
        setCounter(data.count);
        setError(false);
      } catch (error) {
        setError(true);
      }

      setInitialDataLoading(false);
    };

    getData();
  }, []);

  const onChange = async (type) => {
    try {
      setLoading(true);
      const { data } = await axios.patch(`${import.meta.env.VITE_APP_BACKEND_URL}`, {
        type,
      });

      setCounter(data.count);
      setError(false);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  return (
    <Background>
      {error && (
        <Alert variant="filled" severity="error" sx={{ position: 'fixed', top: 0, width: '100%' }}>
          There was an error with something. Tell stannie and he will fix
        </Alert>
      )}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container direction="column" alignItems="center" justifyContent="center" spacing={2}>
        <Grid item>
          <Typography variant="h5" fontWeight={300} textAlign="center">How many cups of tea had Pippi made?</Typography>
        </Grid>
        <Grid item>
          {initialDataLoading ? <Skeleton width={100} height={40} /> : <Typography variant="h4" fontWeight={400}>{counter}</Typography>}
        </Grid>
        <Grid container item justifyContent="center" spacing={1}>
          <Grid item>
            <Button disabled={initialDataLoading} size="large" variant='outlined' onClick={() => onChange('decrement')}>
              <RemoveIcon />
            </Button>
          </Grid>
          <Grid item>
            <Button disabled={initialDataLoading} size="large" variant='outlined' onClick={() => onChange('increment')}>
              <AddIcon />
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Background>
  );
};
