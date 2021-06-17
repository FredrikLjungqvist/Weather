import React, { useContext} from 'react'
import { makeStyles, Container, TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Hidden } from '@material-ui/core'
import WeatherContext from '../../context/weather-context'


const useStyles = makeStyles({
  table: {
    maxWidth: 800,
  }
})

const CityForecastDetails = () => {
  const classes = useStyles();
  const ctx = useContext(WeatherContext)
  const loading = ctx.isLoading

  let filteredWeatherData;
  if (ctx.weatherData.length > 0) {
    const currentDate = new Date()
    filteredWeatherData = ctx.weatherData[0].filter((weather: any) => weather.time.getDate() === currentDate.getDate())
  }

  return (
    <Container style={{ width: "100vw", display: "flex", alignItems: "center", flexDirection: "column" }} maxWidth='lg' disableGutters>
      {!loading && ctx.weatherData.length > 0 ?
        <>
          <h1>Göteborg</h1>
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
