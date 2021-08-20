import { useContext, useEffect } from 'react'
import { makeStyles, Container } from '@material-ui/core';
import { useParams } from "react-router-dom";
import WeatherContext from '../../context/weather-context'
import ForecastCard from './ForecastCard';
import { SortedWeatherData } from '../../App'
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
      flexWrap:'wrap',
    },
    forecastCont: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      flexWrap:'wrap',
      marginBottom: "5rem"
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

  type Props = {
    sortedData: SortedWeatherData[]
  }
  
const Forecast:React.FC<Props> = (props)=> {
  const ctx = useContext(WeatherContext)
  const params: { cityName: string, currentDate: string } = useParams()
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

  return (
      <>
        {ctx.selectedForecast.length > 0 &&
        <>
        <Container className={classes.cont}>
        <h1>{ctx.selectedForecast[0].city}</h1>
        </Container>
        <Container className={classes.forecastCont}>
          {props.sortedData.map((data:DataToRender) => ( 
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
