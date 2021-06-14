import React from 'react'
import myArray from '../citys'
import { Link } from 'react-router-dom'

const ForecastView = () => {
  return (
    <div>
      <h1>ForecastView</h1>
      <li>
        <Link to="/forecastdetail/2021-06-14" >2021 06 14</Link>
      </li>
      <li>
        <Link to="/forecastdetail/2021-06-15" >2021 06 15</Link>
      </li>
      <p>{myArray[1]}</p>
    </div>
  )
}

export default ForecastView


