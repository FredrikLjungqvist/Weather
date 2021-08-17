import React, { Component } from 'react'
import WeatherContext from '../../context/weather-context'
import { Weather } from '../../context/weather-context'
import ForecastCard from './ForecastCard';



export default class FavouriteForecastList extends Component {
  static contextType = WeatherContext;
  groupedDates:any;
  dataToRender:any;


   private groupBy = (list:any, keyGetter:any) => {
    const map = new Map();
    list.forEach((item:any) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);  
         } else {
             collection.push(item);
         }
    });
    return map;
}

favouriteArray: any = []

render() {
  
  if(this.context.weatherData.length > 0){
    this.favouriteArray = []
    let slicedWeatherData = this.context.weatherData.slice(1)
    slicedWeatherData.forEach((enLista:any, index: number) => {
      this.groupedDates = this.groupBy(enLista, (date: { time: Date; }) => date.time.toISOString().substr(0,10))
  
      let dataArray = Array.from(this.groupedDates, ([name, value]) => ({ name, value }));
      
      this.dataToRender = dataArray.map((data)=> {
    
        let tempArray = data.value.map((data:Weather)=>{
          return data.temp
        })
    
        const tempSymbol = data.value.map((data:Weather)=>{
          return data.weatherSymbol 
        })
    
        const symbol = Math.min(...tempSymbol)
          
        let maxTemp = Math.max(...tempArray)
        let minTemp = Math.min(...tempArray)
        
        const day = new Date(data.name)
        
        const dayRender = day.toLocaleDateString('se-SE', { weekday: 'long' });
        
        return {date:data.name, city:data.value[0].city, tempmax:maxTemp, tempmin:minTemp, symbol:symbol, id:data.value[0].id, day:dayRender }
        
      }
      )
      this.favouriteArray.push(this.dataToRender[0])
      console.log(this.favouriteArray, 'hej', index)
    })
  
  }

  return (
      <>
          { this.context.weatherData.length > 0 ? this.favouriteArray.map((city:any,) => 
            <ForecastCard 
            key={city.id}
            id={city.id} 
            city={city.city}
            day={city.day}
            date={city.date}
            tempmin={city.tempmin}
            tempmax={city.tempmax}
            symbol={city.symbol} 
            />) : 'loading'}
      </>
    )
  }
}
