import React, { useState, } from 'react'

interface LongLat {
  long: number
  lat: number
}

interface WeatherContextObj {
  makeRequest: (array: LongLat[]) => void;
  weatherData: any[]
}


const WeatherContext = React.createContext<WeatherContextObj>({
  makeRequest: () => { },
  weatherData: []
})

interface Props {
  children: JSX.Element
}

export const WeatherContextProvider: React.FC<Props> = (props: Props) => {
  const [weatherData, setWeatherData] = useState<any>([])

  const makeRequest: (coor: LongLat[]) => void = async (coor: LongLat[]): Promise<any> => {
    const [positionOne, positionTwo, positionThree] = await Promise.all([
      fetch(`https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${coor[0].long}/lat/${coor[0].lat}/data.json`),
      fetch(`https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${coor[1].long}/lat/${coor[1].lat}/data.json`),
      fetch(`https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${coor[2].long}/lat/${coor[2].lat}/data.json`)
    ])

    const positionDataOne = await positionOne.json()
    const positionDataTwo = await positionTwo.json()
    const positionDataThree = await positionThree.json()

    console.log(positionDataOne, "ett")
    console.log(positionDataTwo, "två")
    console.log(positionDataThree, "tre")
    setWeatherData([{ positionDataOne }, { positionDataTwo }, { positionDataThree }])
  }

  return (
    <WeatherContext.Provider value={{
      makeRequest: makeRequest,
      weatherData: weatherData
    }}>
      {props.children}
    </WeatherContext.Provider>
  )
}

export default WeatherContext
