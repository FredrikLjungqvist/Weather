import { useEffect, useContext, useState } from 'react'
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
import { Weather } from './context/weather-context'
import ErrorModal from './components/UI/Modal'

export interface MyType {
  city: string
  date: string
  day: string
  id: string
  symbol: number
  tempmax: number
  tempmin: number
}


function App() {
  const ctx = useContext(WeatherContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  setPositionData()
  useEffect(() => {
    ctx.getWeatherData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  let groupedDates: Map<string, Weather[]>;
  let dataToRender: MyType[] = [];
  
  if(ctx.selectedForecast.length > 0){
    const groupBy = (list:Weather[], keyGetter: (item: Weather) => string) => {
      const map = new Map<string, Weather[]>();
      list.forEach((item:Weather) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
          map.set(key, [item]);  
        } else {
          collection.push(item);
        }
      });
      return map;
    }

  groupedDates = groupBy(ctx.selectedForecast, (date: { time: Date; }) => date.time.toISOString().substr(0,10))

  let dataArray = Array.from(groupedDates, ([name, value]) => ({ name, value }));

  dataToRender = dataArray.map((data)=>
  {

    let tempArray = data.value.map((data:Weather)=>{

      return data.temp
  })

    const tempSymbol = data.value.map((data:Weather)=>{
      return data.weatherSymbol 
    })

    const symbol = Math.min(...tempSymbol)

    let maxTemp = Math.max(...tempArray)
    let minTemp = Math.min(...tempArray)
    
    const day = new Date(data.name)
    
    const dayRender = day.toLocaleDateString('se-SE', { weekday: 'long' });
  
    return {date:data.name, city: data.value[0].city, tempmax:maxTemp, tempmin:minTemp, symbol:symbol, id:data.value[0].id, day:dayRender }
    
  }
  )
}

  const toggleModalHandler = () => setModalIsOpen(!modalIsOpen)

  return (
    <>
      {modalIsOpen && <ErrorModal />} 
      <Layout onToggle={toggleModalHandler} >
          <Switch>
          <Route path="/" exact>
              <StartView /> 
          </Route>
          <Route path="/stad/:cityName" exact>
            <ErrorBoundary>
              <ForecastView  />
            </ErrorBoundary>
          </Route>
          <Route path="/stad/:cityName/datum/:currentDate">
            <ForecastDetailView sortedData={dataToRender} />
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
