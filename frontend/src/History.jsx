import React from 'react';
import { Background } from './Background';

import { Skeleton, Typography } from '@mui/material';

import dayjs from 'dayjs';

export const History = ({ historyLoading, history, }) => {

  return (
    <Background>
      <div style={{ overflow: 'scroll', padding: '0 1rem', width: '100%' }}>
        {historyLoading && (
          Array(3).fill().map((_, index) => (
            <div key={index} style={{ padding: '0 1rem' }}>
              <Skeleton width='100%' height={40} />
              <Skeleton width='40%' height={40} />
            </div>
          ))
        )}
        {!historyLoading && history.map((item) => {
          return (
            <div key={item.id} style={{ margin: '2rem 0', padding: '0 1rem' }}>
              <Typography>{item.reason} updated count to <span style={{ fontWeight: 600 }}>{item.count}</span> at <span style={{ fontWeight: 600 }}>{dayjs(item.createdAt).format('LT MMM DD, YYYY')}</span></Typography>
            </div>
          );
        })}
      </div>
    </Background >
  );
};
