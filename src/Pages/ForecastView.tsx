import React from 'react'
import { SortedWeatherData } from '../App'
import Forecast from '../components/weather/Forecast'

type Props = {
  sortedData: SortedWeatherData[]
}
const ForecastView:React.FC<Props> = (props) => {
  
  return (
    <div>
      <Forecast sortedData={props.sortedData} />
    </div>
  )
}

export default ForecastView


