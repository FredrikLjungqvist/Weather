export interface PositionData{
  city:string;
  long:number;
  lat:number;
}

export const checkDevicePosition =  () => {

  const deniedPos = () => {
    console.log("plats är av")
  }

  navigator.geolocation.getCurrentPosition(async(pos) => {
      const {latitude, longitude} = pos.coords
      const response = await fetch(`https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude}%2C${longitude}&lang=se&apiKey=V2olu2NpV3UrXM82R1rrKp-m8ylURma16wLVMns77Uk`)
      const positionData = await response.json()
      console.log(positionData.items)
      
      const currentCity = positionData.items.map((pos:any) => {
        return{
          city:pos.address.county,
          long:pos.position.lng,
          lat:pos.position.lat,
        }
      })
      
      let storedData = getLocalStorage()
      storedData.splice(0,0,currentCity[0])
      storedData.pop()
      setLocalStorage(storedData)
      
      console.log(storedData)
    },deniedPos)     
}

export const setPositionData = () => {

  const positionData:PositionData[] = [
    {
      city:"Stockholm",
      long:18.075,
      lat:59.319
    },
    {
    city:"Malmö",
    long:13.003,
    lat:55.604
    },
    {
    city:"Kalmar",
    long:13.003,
    lat:55.604
    },
    {
    city: "Göteborg",
    long:11.96822,
    lat:57.70067
    },
  ]

  localStorage.setItem("positions", JSON.stringify(positionData))
}

export const getLocalStorage = () => {
  let data = localStorage.getItem("positions")
  let storedData: PositionData[]  =  data ? JSON.parse(data) : []
  return storedData
}

export const setLocalStorage = (updatedData:PositionData[]) => {
  localStorage.setItem("positions", JSON.stringify(updatedData) )
}
