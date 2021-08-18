import React, { useContext, useState, useEffect } from 'react'
import { makeStyles, Container, TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Hidden } from '@material-ui/core'
import WeatherContext from '../../context/weather-context'
import { useParams, useHistory } from 'react-router-dom'
import { Weather } from '../../context/weather-context'


const useStyles = makeStyles({
  table: {
    maxWidth: 800,
  }
})

const CityForecastDetails = (props:any) => {
  const history = useHistory();
  const params:any = useParams()
  const [appDate, setAppDate] = useState(params.currentDate)
  let currentDate = new Date(appDate)
  let todaysDate = new Date()

  
  const classes = useStyles();
  const ctx = useContext(WeatherContext)
  const loading = ctx.isLoading
  const { cityName } = params
  let filteredWeatherData: Weather[] = [];
  let groupedDataLength;
  if (ctx.selectedForecast.length > 0) {

    filteredWeatherData = ctx.selectedForecast.filter((weather: any) => weather.time.getDate() === currentDate.getDate())
    console.log(filteredWeatherData)
    
    groupedDataLength = props.groupedData.length
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
   

  console.log(currentDate, '🥲')
  console.log(appDate, 'appDate')
  console.log(todaysDate, appDate)

  function difference(date1: Date, date2: Date) {  
    const date1utc = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const date2utc = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
      let day = 1000*60*60*24;
    return(date2utc - date1utc)/day
  }
  const date1 = new Date(todaysDate.toISOString().substr(0,10)),
        date2 = new Date(appDate),
        time_difference = difference(date1,date2)
  console.log(time_difference)


  return (
    <Container style={{ width: "100vw", display: "flex", alignItems: "center", flexDirection: "column" }} maxWidth='lg' disableGutters>
      {!loading && ctx.selectedForecast.length > 0 ?
        <>
        <h1>{ctx.selectedForecast[0].city}</h1>
        <h3>{currentDate.toLocaleDateString('se-SE', { weekday: 'long', day: 'numeric', month: 'long'  })}</h3>
          {todaysDate.toISOString().substr(0,10) !== appDate ? <button onClick={paginationBackwardHandler}>Föregående Dag</button> : undefined }
          { groupedDataLength - 1 !== time_difference ? <button onClick={paginationForwardHandler}>Nästa Dag</button> : undefined }
          <TableContainer className={classes.table}  >
            <Table padding="none" size="small" aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Tid</TableCell>
                  <TableCell align="center">Väder</TableCell>
                  <TableCell align="center">Temp</TableCell>
                  <TableCell align="center">Nederbörd</TableCell>
                  <TableCell align="center">Vind</TableCell>
                  <Hidden xsDown>
                    <TableCell align="center">Luftfuktighet</TableCell>
                  </Hidden>
                </TableRow>
              </TableHead>
              <TableBody>
                
                {filteredWeatherData.map((row: any) => (
                  <TableRow key={row.id}>
                    <TableCell align="center" component="th" >
                      {row.time.getHours()}
                    </TableCell>
                    <TableCell align="center" component="th" >
                      <img width="100" src={require(`../../assets/icons/${row.weatherSymbol}.png`).default} alt="" />
                    </TableCell>
                    <TableCell align="center">
                      {Math.floor(row.temp)}°
                    </TableCell>
                    <TableCell align="center">{row.precipitation} mm</TableCell>
                    <TableCell align="center">{row.windSpeed} m/s</TableCell>
                    <Hidden xsDown>
                      <TableCell align="center">{row.humidity} %</TableCell>
                    </Hidden>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer >
        </> : <h1>LOADING....</h1>}
    </Container>
    

  )
}

export default CityForecastDetails
