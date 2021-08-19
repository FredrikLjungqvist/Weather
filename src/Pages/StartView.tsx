import React, { useContext } from 'react'
import CurrentWeather from '../components/weather/CurrentWeather'
import ErrorBoundary from '../components/ErrorBoundary'
import FavouriteForecastList from '../components/weather/FavouriteForecastList'
import { Container, makeStyles, Button, CircularProgress } from '@material-ui/core'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import WeatherContext from '../context/weather-context';
import LocationContext from '../context/location-context';
import RotateRightIcon from '@material-ui/icons/RotateRight';

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
    justifyContent: 'center',
    flexWrap:'wrap'
  },
  topContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  loadBox: {
    display: "flex",
    alignItems: "center",
    minHeight: 300
  }
});

const StartView = () => {
  const classes = useStyles();
  const { checkDevicePosition, locationIsFetched, loadingLocation} = useContext(LocationContext)
  const weatherCtx = useContext(WeatherContext)

  const FetchPositionHandler = () => {
    checkDevicePosition()
    weatherCtx.getWeatherData();
  }

  const locationButton = !locationIsFetched ? (<Button variant="contained" color="primary" onClick={FetchPositionHandler}>Hämta min plats <LocationOnIcon/></Button>) :
  (<Button variant="contained" color="secondary" onClick={FetchPositionHandler}>Uppdatera min plats <RotateRightIcon/></Button>)

  return (
    <Container>
      <ErrorBoundary>
      <Container className={classes.topContainer}>
        {loadingLocation ? <div className={classes.loadBox}><CircularProgress/></div> : <CurrentWeather />}
        {locationButton}
      </Container>
      </ErrorBoundary>

      <Container className={classes.cont}>
        <FavouriteForecastList />
      </Container>
    </Container>
  )
}

export default StartView
