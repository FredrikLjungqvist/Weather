import React from 'react';
import './App.css';
import Layout from './components/UI/Layout'
import { CssBaseline } from '@material-ui/core'
import { BrowserRouter } from 'react-router-dom';
import {setPositionData,checkDevicePosition } from './handlers/localstorageHandler'

function App() {

  setPositionData()

  checkDevicePosition()
 
  navigator.geolocation.watchPosition(function(position) {
    console.log("i'm tracking you!");
  },
  function(error) {
    if (error.code === error.PERMISSION_DENIED)
      console.log("you denied me :-(");
  });
  

  return (
    <>
      <CssBaseline>
        <BrowserRouter>
          <Layout />
  
        </BrowserRouter>
      </CssBaseline>
    </>
  );
}

export default App;
