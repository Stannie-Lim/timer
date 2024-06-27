import React, { useState, useEffect } from 'react';

import { Timer } from './Timer'
import { Counter } from './Counter';

import { Background } from './Background';

import axios from 'axios';

export const Homepage = ({ error, setError }) => {
  const [counter, setCounter] = useState('');
  const [initialDataLoading, setInitialDataLoading] = useState(true);
  const [loading, setLoading] = useState(false);

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

  const onChange = async (type, reason) => {
    try {
      setLoading(true);
      const { data } = await axios.patch(`${import.meta.env.VITE_APP_BACKEND_URL}`, {
        type,
        reason
      });

      setCounter(data.count);
      setError(false);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  const onTimeEnd = async () => {
    await onChange('increment', 'AUTOMATICALLY');
  };


  return (
    <Background>
      <Timer onTimeEnd={onTimeEnd} />
      <Counter
        counter={counter}
        initialDataLoading={initialDataLoading}
        loading={loading}
        error={error}
        onChange={onChange}
      />
    </Background>
  );
};
