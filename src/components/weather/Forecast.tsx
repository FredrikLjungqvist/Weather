import { useContext, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {  Link, useParams} from "react-router-dom";
import WeatherContext from '../../context/weather-context'
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
      alignItems: 'center',
      flexDirection: 'row',
      flexWrap:'wrap'
    },
    link: {
      textDecoration: 'none',
      margin: '30px',
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });


   interface DataToRender {
    id:number
    day:string,
    tempmax: number,
    tempmin: number,
    symbol: number,
    date: string,
  } 
  

const Forecast = ()=> {
  const ctx = useContext(WeatherContext)
  const params:any = useParams()
  const { cityName } = params;
console.log(ctx.selectedForecast, 'var är våran city?')
  useEffect(() => {
    ctx.getCurrentForecastOption(cityName)
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
    
    return {date:data.name, tempmax:maxTemp, tempmin:minTemp, symbol:symbol, id:data.value[0].id, day:dayRender }
    

  }
  )
 
}

  return (
    <>
      {!loading && ctx.selectedForecast.length > 0 ?
    <>
      <h1>{ctx.selectedForecast[0].city}</h1>
    <Container className={classes.cont}>
      {dataToRender.map((data:DataToRender) => (
      <Link key={data.id} className={classes.link} to={`/stad/${params.cityName}/datum/${data.date}`}>
        <Card  className={classes.root}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {data.day}
            </Typography>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {data.date}
            </Typography>
            <Typography className={classes.pos} color="textPrimary">
              {data.tempmax}°
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {data.tempmin}°
              <br />
            <img src={require(`../../assets/icons/${data.symbol}.png`).default} width="100" alt="" />
            </Typography>
          </CardContent>
        </Card>
      </Link>
        ))}
    </Container>
    </>
        :<p>LOADING......</p>}</>
  ) 
}
export default Forecast
