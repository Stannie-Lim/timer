import React, { forwardRef, useState } from 'react';

import { Homepage } from './Homepage';
import { History } from './History';

import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Alert, BottomNavigation, BottomNavigationAction } from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';

const BottomNavigationLink = forwardRef((props, ref) => {
  return <Link to={props.to} ref={ref} {...props} />
});


function App() {
  const location = useLocation();
  const [error, setError] = useState(false);

  const [value, setValue] = useState(location.pathname === '/' ? 'Homepage' : 'History');

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
        <Route path='/' element={<Homepage error={error} setError={setError} />} />
        <Route path='/history' element={<History error={error} setError={setError} />} />
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
