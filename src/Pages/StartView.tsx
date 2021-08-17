import React, { useState, useContext } from 'react'
import CurrentWeather from '../components/weather/CurrentWeather'
import FavouriteForecastList from '../components/weather/FavouriteForecastList'
import { Container, makeStyles, Button, CircularProgress } from '@material-ui/core'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { setLocalStorage, getLocalStorage } from '../handlers/localstorageHandler';
import WeatherContext from '../context/weather-context';
import ErrorBoundary from '../components/ErrorBoundary';
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
});

const StartView = () => {
  const [fetchingPosition, setFetchingPosition] = useState(false)
  const [positionisFetched, setPositionIsFetched] = useState(false)
  const ctx = useContext(WeatherContext);
  const classes = useStyles();
  const checkDevicePosition =  () => {
    const deniedPos = () => {

      setFetchingPosition(false)
      throw new Error('det blev fel')
    
    }
    navigator.geolocation.getCurrentPosition(async(pos) => {   
      
        const {latitude, longitude} = pos.coords
        const response = await fetch(`https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude}%2C${longitude}&lang=se&apiKey=V2olu2NpV3UrXM82R1rrKp-m8ylURma16wLVMns77Uk`)
        const positionData = await response.json()
        const currentCity = positionData.items.map((pos:any) => {
          return{
            city:pos.address.county,
            long:pos.position.lng,
            lat:pos.position.lat,
          }
        })
          let storedData = getLocalStorage()
          storedData.splice(0,1,currentCity[0])
          setLocalStorage(storedData)
          setFetchingPosition(false)
          setPositionIsFetched(true)
          ctx.getWeatherData();
      },deniedPos)     

  }

  const FetchPositionHandler = () => {
    setFetchingPosition(true)
    checkDevicePosition()
  }

  const locationButton = !positionisFetched ? (<Button onClick={FetchPositionHandler}>Hämta min plats <LocationOnIcon/></Button>) :
  (<Button onClick={FetchPositionHandler}>Uppdatera min plats <RotateRightIcon/></Button>)

  return (
    <Container>

      <Container className={classes.topContainer}>
      <h1>StartView</h1>
        {fetchingPosition ? <CircularProgress/> : <CurrentWeather />}
        {locationButton}
      </Container>

      <Container className={classes.cont}>
        <FavouriteForecastList />
      </Container>
    </Container>
  )
}

export default StartView
