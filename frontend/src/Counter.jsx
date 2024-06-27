import React from 'react';

import { Grid, Typography, Backdrop, CircularProgress, Alert, Button, Skeleton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export const Counter = ({
  counter,
  initialDataLoading,
  loading,
  error,
  onChange,
}) => {
  return (
    <>
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
            <Button disabled={initialDataLoading || counter <= 0} size="large" variant='outlined' onClick={() => onChange('decrement', 'MANUALLY')}>
              <RemoveIcon />
            </Button>
          </Grid>
          <Grid item>
            <Button disabled={initialDataLoading} size="large" variant='outlined' onClick={() => onChange('increment', 'MANUALLY')}>
              <AddIcon />
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
