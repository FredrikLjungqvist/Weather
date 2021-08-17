import { useEffect, useContext } from 'react'
import './App.css';
import Layout from './components/UI/Layout'
import { Route, Switch } from 'react-router-dom';
import { setPositionData } from './handlers/localstorageHandler'
import StartView from './Pages/StartView'
import NotFound from './Pages/NotFound'
import ForecastView from './Pages/ForecastView'
import ForecastDetailView from './Pages/ForecastDetailView'
import WeatherContext from './context/weather-context'
import ErrorBoundary from './components/ErrorBoundary';


function App() {
  const ctx = useContext(WeatherContext);
  
  setPositionData()
  useEffect(() => {
    ctx.getWeatherData()
  }, [])
 
  return (
    <>

      <Layout>
          <Switch>
          <Route path="/" exact>
            <StartView />
          </Route>
          <Route path="/stad/:cityName" exact>
          <ErrorBoundary>
              <ForecastView />
          </ErrorBoundary>
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
