import React from 'react'
import { Container, Paper, TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Hidden } from '@material-ui/core'


interface WeatherDetails {
  id: number
  date: string
  celsius: Number
  humidity: Number
  weatherSymbol: Number
  precipitation: Number
  windSpeed: Number
}


const dummy_data: WeatherDetails[] = [

  {
    id: Math.floor(Math.random() * 10000),
    celsius: 24,
    date: "2021-06-14T09:00:26.857Z",
    humidity: 10,
    weatherSymbol: 1,
    precipitation: 1,
    windSpeed: 10,
  },
  {
    id: Math.floor(Math.random() * 10000),
    celsius: 24,
    date: "2021-06-14T10:00:26.857Z",
    weatherSymbol: 6,
    humidity: 10,
    precipitation: 1,
    windSpeed: 10,
  },
  {
    id: Math.floor(Math.random() * 10000),
    celsius: 24,
    date: "2021-06-14T11:00:26.857Z",
    humidity: 22,
    weatherSymbol: 10,
    precipitation: 1,
    windSpeed: 10,
  },
  {
    id: Math.floor(Math.random() * 10000),
    celsius: 24,
    date: "2021-06-14T12:00:26.857Z",
    humidity: 100,
    weatherSymbol: 11,
    precipitation: 1,
    windSpeed: 10,
  },
  {
    id: Math.floor(Math.random() * 10000),
    celsius: 24,
    date: "2021-06-14T13:00:26.857Z",
    humidity: 1,
    weatherSymbol: 1,
    precipitation: 1,
    windSpeed: 10,
  },
  {
    id: Math.floor(Math.random() * 10000),
    celsius: 24,
    date: "2021-06-14T14:00:26.857Z",
    humidity: 89,
    weatherSymbol: 1,
    precipitation: 1,
    windSpeed: 10,
  },
  {
    id: Math.floor(Math.random() * 10000),
    celsius: 24,
    date: "2021-06-14T15:00:26.857Z",
    humidity: 1,
    weatherSymbol: 3,
    precipitation: 1,
    windSpeed: 10,
  },
  {
    id: Math.floor(Math.random() * 10000),
    celsius: 1,
    date: "2021-06-15T15:00:26.857Z",
    humidity: 100,
    weatherSymbol: 27,
    precipitation: 1,
    windSpeed: 1000,
  },
]



const CityForecastDetails = () => {







  const datum = new Date(dummy_data[0].date)

  datum.toLocaleDateString("se-SE", { month: 'long' })

  return (
    <>
      <Container style={{ width: "100vw", display: "flex", alignItems: "center", flexDirection: "column" }} maxWidth='lg' disableGutters>
        <h1>Göteborg</h1>
        <h4>{datum.toLocaleString("se-SE", { weekday: "short", day: "numeric", month: 'long' })}</h4>
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
              {dummy_data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="center" component="th" >
                    {new Date(row.date).getHours()}
                  </TableCell>
                  <TableCell align="center" component="th" >
                    <img src={require(`../../assets/icons/${row.weatherSymbol}.png`).default} width="100" alt="" />
                  </TableCell>
                  <TableCell align="center">
                    {row.celsius}°
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
      </Container>

    </>
  )
}

export default CityForecastDetails
