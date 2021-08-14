import './App.css';
import Layout from './components/UI/Layout'
import { Route, Switch } from 'react-router-dom';
import StartView from './Pages/StartView'
import NotFound from './Pages/NotFound'
import ForecastView from './Pages/ForecastView'
import ForecastDetailView from './Pages/ForecastDetailView'
import { checkDevicePosition } from './handlers/localstorageHandler'


function App() {
  
  checkDevicePosition()

  return (
    <>
      <Layout>
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
