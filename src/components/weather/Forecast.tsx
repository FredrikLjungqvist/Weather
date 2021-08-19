import { useContext, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useParams } from "react-router-dom";
import WeatherContext from '../../context/weather-context'
import ForecastCard from './ForecastCard';
import {Weather} from '../../context/weather-context'

const useStyles = makeStyles({
    root: {
      minWidth: 150,
      maxWidth: 150,
      textAlign: 'center',
      justifyContent: 'center',
      flexWrap:'wrap'
    },
    cont: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      flexWrap:'wrap'
    },
  });

   interface DataToRender {
    id:string
    day:string
    city:string
    tempmax: number
    tempmin: number
    symbol: number
    date: string
  } 
  
const Forecast = ()=> {
  const ctx = useContext(WeatherContext)
  const params:any = useParams()
  const { cityName } = params;

  if(ctx.error) {
    throw new Error('Sök bara på svenska städer')
  }
  
  useEffect(() => {
    if (ctx.selectedForecast.length > 0) {
      if (ctx.selectedForecast[0].city === cityName) {
        return;
      }else {
          ctx.getCurrentForecastOption(cityName)
        }
    } else {
      ctx.getCurrentForecastOption(cityName)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityName])

  const classes = useStyles();
  const loading = ctx.isLoading
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

  return (
      <>
        {ctx.selectedForecast.length > 0 &&
        <>
        <Container className={classes.cont}>
        <h1>{ctx.selectedForecast[0].city}</h1>
        </Container>
        <Container className={classes.cont}>
          {dataToRender.map((data:DataToRender) => ( 
            <ForecastCard
              key={data.id} 
              id={data.id}
              city={ctx.selectedForecast[0].city}
              tempmin={data.tempmin}  
              tempmax={data.tempmax}
              day={data.day}  
              date={data.date}
              symbol={data.symbol}
            />))}
        </Container>
        </>}
      </>
  ) 
}
export default Forecast
