import React, { useContext } from 'react'
import { makeStyles, Container, TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Hidden } from '@material-ui/core'
import WeatherContext from '../../context/weather-context'
import { useParams } from 'react-router-dom'

const useStyles = makeStyles({
  table: {
    maxWidth: 800,
  }
})

const CityForecastDetails = () => {
  const params:any = useParams()

  console.log(params.currentDate)
  const classes = useStyles();
  const ctx = useContext(WeatherContext)
  const loading = ctx.isLoading

  console.log('I Detail 🤬')

  let filteredWeatherData;
  if (ctx.selectedForecast.length > 0) {
    const currentDate = new Date(params.currentDate)
    console.log(currentDate)
    filteredWeatherData = ctx.selectedForecast.filter((weather: any) => weather.time.getDate() === currentDate.getDate())
    console.log(filteredWeatherData, 'filteeer')
  }

  console.log(ctx.selectedForecast, 'i detail!!')
  return (
    <Container style={{ width: "100vw", display: "flex", alignItems: "center", flexDirection: "column" }} maxWidth='lg' disableGutters>
      {!loading && ctx.selectedForecast.length > 0 ?
        <>
          <h1>Test titel</h1>
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
