import React, { forwardRef, useEffect, useState } from 'react';

import { Homepage } from './Homepage';
import { History } from './History';

import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Alert, BottomNavigation, BottomNavigationAction } from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import axios from 'axios';

const BottomNavigationLink = forwardRef((props, ref) => {
  return <Link to={props.to} ref={ref} {...props} />
});


function App() {
  const location = useLocation();
  const [error, setError] = useState(false);

  const [value, setValue] = useState(location.pathname === '/' ? 'Homepage' : 'History');

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

  const [historyLoading, setHistoryLoading] = useState(true);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const getHistory = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/counter_history`);

        setHistory(data);
      } catch (error) {
        setError(true);
      }

      setHistoryLoading(false);
    };

    getHistory();
  }, [counter]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      {error && (
        <Alert variant="filled" severity="error" sx={{ position: 'fixed', top: 0, width: '100%' }}>
          There was an error with something. Tell stannie and he will fix
        </Alert>
      )}
      <Routes>
        <Route path='/' element={<Homepage
          counter={counter}
          setCounter={setCounter}
          initialDataLoading={initialDataLoading}
          loading={loading}
          setLoading={setLoading}
          error={error} setError={setError} />} />
        <Route path='/history' element={<History error={error} setError={setError}
          historyLoading={historyLoading}
          history={history}
        />} />
      </Routes>

      <BottomNavigation
        showLabels
        sx={{ position: 'fixed', bottom: 0, width: '100%' }}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction value="Homepage" to='/' component={BottomNavigationLink} label="Homepage" icon={<HomeIcon />} />
        <BottomNavigationAction to='/history' component={BottomNavigationLink} value="History" label="History" icon={<HistoryIcon />} />
      </BottomNavigation>
    </div>
  )
}

export default App
