import { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';
import WeatherContext from '../../context/weather-context'
import { getLocalStorage } from '../../handlers/localstorageHandler';

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingRight: 0,
    marginBottom: 100,
    marginTop: 10,
  },
  weatherContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingRight: 0,
  }
});

export default function CurrentWeather() {
  const ctx = useContext(WeatherContext)

  if(ctx.error) {
    throw new Error('smhi kunde inte hämta datan')
  }

  let currentPositionInfo = getLocalStorage()
  
  const classes = useStyles();
  return (
    <>
      <Container className={classes.root}>
            <Typography gutterBottom variant="h1" component="h2">
                { ctx.weatherData.length > 0 && localStorage.getItem("positions") === null ? 'Loading': 
                <div>
                  {currentPositionInfo[0].city}
                </div>
                }
            </Typography>
            {ctx.weatherData.length > 0 ? (
              <Container className={classes.weatherContainer}>
                <Typography variant="h1" component="h2">
                  {ctx.weatherData[0][0].temp}°
                </Typography>
                <img width="200" src={require(`../../assets/icons/${ctx.weatherData[0][0].weatherSymbol}.png`).default} alt="" />
              </Container>)
            : "loading"}
      </Container>
    </> 
  );
  
}