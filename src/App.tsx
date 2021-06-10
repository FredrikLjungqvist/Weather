import React from 'react';
import './App.css';
import Layout from './components/UI/Layout'
import { CssBaseline } from '@material-ui/core'
import { BrowserRouter } from 'react-router-dom';

function App() {
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
