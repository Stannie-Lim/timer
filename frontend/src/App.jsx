import { forwardRef, useState } from 'react'

import { Link, Route, Routes } from 'react-router-dom'

import { Timer } from './Timer'
import { Counter } from './Counter';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlusOneIcon from '@mui/icons-material/PlusOne';

const BottomNavigationLink = forwardRef((props, ref) => {
  return <Link to={props.to} ref={ref} {...props} />
});

function App() {
  const [value, setValue] = useState('Timer');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Routes>
        <Route path='/' element={<Timer />} />
        <Route path='/counter' element={<Counter />} />
      </Routes>

      <BottomNavigation
        showLabels
        sx={{ position: 'fixed', bottom: 0, width: '100%' }}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction to='/' component={BottomNavigationLink} label="Timer" icon={<AccessTimeIcon />} />
        <BottomNavigationAction to='/counter' component={BottomNavigationLink} label="Counter" icon={<PlusOneIcon />} />
      </BottomNavigation>
    </div>
  )
}

export default App
