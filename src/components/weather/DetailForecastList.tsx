import React, { useContext, useState, useEffect } from 'react'
import { makeStyles, Container, TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Hidden, IconButton, Typography, CircularProgress } from '@material-ui/core'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import WeatherContext from '../../context/weather-context'
import DetailForecastItem from './DetailForecastItem';
import { useParams, useHistory } from 'react-router-dom'
import { Weather } from '../../context/weather-context'
import { SortedWeatherData } from '../../App'

const useStyles = makeStyles({
  table: {
    maxWidth: 800,
  },
  arrowContainer: {
    display: "flex",
    justifyContent: "center"
  }
})

type Props = {
  sortedData: SortedWeatherData[]
}


const CityForecastDetails: React.FC<Props> = (props) => {
  const history = useHistory();
  const params: { cityName: string, currentDate: string } = useParams()
  const [appDate, setAppDate] = useState(params.currentDate)
  let currentDate = new Date(appDate)
  let todaysDate = new Date()

  
  const classes = useStyles();
  const ctx = useContext(WeatherContext)
  const loading = ctx.isLoading
  const { cityName } = params
  let filteredWeatherData: Weather[] = [];
  let groupedDataLength: number = 0
  if (ctx.selectedForecast.length > 0) {

    filteredWeatherData = ctx.selectedForecast.filter((weather: Weather) => weather.time.getDate() === currentDate.getDate())
    groupedDataLength = props.sortedData.length
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
  }, [params.cityName])

  const paginationForwardHandler = () => {
    currentDate.setDate(currentDate.getDate() + 1)
    setAppDate(currentDate.toISOString().substr(0,10))
    history.push(`/stad/${params.cityName}/datum/${currentDate.toISOString().substr(0,10)}`)
  };
  const paginationBackwardHandler = () => {
    currentDate.setDate(currentDate.getDate() - 1)
    setAppDate(currentDate.toISOString().substr(0,10))
    history.push(`/stad/${params.cityName}/datum/${currentDate.toISOString().substr(0,10)}`)
  };
   
  function difference(date1: Date, date2: Date) {  
    const date1utc = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const date2utc = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
      let day = 1000*60*60*24;
    return(date2utc - date1utc)/day
  }
  const date1 = new Date(todaysDate.toISOString().substr(0,10)),
        date2 = new Date(appDate),
        time_difference = difference(date1,date2)

  return (
    <Container style={{ width: "100vw", display: "flex", alignItems: "center", flexDirection: "column", marginBottom: 70 }} maxWidth='lg' disableGutters>
      {!loading && ctx.selectedForecast.length > 0 ?
        <>
        <Typography variant="h3" component="h2">
          {ctx.selectedForecast[0].city}
        </Typography>
        <h3>{currentDate.toLocaleDateString('se-SE', { weekday: 'long', day: 'numeric', month: 'long'  })}</h3>
        <Container className={classes.arrowContainer}>
          {todaysDate.toISOString().substr(0,10) !== appDate ? <IconButton onClick={paginationBackwardHandler}><ArrowBackIosIcon /></IconButton> : undefined }
          { groupedDataLength - 1 !== time_difference ? <IconButton onClick={paginationForwardHandler}><ArrowForwardIosIcon /></IconButton> : undefined }
        </Container>
          <TableContainer className={classes.table}  >
            <Table padding="none" size="small" aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Tid</TableCell>
                  <TableCell align="center">V??der</TableCell>
                  <TableCell align="center">Temp</TableCell>
                  <TableCell align="center">Nederb??rd</TableCell>
                  <TableCell align="center">Vind</TableCell>
                  <Hidden xsDown>
                    <TableCell align="center">Luftfuktighet</TableCell>
                  </Hidden>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredWeatherData.map((row: Weather) => 
                <TableRow key={row.id}>
                  <DetailForecastItem
                    id={row.id}
                    time={row.time}
                    weatherSymbol={row.weatherSymbol}
                    temp={row.temp}
                    precipitation={row.precipitation}
                    windSpeed={row.windSpeed}
                    humidity={row.humidity}
                    city={row.city} /> 
                </TableRow> )}
              </TableBody>
            </Table>
          </TableContainer >
        </> : <CircularProgress />}
    </Container>
    

  )
}

export default CityForecastDetails
