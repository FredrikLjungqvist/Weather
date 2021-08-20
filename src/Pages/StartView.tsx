import React, { useContext } from 'react'
import CurrentWeather from '../components/weather/CurrentWeather'
import ErrorBoundary from '../components/ErrorBoundary'
import FavouriteForecastList from '../components/weather/FavouriteForecastList'
import { Container, makeStyles, Button, CircularProgress, Typography } from '@material-ui/core'
import LocationDisabledIcon from '@material-ui/icons/LocationDisabled';
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
    flexWrap:'wrap',
  },
  cont: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: '5rem',
    flexWrap: 'wrap',
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
  },
  latestSearched: {
    marginTop: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }
});

const StartView = () => {
  const classes = useStyles();
  const { checkDevicePosition, locationIsFetched, loadingLocation, positionDenied } = useContext(LocationContext)
  const weatherCtx = useContext(WeatherContext)

  const FetchPositionHandler = () => {
    checkDevicePosition()
    weatherCtx.getWeatherData();
  }

  const locationButton = !locationIsFetched ? (<Button variant="contained" color="primary" onClick={FetchPositionHandler}>Hämta min plats<LocationOnIcon/></Button>) :
  (<Button variant="contained" color="secondary" onClick={FetchPositionHandler}>Uppdatera min plats <RotateRightIcon/></Button>)

  return (
    <Container>
      <ErrorBoundary>
        <Container className={classes.topContainer}>
          {loadingLocation ? <div className={classes.loadBox}><CircularProgress/></div> : <CurrentWeather />}
          {!positionDenied ? locationButton : <Button variant="contained" disabled>Slå på platstjänster i din webbläsare<LocationDisabledIcon/></Button>}
        </Container>
      </ErrorBoundary>
        <Container className={classes.latestSearched}>
          <Typography variant="h6">
              Senast visade
          </Typography>
          <Container className={classes.cont}>
            <FavouriteForecastList />
          </Container>
        </Container>
    </Container>
  )
}

export default StartView
