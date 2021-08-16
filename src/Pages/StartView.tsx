import React, { CSSProperties, useContext } from 'react'
import CurrentWeather from '../components/weather/CurrentWeather'



const StartView = () => {


  const styles: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }

  return (
    <div style={styles} >
      <h1>StartView</h1>
      <CurrentWeather />
    </div>
  )
}

export default StartView
