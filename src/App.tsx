import './App.css';
import { useEffect } from 'react'
import Layout from './components/UI/Layout'
import { Route, Link } from 'react-router-dom';
import StartView from './Pages/StartView'
import ForecastView from './Pages/ForecastView'
import ForecastDetailView from './Pages/ForecastDetailView'
import { checkDevicePosition, setPositionData, getLocalStorage, setLocalStorage } from './handlers/localstorageHandler'


function App() {
  
  checkDevicePosition()


  return (
    <>
      <Layout>
        <Route path="/" exact>
          <StartView />
        </Route>
        <Route path="/:cityName" exact>
            <ForecastView />
        </Route>
        <Route path="/:cityName/:currentDate">
          <ForecastDetailView />
        </Route>
      </Layout>
    </>
  );
}

export default App;
