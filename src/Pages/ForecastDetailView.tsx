import DetailForecastList from '../components/weather/DetailForecastList'
import React, { CSSProperties } from 'react'

const styles: CSSProperties = {
  display: "flex",
  flexDirection: "column",

}

const ForecastDetailView = (props:any) => {
  return (
    <div style={styles}>
      <DetailForecastList groupedData={props.groupedData} />
    </div>
  )
}

export default ForecastDetailView
