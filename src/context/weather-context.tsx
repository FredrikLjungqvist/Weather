import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import {  getLocalStorage, setLocalStorage } from '../handlers/localstorageHandler'

export interface Weather {
  id: string;
  city: string;
  time: object;
  precipitation: number;
  temp: number;
  windSpeed: number;
  humidity: number;
  weatherSymbol: number;
}

interface WeatherContextObj {
  getWeatherData: () => void;
  getCurrentForecastOption: (forecastOption: string) => void;
  weatherData: any;
  selectedForecast: Weather[]
  isLoading: boolean;
  error: boolean;
}

const WeatherContext = React.createContext<WeatherContextObj>({
  getWeatherData: () => { },
  getCurrentForecastOption: () => { },
  weatherData: [],
  selectedForecast: [],
  isLoading: false,
  error: false,
})

interface Props {
  children: JSX.Element
}

export const WeatherContextProvider: React.FC<Props> = (props: Props) => {
  const [weatherData, setWeatherData] = useState<Weather[]>([])
  const [selectedForecast, setSelectedForecast] = useState<Weather[]>([]);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const fullWeatherList: Weather[] = [];

  const getCurrentForecastOption = async (forecastOption: string) => {
      setError(false)
      setIsLoading(true)
    try {
        const response = await fetch(`https://geocode.search.hereapi.com/v1/geocode?q=${forecastOption}&apiKey=V2olu2NpV3UrXM82R1rrKp-m8ylURma16wLVMns77Uk`)
        const data = await response.json();
        if (data.items[0].address.countryCode !== "SWE") {
          throw new Error('stad ej i sverige')
        }
        console.log(data, 'herrreeee')
        const currentStorage = getLocalStorage();
        currentStorage.splice(1,0, { city: data.items[0].address.city, long: data.items[0].position.lng , lat: data.items[0].position.lat })
        currentStorage.pop();
        setLocalStorage(currentStorage)
        selectedOptionForecast(data)
      } catch (err) {
        setIsLoading(false)
        setError(true)
        console.log(err)
      }
      setError(false)
      setIsLoading(false)
  }

  const selectedOptionForecast = async (hereData:any) => {
      setError(false)
      const weatherFetch = await fetch(`https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${hereData.items[0].position.lng}/lat/${hereData.items[0].position.lat}/data.json`)
      const weatherRes = await weatherFetch.json()

      const cityOptionWeatherData = weatherRes.timeSeries.map((option:any) => {
        const temp = option.parameters.find((i: { name: string }) => i.name === "t")
        const symbol = option.parameters.find((i: { name: string }) => i.name === "Wsymb2")
        const precipitation = option.parameters.find((i: { name: string }) => i.name === "pmax")
        const humidity = option.parameters.find((i: { name: string }) => i.name === "r")
        const windSpeed = option.parameters.find((i: { name: string }) => i.name === "ws")
        const date = new Date(option.validTime)
        return {
          id: uuidv4(),
          city: hereData.items[0].address.city,
          time: date,
          temp: temp.values[0],
          precipitation: precipitation.values[0],
          humidity: humidity.values[0],
          windSpeed: windSpeed.values[0],
          weatherSymbol: symbol.values[0]
        }
      });
      setSelectedForecast(cityOptionWeatherData)
      getWeatherData();
  }

  const getWeatherData = async () => {
    setError(false)
    setIsLoading(true)
    try {
      const positions = getLocalStorage()
      const weatherList = await Promise.all(
        positions.map(async (location) => {
          const response = await fetch(`https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${location.long}/lat/${location.lat}/data.json`)
          return await response.json()
        })
        )
        let index = -1;
      weatherList.forEach((coor) => {
        index++;
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
            city: positions[index].city,
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
      setError(true)
      setIsLoading(false)
    }
    setError(false)
    setIsLoading(false)
    setWeatherData(fullWeatherList)
  }


 

  return (
    <WeatherContext.Provider value={{
      getWeatherData,
      getCurrentForecastOption,
      weatherData,
      selectedForecast,
      isLoading,
      error
    }}>
      {props.children}
    </WeatherContext.Provider>
  )
}

export default WeatherContext
