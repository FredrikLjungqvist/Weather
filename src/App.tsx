import React,{useEffect} from 'react';
import './App.css';
import Layout from './components/UI/Layout'
import { CssBaseline } from '@material-ui/core'
import { BrowserRouter } from 'react-router-dom';
import {checkDevicePosition } from './handlers/localstorageHandler'

function App() {

  
  useEffect(() => {
        checkDevicePosition()
  })

  return (
    <>
      <CssBaseline>
        <BrowserRouter>
          <Layout />
    <button onClick={checkDevicePosition}>Knapp</button>
        </BrowserRouter>
      </CssBaseline>
    </>
  );
}

export default App;
