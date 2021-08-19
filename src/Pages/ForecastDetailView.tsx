import DetailForecastList from '../components/weather/DetailForecastList'
import React, { CSSProperties } from 'react'
import { MyType } from '../App'
const styles: CSSProperties = {
  display: "flex",
  flexDirection: "column",
}

type Props = {
  sortedData: MyType[]
}


const ForecastDetailView: React.FC<Props> = (props) => {

  return (
    <div style={styles}>
      <DetailForecastList sortedData={props.sortedData} />
    </div>
  )
}

export default ForecastDetailView
