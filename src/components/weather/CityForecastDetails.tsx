import React from 'react'
import { Paper, TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Icon } from '@material-ui/core'
import one from '../../assets/icons/1.png'

interface WeatherDetails {
  id: Number
  celsius: Number
  weatherSymbol: Number
  hour: String
  precipitation: Number
  windSpeed: Number
}


const dummy_data: WeatherDetails[] = [
  {
    id: Math.floor(Math.random() * 10000),
    celsius: 24,
    weatherSymbol: 1,
    hour: "13:00",
    precipitation: 1,
    windSpeed: 10,
  },
  {
    id: Math.floor(Math.random() * 10000),
    celsius: 24,
    weatherSymbol: 2,
    hour: "14:00",
    precipitation: 1,
    windSpeed: 10,
  },
  {
    id: Math.floor(Math.random() * 10000),
    celsius: 24,
    weatherSymbol: 3,
    hour: "15:00",
    precipitation: 1,
    windSpeed: 10,
  },
  {
    id: Math.floor(Math.random() * 10000),
    celsius: 24,
    weatherSymbol: 15,
    hour: "16:00",
    precipitation: 1,
    windSpeed: 10,
  },
]


const CityForecastDetails = () => {


  console.log(dummy_data)
  return (
    <>
      <h1>Göteborg</h1>
      <h4>11 Juni</h4>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>11 Juni</TableCell>
              <TableCell align="center">Temperatur</TableCell>
              <TableCell align="center">Nederbörd</TableCell>
              <TableCell align="center">Vind</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummy_data.map((row) => (
              <TableRow >
                <TableCell align="center" component="th" >
                  {row.hour}
                  <img src={require(`../../assets/icons/${row.weatherSymbol}.png`).default} width="100" alt="" />
                </TableCell>
                <TableCell align="center">
                  {row.celsius}°
                </TableCell>
                <TableCell align="center">{row.precipitation} mm</TableCell>
                <TableCell align="center">{row.windSpeed} m/s</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer >
    </>
  )
}

export default CityForecastDetails
