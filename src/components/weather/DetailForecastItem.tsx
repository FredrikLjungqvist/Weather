import React, { Component } from 'react'
import { TableCell, Hidden } from '@material-ui/core'
import { Weather } from '../../context/weather-context'


export default class DetailForecastItem extends Component<Weather> {
  render() {

    return (
      <>
      <TableCell align="center" component="th" >
        {this.props.time.getHours()}
      </TableCell>
      <TableCell align="center" component="th" >
        <img width="100" src={require(`../../assets/icons/${this.props.weatherSymbol}.png`).default} alt="" />
      </TableCell>
      <TableCell align="center">
        {Math.floor(this.props.temp)}°
      </TableCell>
      <TableCell align="center">{this.props.precipitation} mm</TableCell>
      <TableCell align="center">{this.props.windSpeed} m/s</TableCell>
      <Hidden xsDown>
        <TableCell align="center">{this.props.humidity} %</TableCell>
      </Hidden>
      </>
    )
  }
}
