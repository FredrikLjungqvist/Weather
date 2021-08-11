import React, { useContext} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {  Link, useParams} from "react-router-dom";
import WeatherContext from '../../context/weather-context'
import {Weather} from '../../context/weather-context'

interface Map<K, V> {
  clear(): void;
  delete(key: K): boolean;
  entries(): IterableIterator<[K, V]>;
  forEach(callbackfn: (value: V, index: K, map: Map<K, V>) => void, thisArg?: any): void;
  get(key: K): V;
  has(key: K): boolean;
  keys(): IterableIterator<K>;
  set(key: K, value?: V): Map<K, V>;
  size: number;
  values(): IterableIterator<V>;
  [Symbol.iterator]():IterableIterator<[K,V]>;
  [Symbol.toStringTag]: string;
}

interface MapConstructor {
  new <K, V>(): Map<K, V>;
  new <K, V>(iterable: Iterable<[K, V]>): Map<K, V>;
  prototype: Map<any, any>;
}


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


  interface mock {
    id:number
    day:string,
    tempmax: number,
    tempmin: number,
    symbol: number,
    date: string,
  }
  const mock:mock[] = [{
      id: 1,
      day:'monday',
      tempmax: 20,
      tempmin: 10,
      symbol: 2,
      date: "2021-03-05",
    },{
      id: 3,
      day:'monday',
      tempmax: 20,
      tempmin: 10,
      symbol: 2,
      date: "2021-03-05",
    },{
      id: 4,
      day:'monday',
      tempmax: 20,
      tempmin: 10,
      symbol: 2,
      date: "2021-03-05",
    },{
      id: 5,
      day:'monday',
      tempmax: 20,
      tempmin: 10,
      symbol: 2,
      date: "2021-03-05",
    },
    {
      id:2,
      day:'tuesday',
      tempmax: 20,
      tempmin: 12,
      symbol: 5,
      date: "2021-03-06",
    }]


const Forecast = ()=> {

  const ctx = useContext(WeatherContext)

  const params:any = useParams()
  console.log(params.cityName)
  ctx.getPositionData(params.cityName)


  const classes = useStyles();
  const loading = ctx.isLoading

  let filteredWeatherData;
  if (ctx.weatherData.length > 0) {
    const currentDate = new Date()
    filteredWeatherData = ctx.weatherData[0].filter((weather: any) => weather.time.getDate() === currentDate.getDate())
  }

  let minMaxTemp= ()=>{
    let data=ctx.weatherData[0]
    const currentDate = new Date()
    const newDate = new Date()
    for (let index = 0; index < 10; index++) {
      let day = data.filter((day:any)=> day.time.getDate() === currentDate.getDate())
      Math.min(...day.temp)    
      Math.max(...day.temp)    
      newDate.setDate(newDate.getDate()+1)
    }
  }


  let groupedDates;
  if(ctx.weatherData.length > 0){
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

  
  groupedDates = groupBy(ctx.weatherData[0], (date: { time: any; }) => date.time.toISOString().substr(0,10))

  let output = groupedDates.keys()
  console.log(output)
  let dataArray = Array.from(groupedDates, ([name, value]) => ({ name, value }));

  console.log(dataArray)
  let flat = dataArray.flat()
  console.log(flat)

  const dataToSave = dataArray.map((data)=>
  {

    let tempArray = data.value.map((data:any)=>{

      return data.temp



    })

    console.log(tempArray)
    let average = tempArray.reduce(function (sum:any, value:Number) {
      return sum + value;
  }, 0) / tempArray.length;

console.log(average);

    console.log(data)
    return {name:data.name, temp:average}
    

  }
  )
  console.log(dataToSave, "hej")
}

  // example usage
  
   
  return (
    <Container className={classes.cont}>
      {mock.map((data) => (
      <Link key={data.id} className={classes.link} to="/forecastdetail">
        <Card  className={classes.root}>
          <CardContent>
            <h1>{params.cityName}</h1>
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
  ) 
}
export default Forecast
