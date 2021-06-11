import CityForecastDetails from '../components/weather/CityForecastDetails'
import React, { CSSProperties } from 'react'

const styles: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
}

const ForecastDetailView = () => {
  return (
    <div style={styles}>
      <h1>Forecast Detail</h1>
      <CityForecastDetails />
    </div>
  )
}

export default ForecastDetailView
