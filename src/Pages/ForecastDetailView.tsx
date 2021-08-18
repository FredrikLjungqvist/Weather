import CityForecastDetails from '../components/weather/CityForecastDetails'
import React, { CSSProperties } from 'react'

const styles: CSSProperties = {
  display: "flex",
  flexDirection: "column",

}

const ForecastDetailView = (props:any) => {
  return (
    <div style={styles}>
      <CityForecastDetails groupedData={props.groupedData} />
    </div>
  )
}

export default ForecastDetailView
