import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

interface Coordinates {
  coordinates: string
}

interface WeatherContextObj {
  makeRequest: (array: Coordinates[]) => void;
  weatherData: any;
  isLoading: boolean
}

const WeatherContext = React.createContext<WeatherContextObj>({
  makeRequest: () => { },
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
  celsius: number;
  windSpeed: number;
  humidity: number;
  weatherSymbol: number;
}

export const WeatherContextProvider: React.FC<Props> = (props: Props) => {
  const [weatherData, setWeatherData] = useState<Weather[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fullWeatherList: Weather[] = [];

  const makeRequest: (coor: Coordinates[]) => void = async (coor: Coordinates[]) => {
    setIsLoading(true)
    try {
      const weatherList = await Promise.all(
        coor.map(async (location) => {
          const response = await fetch(location.coordinates)
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

  return (
    <WeatherContext.Provider value={{
      makeRequest: makeRequest,
      weatherData: weatherData,
      isLoading
    }}>
      {props.children}
    </WeatherContext.Provider>
  )
}

export default WeatherContext
