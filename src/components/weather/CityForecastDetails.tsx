import React, { useContext, useState } from 'react'
import { makeStyles, Container, TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Hidden } from '@material-ui/core'
import WeatherContext from '../../context/weather-context'
import { useParams, useHistory } from 'react-router-dom'



const useStyles = makeStyles({
  table: {
    maxWidth: 800,
  }
})

const CityForecastDetails = () => {
  const history = useHistory();
  const params:any = useParams()
  const [appDate, setAppDate] = useState(params.currentDate)
  let currentDate = new Date(appDate)


  const classes = useStyles();
  const ctx = useContext(WeatherContext)
  const loading = ctx.isLoading

  let filteredWeatherData;
  if (ctx.selectedForecast.length > 0) {
    filteredWeatherData = ctx.selectedForecast.filter((weather: any) => weather.time.getDate() === currentDate.getDate())

  } 


  const datePaginationHandler = () => {
    setAppDate(currentDate.setDate(currentDate.getDate() + 1))
    history.push(`/stad/${params.cityName}/datum/${currentDate.toISOString().substr(0,10)}`)
  };
  
  return (
    <Container style={{ width: "100vw", display: "flex", alignItems: "center", flexDirection: "column" }} maxWidth='lg' disableGutters>
      {!loading && ctx.selectedForecast.length > 0 ?
        <>
        <h1>{ctx.selectedForecast[0].city}</h1>
        <h3>{currentDate.toLocaleDateString('se-SE', { weekday: 'long', day: 'numeric', month: 'long'  })}</h3>
          <button onClick={datePaginationHandler} >Framåt</button>
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
                
                {filteredWeatherData?.map((row: any) => (
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
