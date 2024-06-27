import { Paper } from '@mui/material';
import React, { useEffect } from 'react';

import hene from './assets/hene.png';

export const Background = ({ children }) => {
  useEffect(() => {
    const fakeRequest = async () => {
      await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}`);
    }

    fakeRequest();
  }, []);

  return (
    <div style={{ backgroundSize: 'cover', backgroundImage: `url("${hene}")`, height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: "column" }}>
      <img src="https://i.mapleranks.com/u/IBKGPJKPNIJOCNMDENBMPBIFHHDDKOKELENJCCNEBBHADNBIFMKNHAENIBHLFHDDCOMNDBDNNEEMNNAGJLFLKJLDFALEMAEBBPCGJMGIALHGPDFBALMKGELKFFKKDGKOENCFEMFDPGNBMBHKEAMNAAKIGFJMJGJGDHCPCNJMFIEPAPCCKIHNAJPEEDEGPGGFEKLIEAADHBDBLMIEBGCIJGBAOLCMIOBDBHOPFBOMNELCHMDPHHIDHMJEMFDLMFPH.png" height={150} style={{ overflow: 'visible', zIndex: 1, marginTop: -150 }} />

      <Paper variant="outlined" style={{ boxShadow: '0 0 20px #ccc', width: 300, height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        {children}
      </Paper>
    </div>
  );
};
