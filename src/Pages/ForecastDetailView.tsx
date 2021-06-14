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
      <CityForecastDetails />
    </div>
  )
}

export default ForecastDetailView
