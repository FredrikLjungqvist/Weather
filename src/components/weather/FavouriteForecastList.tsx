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

  componentDidMount() {
    if(this.context.weatherData.length > 0){
      this.context.weatherData.forEach((enLista:any) => {
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
          
          return {date:data.name, tempmax:maxTemp, tempmin:minTemp, symbol:symbol, id:data.value[0].id, day:dayRender }
          
      
        }
        )
      })

    }
  }
  

  render() {
    console.log(this.dataToRender)
    return (
      <div>
        
      </div>
    )
  }
}
