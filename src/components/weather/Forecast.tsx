import React, { useContext} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { BrowserRouter as Router, Link} from "react-router-dom";
import WeatherContext from '../../context/weather-context'
import { ContactlessOutlined } from '@material-ui/icons';



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
  const classes = useStyles();
  const ctx = useContext(WeatherContext)
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
/*    
  var groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }; */
  
 /*  console.log(groupBy(['one', 'two', 'three'], 'length')); */
  
  // => {3: ["one", "two"], 5: ["three"]}

  return (
    <Container className={classes.cont}>
      {mock.map((data) => (
      <Link key={data.id} className={classes.link} to="/forecastdetail">
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
  ) 
}
export default Forecast