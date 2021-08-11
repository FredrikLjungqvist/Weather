import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { getLocalStorage} from '../handlers/localstorageHandler'


interface WeatherContextObj {
  getWeatherData: () => void;
  getPositionData:(cityName:string) => any;
  weatherData: any;
  isLoading: boolean;
}

const WeatherContext = React.createContext<WeatherContextObj>({
  getWeatherData: () => { },
  getPositionData: () => {},
  weatherData: [],
  isLoading: false
})

interface Props {
  children: JSX.Element
}

export interface Weather {
  id: string;
  time: object;
  precipitation: number;
  temp: number;
  windSpeed: number;
  humidity: number;
  weatherSymbol: number;
}

export const WeatherContextProvider: React.FC<Props> = (props: Props) => {
  const [weatherData, setWeatherData] = useState<Weather[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fullWeatherList: Weather[] = [];

  const getPositionData = async(cityName:string) => {
    try{
      const response = await fetch (`https://geocode.search.hereapi.com/v1/geocode?q=${cityName}&apiKey=V2olu2NpV3UrXM82R1rrKp-m8ylURma16wLVMns77Uk`)
      const positionData = await response.json()
      console.log(positionData, "positionData")
    } catch(error) {
      console.log(error)
    }
  }


  const getWeatherData = async () => {
    setIsLoading(true)
    try {
      const positions = getLocalStorage()
      const weatherList = await Promise.all(
        positions.map(async (location) => {
          const response = await fetch(`https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${location.long}/lat/${location.lat}/data.json`)
          
          return await response.json()
        })
      )
      weatherList.forEach((coor) => {
        const transformedWeatherList: Weather = coor.timeSeries.map((weather: any) => {
          const temp = weather.parameters.find((i: { name: string }) => i.name === "t")
          const symbol = weather.parameters.find((i: { name: string }) => i.name === "Wsymb2")
          const precipitation = weather.parameters.find((i: { name: string }) => i.name === "pmax")
          const humidity = weather.parameters.find((i: { name: string }) => i.name === "r")
          const windSpeed = weather.parameters.find((i: { name: string }) => i.name === "ws")
          const date = new Date(weather.validTime)
          return {
            id: uuidv4(),
            time: date,
            temp: temp.values[0],
            precipitation: precipitation.values[0],
            humidity: humidity.values[0],
            windSpeed: windSpeed.values[0],
            weatherSymbol: symbol.values[0]
          }
        })
        fullWeatherList.push(transformedWeatherList)
      })

    } catch (error) {
      console.error("dåligt")
    }
    setIsLoading(false)
    setWeatherData(fullWeatherList)
  }

  useEffect(() => {
    getWeatherData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <WeatherContext.Provider value={{
      getWeatherData,
      getPositionData,
      weatherData,
      isLoading
    }}>
      {props.children}
    </WeatherContext.Provider>
  )
}

export default WeatherContext
