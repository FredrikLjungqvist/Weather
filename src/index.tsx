import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { WeatherContextProvider } from './context/weather-context'
import { LocationContextProvider } from './context/location-context';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <LocationContextProvider>
      <WeatherContextProvider>
        <App />
      </WeatherContextProvider>
    </LocationContextProvider>
  </BrowserRouter>
  , document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
