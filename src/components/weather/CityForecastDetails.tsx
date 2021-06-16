import React, { useContext, useEffect } from 'react'
import { Container, Paper, TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Hidden } from '@material-ui/core'
import WeatherContext from '../../context/weather-context'






const array = [
  {
    coordinates: `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${16.158}/lat/${58.5812}/data.json`,
  },
  {
    coordinates: `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${16.158}/lat/${59.5812}/data.json`
  },
  {
    coordinates: `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${16.158}/lat/${60.5812}/data.json`
  },
]

const CityForecastDetails = () => {

  const ctx = useContext(WeatherContext)
  const loading = ctx.isLoading


  useEffect(() => {
    ctx.makeRequest(array)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (ctx.weatherData.length > 0) {
    console.log(ctx.weatherData)
  }



  return (
    <>
      <Container style={{ width: "100vw", display: "flex", alignItems: "center", flexDirection: "column" }} maxWidth='lg' disableGutters>
        {!loading && ctx.weatherData.length > 0 ?
          <>
            < h1 > Göteborg</h1>
            <TableContainer component={Paper} >
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
                  {ctx.weatherData[0].map((row: any) => (
                    <TableRow key={row.id}>
                      <TableCell align="center" component="th" >
                        {row.time.getHours()}
                      </TableCell>
                      <TableCell align="center" component="th" >
                        <img src={require(`../../assets/icons/${row.weatherSymbol}.png`).default} width="100" alt="" />
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
          </>
          :
          <h1>LOADING....</h1>}

      </Container>



    </>
  )
}

export default CityForecastDetails
