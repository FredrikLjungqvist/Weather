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


function App() {
  const ctx = useContext(WeatherContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  setPositionData()
  useEffect(() => {
    ctx.getWeatherData()
  }, [])
  
  let groupedDates;
  let dataToRender:any;
  
  if(ctx.selectedForecast.length > 0){
    const groupBy = (list:any, keyGetter:any) => {
      const map = new Map();
      list.forEach((item:any) => {
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

  let output = groupedDates.keys()
  console.log(output)
  let dataArray = Array.from(groupedDates, ([name, value]) => ({ name, value }));

  console.log(dataArray)
  let flat = dataArray.flat()
  console.log(flat)

  dataToRender = dataArray.map((data)=>
  {

    let tempArray = data.value.map((data:Weather)=>{

      return data.temp
  })

    const tempSymbol = data.value.map((data:Weather)=>{
      return data.weatherSymbol 
    })

    const symbol = Math.min(...tempSymbol)
     
/*     let average = tempArray.reduce(function (sum:any, value:Number) {
        return sum + value;
    }, 0) / tempArray.length; */

    let maxTemp = Math.max(...tempArray)
    let minTemp = Math.min(...tempArray)
    
    const day = new Date(data.name)
    
    const dayRender = day.toLocaleDateString('se-SE', { weekday: 'long' });
    console.log(data, '👀')
    return {date:data.name, city: data.value[0].city, tempmax:maxTemp, tempmin:minTemp, symbol:symbol, id:data.value[0].id, day:dayRender }
    

  }
  )
  
}

  const toggleModalHandler = () => setModalIsOpen(!modalIsOpen)

  return (
    <>
      <Layout onToggle={toggleModalHandler} >
          <Switch>
          <Route path="/" exact>
            {modalIsOpen && <ErrorModal />} 
              <StartView /> 
          </Route>
          <Route path="/stad/:cityName" exact>
            <ErrorBoundary>
              <ForecastView  />
            </ErrorBoundary>
          </Route>
          <Route path="/stad/:cityName/datum/:currentDate">
            <ForecastDetailView groupedData={dataToRender} />
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
