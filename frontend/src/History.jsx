import React, { useState, useEffect } from 'react';
import { Background } from './Background';

import axios from 'axios';
import { Skeleton, Typography } from '@mui/material';

import dayjs from 'dayjs';

export const History = ({ error, setError }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getHistory = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/counter_history`);

        setHistory(data);
      } catch (error) {
        setError(true);
      }

      setLoading(false);
    };

    getHistory();
  }, []);

  return (
    <Background>
      <div style={{ overflow: 'scroll', padding: '0 1rem', width: '100%' }}>
        {loading && (
          Array(3).fill().map((_, index) => (
            <div key={index} style={{ padding: '0 1rem' }}>
              <Skeleton width='100%' height={40} />
              <Skeleton width='40%' height={40} />
            </div>
          ))
        )}
        {!loading && history.map((item) => {
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
