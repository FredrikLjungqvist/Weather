import React from 'react'
import myArray from '../citys'
import { Link } from 'react-router-dom'

const ForecastView = () => {
  return (
    <div>
      <h1>ForecastView</h1>
      <p>{myArray[1]}</p>
    </div>
  )
}

export default ForecastView


