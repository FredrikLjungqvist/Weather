import React from 'react'
import { Paper, TableContainer, Table, TableHead, TableCell, TableRow, TableBody } from '@material-ui/core'
import { useParams } from 'react-router-dom'

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



  const params: any = useParams();

  console.log(params.currentDate)
  console.log(dummy_data[0].date.substring(0, 10))

  const currentList = dummy_data.filter((day) => day.date.substring(0, 10) === params.currentDate)


  const datum = new Date(currentList[0].date)

  datum.toLocaleDateString("se-SE", { month: 'long' })

  return (
    <>


      <h1>Göteborg</h1>
      <h4>{datum.toLocaleString("se-SE", { weekday: "short", day: "numeric", month: 'long' })}</h4>
      <TableContainer component={Paper} >
        <Table size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Tid</TableCell>
              <TableCell align="center">Väder</TableCell>
              <TableCell align="center">Temperatur</TableCell>
              <TableCell align="center">Nederbörd</TableCell>
              <TableCell align="center">Vind</TableCell>
              <TableCell align="center">Luftfuktighet</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentList.map((row) => (
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
                <TableCell align="center">{row.humidity} %</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer >

    </>
  )
}

export default CityForecastDetails
