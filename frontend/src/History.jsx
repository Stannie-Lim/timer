import React, { useState, useEffect } from 'react';
import { Background } from './Background';

import axios from 'axios';
import { Typography } from '@mui/material';

import dayjs from 'dayjs';

export const History = ({ error, setError }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const getHistory = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/counter_history`);

        setHistory(data);
      } catch (error) {
        setError(true);
      }
    };

    getHistory();
  }, []);

  return (
    <Background>
      <div style={{ overflow: 'scroll', padding: '0 1rem' }}>
        {history.map((item) => {
          return (
            <div key={item.id} style={{ margin: '2rem 0' }}>
              <Typography>{item.reason} updated count to <span style={{ fontWeight: 600 }}>{item.count}</span> at <span style={{ fontWeight: 600 }}>{dayjs(item.createdAt).format('LT MMM DD, YYYY')}</span></Typography>
            </div>
          );
        })}
      </div>
    </Background>
  );
};
