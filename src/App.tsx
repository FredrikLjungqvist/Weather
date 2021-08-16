import { useEffect, useContext, useState } from 'react'
import './App.css';
import Layout from './components/UI/Layout'
import { Route, Switch } from 'react-router-dom';
import { checkDevicePosition, getLocalStorage } from './handlers/localstorageHandler'
import StartView from './Pages/StartView'
import NotFound from './Pages/NotFound'
import ForecastView from './Pages/ForecastView'
import ForecastDetailView from './Pages/ForecastDetailView'
import FavouriteForecastList from './components/weather/FavouriteForecastList';
import WeatherContext from './context/weather-context'


function App() {
  const ctx = useContext(WeatherContext);
  
  useEffect(() => {
    checkDevicePosition()
    ctx.getWeatherData()
  }, [])
 
  return (
    <>
      <Layout>
        <FavouriteForecastList />
          <Switch>
          <Route path="/" exact>
            <StartView />
          </Route>
          <Route path="/stad/:cityName" exact>
              <ForecastView />
          </Route>
          <Route path="/stad/:cityName/datum/:currentDate">
            <ForecastDetailView />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Layout>
    </>
  );
}

export default App;
